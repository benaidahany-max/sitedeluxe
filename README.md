🚗 LUXE AUTO — Site Web de Vente de Véhicules Premium

Projet web réalisé dans le cadre d'un projet scolaire. Site de vente en ligne de voitures de prestige : BMW, Audi, Volkswagen et Skoda.

📋 Description du projet Luxe Auto est un site web statique simulant une concession automobile haut de gamme. Il permet aux visiteurs de découvrir un catalogue de véhicules premium, de créer un compte, de se connecter, et d'ajouter des véhicules à un panier d'achat. Le site met en avant quatre grandes marques : BMW, Audi, Volkswagen et Skoda.

📄 Pages du site 🏠 Accueil (index.html) La page d'accueil présente l'identité de la marque Luxe Auto. Elle comprend :

Un logo et un nom de marque mis en avant Une vidéo de présentation en arrière-plan Un slogan accrocheur : "Votre partenaire de confiance pour l'acquisition de véhicules premium" Une mise en vedette d'un modèle phare : la BMW iX3 Une section des marques partenaires (Audi, BMW, Volkswagen, Skoda) Les arguments clés de Luxe Auto : sélection rigoureuse, garantie complète, service après-vente 24h/24, transparence tarifaire Des statistiques : 2 000+ clients satisfaits, 20+ véhicules premium, 15 ans d'expérience Les informations de contact : téléphone, WhatsApp, Instagram, et localisation (Grenoble)

🚘 Catalogue Voitures (content/produits.html) Page dédiée à la présentation des véhicules disponibles. Elle propose :

Un catalogue complet des véhicules en stock Un système de filtrage par marque (Tous, Audi, BMW, Volkswagen, Skoda) Une barre de recherche pour trouver un véhicule rapidement Un système d'ajout au panier par glisser-déposer (drag & drop) Un compteur de panier mis à jour dynamiquement dans la navigation

📝 Inscription (content/inscription.html) Formulaire permettant à un nouvel utilisateur de créer un compte. Il contient :

Des champs de saisie pour les informations personnelles Des champs de mot de passe avec option d'affichage/masquage Un bouton d'inscription Un lien de redirection vers la page de connexion

🔐 Connexion (content/connexion.html) Page de connexion pour les utilisateurs déjà inscrits, avec :

Des champs email et mot de passe Un lien vers la page d'inscription pour les nouveaux utilisateurs

🛒 Panier (content/panier.html) Page récapitulative de la sélection de l'utilisateur. Elle permet de :

Visualiser les véhicules sélectionnés Retirer un véhicule de la sélection Accéder à un formulaire de paiement sécurisé Annuler la commande

🛠️ Technologies utilisées TechnologieUtilisationHTML5Structure des pagesCSS3Mise en forme et design responsiveJavaScriptInteractions dynamiques (panier, filtres, drag & drop)GitHub PagesHébergement du site

📁 Structure du projet sitee/ │ ├── index.html # Page d'accueil │ ├── content/ │ ├── produits.html # Catalogue des voitures │ ├── inscription.html # Formulaire d'inscription │ ├── connexion.html # Page de connexion │ └── panier.html # Panier d'achat │ ├── image/ │ └── logo.jpeg.jpeg # Logo du site │ └── video/ └── videovoiture.mp4 # Vidéo d'accueil

✨ Fonctionnalités principales

✅ Navigation multi-pages ✅ Catalogue de voitures avec filtres par marque ✅ Barre de recherche dynamique ✅ Ajout au panier par glisser-déposer (drag & drop) ✅ Compteur de panier en temps réel ✅ Formulaire d'inscription et de connexion ✅ Affichage/masquage du mot de passe ✅ Page panier avec paiement simulé ✅ Vidéo d'ambiance en page d'accueil ✅ Design responsive (adapté mobile et desktop)

🛠️ Backend & Base de Données — Luxe Auto Ce qui a été mis en place En plus du site statique, un backend complet a été développé pour connecter le site à une base de données MySQL.

🗄️ Base de données (MySQL) La base de données luxe_auto contient 7 tables : Tables ( utilisateurs: Stocke les comptes (mot de passe hashé BCrypt) / Marques: Les 4 marques : BMW, Audi, Volkswagen, Skoda/ Voitures: Tout le catalogue avec prix, carburant, etc /.paniers: Un panier actif par utilisateur/ Panier_voituresLes: voitures ajoutées au panier/ commandes: Les achats confirmés/ Commande_voitures: Détail des voitures par commande.)

⚙️ Backend PHP Tout le backend est regroupé dans un seul fichier php/api.php qui gère toutes les actions

🔐 Sécurité Les mots de passe sont hashés avec BCrypt avant d'être enregistrés en base de données La vérification se fait avec password_verify() — le mot de passe original n'est jamais stocké Les sessions PHP sont utilisées pour maintenir la connexion Les données sont validées côté client (JS) ET côté serveur (PHP)

🔄 Fonctionnement Utilisateur remplit le formulaire ↓ JavaScript envoie les données à api.php ↓ PHP vérifie, traite et répond en JSON ↓ JavaScript affiche le résultat à l'utilisateur

En cas d'absence de serveur, le site fonctionne en fallback localStorage (comme avant).


*Projet réalisé par 

👤 Auteurs : Benaida hany , Islam tadjer , Merabet manar
