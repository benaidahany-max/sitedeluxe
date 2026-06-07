<?php
// ============================================================
//  api.php — Backend complet Luxe Auto
//  Gère : connexion BDD, inscription, connexion, 
//         déconnexion, panier, voitures
// ============================================================

session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET');

// ============================================================
//  CONNEXION BASE DE DONNÉES
// ============================================================
define('DB_HOST', 'localhost');
define('DB_USER', 'root');    // ton utilisateur MySQL
define('DB_PASS', '');        // ton mot de passe (vide par défaut XAMPP)
define('DB_NAME', 'luxe_auto');

function getConnexion() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    $conn->set_charset('utf8mb4');
    if ($conn->connect_error) {
        die(json_encode(['erreur' => 'Connexion BDD échouée : ' . $conn->connect_error]));
    }
    return $conn;
}

// ============================================================
//  RÉCUPÉRER L'ACTION DEMANDÉE
// ============================================================
$action = $_GET['action'] ?? $_POST['action'] ?? '';

// ============================================================
//  ACTION : INSCRIPTION
// ============================================================
if ($action === 'inscription') {
    $nom    = trim($_POST['nom']    ?? '');
    $prenom = trim($_POST['prenom'] ?? '');
    $email  = trim($_POST['email']  ?? '');
    $mdp    = $_POST['mot_de_passe']         ?? '';
    $mdp2   = $_POST['mot_de_passe_confirm'] ?? '';

    if (empty($nom) || empty($prenom) || empty($email) || empty($mdp)) {
        echo json_encode(['erreur' => 'Tous les champs sont obligatoires.']); exit;
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['erreur' => 'Adresse email invalide.']); exit;
    }
    if ($mdp !== $mdp2) {
        echo json_encode(['erreur' => 'Les mots de passe ne correspondent pas.']); exit;
    }
    if (strlen($mdp) < 6) {
        echo json_encode(['erreur' => 'Le mot de passe doit contenir au moins 6 caractères.']); exit;
    }

    $conn = getConnexion();

    // Vérifier si email déjà utilisé
    $stmt = $conn->prepare("SELECT id FROM utilisateurs WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        echo json_encode(['erreur' => 'Cet email est déjà utilisé.']);
        $stmt->close(); $conn->close(); exit;
    }
    $stmt->close();

    // Hash du mot de passe + insertion
    $mdp_hash = password_hash($mdp, PASSWORD_BCRYPT);
    $stmt = $conn->prepare("INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $nom, $prenom, $email, $mdp_hash);

    if ($stmt->execute()) {
        $utilisateur_id = $conn->insert_id;
        // Créer un panier vide pour ce nouvel utilisateur
        $stmt2 = $conn->prepare("INSERT INTO paniers (utilisateur_id) VALUES (?)");
        $stmt2->bind_param("i", $utilisateur_id);
        $stmt2->execute();
        $stmt2->close();
        echo json_encode(['succes' => true, 'message' => 'Compte créé avec succès !']);
    } else {
        echo json_encode(['erreur' => 'Erreur lors de la création du compte.']);
    }
    $stmt->close(); $conn->close();
}

// ============================================================
//  ACTION : CONNEXION
// ============================================================
elseif ($action === 'connexion') {
    $email = trim($_POST['email']       ?? '');
    $mdp   = $_POST['mot_de_passe']     ?? '';

    if (empty($email) || empty($mdp)) {
        echo json_encode(['erreur' => 'Email et mot de passe obligatoires.']); exit;
    }

    $conn = getConnexion();
    $stmt = $conn->prepare("SELECT id, nom, prenom, mot_de_passe FROM utilisateurs WHERE email = ? AND est_actif = 1");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0 ) {
        echo json_encode(['erreur' => 'Email ou mot de passe incorrect.']);
        $stmt->close(); $conn->close(); exit;
    }

    $user = $result->fetch_assoc();
    if (!password_verify($mdp, $user['mot_de_passe'])) {
        echo json_encode(['erreur' => 'Email ou mot de passe incorrect.']);
        $stmt->close(); $conn->close(); exit;
    }

    // Session
    $_SESSION['utilisateur_id'] = $user['id'];
    $_SESSION['nom']             = $user['nom'];
    $_SESSION['prenom']          = $user['prenom'];

    echo json_encode([
        'succes'      => true,
        'message'     => 'Connexion réussie !',
        'utilisateur' => ['id' => $user['id'], 'nom' => $user['nom'], 'prenom' => $user['prenom']]
    ]);
    $stmt->close(); $conn->close();
}

// ============================================================
//  ACTION : DÉCONNEXION
// ============================================================
elseif ($action === 'deconnexion') {
    session_destroy();
    echo json_encode(['succes' => true, 'message' => 'Déconnecté avec succès.']);
}

// ============================================================
//  ACTION : VOITURES (catalogue depuis la BDD)
// ============================================================
elseif ($action === 'voitures') {
    $conn = getConnexion();
    $sql  = "SELECT v.id, m.nom AS marque, v.modele, v.prix, v.image
             FROM voitures v
             JOIN marques m ON v.marque_id = m.id
             WHERE v.est_disponible = 1";
    $result   = $conn->query($sql);
    $voitures = [];
    while ($row = $result->fetch_assoc()) {
        $voitures[] = $row;
    }
    echo json_encode(['succes' => true, 'voitures' => $voitures]);
    $conn->close();
}

// ============================================================
//  ACTIONS PANIER (nécessite d'être connecté)
// ============================================================
else {
    $utilisateur_id = $_SESSION['utilisateur_id'] ?? null;
    if (!$utilisateur_id) {
        echo json_encode(['erreur' => 'Vous devez être connecté.']); exit;
    }

    $conn = getConnexion();

    // Récupérer ou créer le panier
    function getPanierId($conn, $utilisateur_id) {
        $stmt = $conn->prepare("SELECT id FROM paniers WHERE utilisateur_id = ?");
        $stmt->bind_param("i", $utilisateur_id);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows === 0) {
            $stmt2 = $conn->prepare("INSERT INTO paniers (utilisateur_id) VALUES (?)");
            $stmt2->bind_param("i", $utilisateur_id);
            $stmt2->execute();
            return $conn->insert_id;
        }
        return $result->fetch_assoc()['id'];
    }

    // ---- AJOUTER au panier ----
    if ($action === 'panier_ajouter') {
        $voiture_id = intval($_POST['voiture_id'] ?? 0);
        if (!$voiture_id) { echo json_encode(['erreur' => 'Voiture invalide.']); exit; }

        $panier_id = getPanierId($conn, $utilisateur_id);
        $stmt = $conn->prepare("SELECT id FROM panier_voitures WHERE panier_id = ? AND voiture_id = ?");
        $stmt->bind_param("ii", $panier_id, $voiture_id);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            echo json_encode(['message' => 'Voiture déjà dans le panier.']);
        } else {
            $stmt2 = $conn->prepare("INSERT INTO panier_voitures (panier_id, voiture_id) VALUES (?, ?)");
            $stmt2->bind_param("ii", $panier_id, $voiture_id);
            $stmt2->execute();
            echo json_encode(['succes' => true, 'message' => 'Voiture ajoutée au panier !']);
            $stmt2->close();
        }
        $stmt->close();
    }

    // ---- AFFICHER le panier ----
    elseif ($action === 'panier_afficher') {
        $panier_id = getPanierId($conn, $utilisateur_id);
        $stmt = $conn->prepare("
            SELECT v.id, m.nom AS marque, v.modele, v.prix, v.image
            FROM panier_voitures pv
            JOIN voitures v ON pv.voiture_id = v.id
            JOIN marques m  ON v.marque_id   = m.id
            WHERE pv.panier_id = ?
        ");
        $stmt->bind_param("i", $panier_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $items  = [];
        while ($row = $result->fetch_assoc()) { $items[] = $row; }
        echo json_encode(['succes' => true, 'panier' => $items]);
        $stmt->close();
    }

    // ---- SUPPRIMER du panier ----
    elseif ($action === 'panier_supprimer') {
        $voiture_id = intval($_POST['voiture_id'] ?? 0);
        $panier_id  = getPanierId($conn, $utilisateur_id);
        $stmt = $conn->prepare("DELETE FROM panier_voitures WHERE panier_id = ? AND voiture_id = ?");
        $stmt->bind_param("ii", $panier_id, $voiture_id);
        $stmt->execute();
        echo json_encode(['succes' => true, 'message' => 'Voiture retirée du panier.']);
        $stmt->close();
    }

    // ---- VIDER le panier ----
    elseif ($action === 'panier_vider') {
        $panier_id = getPanierId($conn, $utilisateur_id);
        $stmt = $conn->prepare("DELETE FROM panier_voitures WHERE panier_id = ?");
        $stmt->bind_param("i", $panier_id);
        $stmt->execute();
        echo json_encode(['succes' => true, 'message' => 'Panier vidé.']);
        $stmt->close();
    }

    // ---- PAYER ----
    elseif ($action === 'panier_payer') {
        $panier_id = getPanierId($conn, $utilisateur_id);
        $stmt = $conn->prepare("
            SELECT v.id, v.prix FROM panier_voitures pv
            JOIN voitures v ON pv.voiture_id = v.id
            WHERE pv.panier_id = ?
        ");
        $stmt->bind_param("i", $panier_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $items  = $result->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        if (empty($items)) {
            echo json_encode(['erreur' => 'Votre panier est vide.']); exit;
        }

        $total = array_sum(array_column($items, 'prix'));

        // Créer la commande
        $stmt2 = $conn->prepare("INSERT INTO commandes (utilisateur_id, montant_total, statut) VALUES (?, ?, 'Confirmée')");
        $stmt2->bind_param("id", $utilisateur_id, $total);
        $stmt2->execute();
        $commande_id = $conn->insert_id;
        $stmt2->close();

        // Ajouter les voitures dans commande_voitures
        $stmt3 = $conn->prepare("INSERT INTO commande_voitures (commande_id, voiture_id, prix_achat) VALUES (?, ?, ?)");
        foreach ($items as $item) {
            $stmt3->bind_param("iid", $commande_id, $item['id'], $item['prix']);
            $stmt3->execute();
        }
        $stmt3->close();

        // Vider le panier
        $stmt4 = $conn->prepare("DELETE FROM panier_voitures WHERE panier_id = ?");
        $stmt4->bind_param("i", $panier_id);
        $stmt4->execute();
        $stmt4->close();

        echo json_encode([
            'succes'      => true,
            'message'     => 'Commande confirmée ! Merci de votre réservation.',
            'commande_id' => $commande_id,
            'total'       => $total
        ]);
    }

    else {
        echo json_encode(['erreur' => 'Action inconnue.']);
    }

    $conn->close();
}
?>
