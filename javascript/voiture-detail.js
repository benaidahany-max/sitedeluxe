/* AFFICHER LES DÉTAILS DE LA VOITURE */
function obtenirVoitureActuelle() {
    const params = new URLSearchParams(window.location.search);
    const voitureId = params.get('id');
    
    if (!voitureId) {
        window.location.href = 'produits.html';
        return null;
    }

    const voiture = voitures.find(v => v.id === parseInt(voitureId));
    
    if (!voiture) {
        document.querySelector('.detail-page').innerHTML = '<h2 style="text-align:center; margin-top: 50px;">Voiture non trouvée</h2>';
        return null;
    }

    return voiture;
}

function afficherDetailsVoiture() {
    const voiture = obtenirVoitureActuelle();
    if (!voiture) return;

    // Infos de base
    document.getElementById('voiture-marque').textContent = voiture.marque;
    document.getElementById('voiture-titre').textContent = `${voiture.marque} ${voiture.modele}`;
    document.getElementById('voiture-prix').textContent = `${voiture.prix.toLocaleString('fr-FR')} €`;
    document.getElementById('voiture-image').src = voiture.image;
    document.title = `${voiture.marque} ${voiture.modele} - Luxe Auto`;

    // Spécifications techniques
    document.getElementById('voiture-moteur').textContent   = voiture.moteur   || 'N/A';
    document.getElementById('voiture-chevaux').textContent  = voiture.chevaux  ? `${voiture.chevaux} ch` : 'N/A';
    document.getElementById('voiture-couple').textContent   = voiture.couple   || 'N/A';
    document.getElementById('voiture-zero100').textContent  = voiture.zero100  || 'N/A';
    document.getElementById('voiture-vitesse').textContent  = voiture.vitesse  || 'N/A';

    // Descriptions
    const descriptions = {
        1: "L'Audi RS6 Avant est un break haute performance combinant luxe, confort et puissance brute. Avec son V8 biturbo de 630 chevaux, elle offre une accélération impressionnante tout en conservant l'élégance signature d'Audi.",
        2: "L'Audi A3 Sportback est une compacte sportive parfaite pour les trajets urbains. Agile, économe et technologique, elle allie performance et praticité.",
        3: "L'Audi A4 est l'une des berlines de luxe les plus appréciées au monde. Combinant design élégant, technologie avancée et confort supérieur.",
        4: "L'Audi Q5 est un SUV de prestige offrant une position de conduite élevée, un coffre spacieux et la technologie Audi de pointe.",
        5: "L'Audi R8 est une supercar iconique avec un moteur V10 naturellement aspiré de 570 chevaux. Sensations pures et design spectaculaire.",
        6: "La BMW M3 Competition est une berline sport ultra-performante avec 510 chevaux et une maniabilité exceptionnelle.",
        7: "Le BMW X5 est un SUV luxe et spacieux, idéal pour les familles cherchant puissance et confort.",
        8: "La BMW Série 3 est la berline de référence, combinant sportivité, technologie et élégance intemporelle.",
        9: "La BMW Série 5 offre le luxe ultime avec une technologie de pointe et une motorisation puissante.",
        10: "La BMW i8 est une supercar hybride futuriste alliant écologie et performances extrêmes.",
        11: "La Volkswagen Golf 8 est l'une des voitures les plus vendues au monde. Fiable, pratique et agréable à conduire.",
        12: "La Volkswagen Passat est une berline familiale spacieuse et économe en carburant.",
        13: "Le Volkswagen Tiguan est un SUV compact polyvalent parfait pour les aventuriers du quotidien.",
        14: "Le Volkswagen Touareg est un grand SUV luxe offrant confort, capacités tout-terrain et technologie.",
        15: "La Volkswagen Polo est une citadine économique et maniable, parfaite pour la ville.",
        16: "La Skoda Octavia est une berline compacte fiable et spacieuse à prix compétitif.",
        17: "La Skoda Superb est une berline élégante offrant beaucoup d'espace et de confort.",
        18: "Le Skoda Kodiaq est un SUV familial sept places combinant technologie et polyvalence.",
        19: "La Skoda Fabia est une petite citadine économe et agile en milieu urbain.",
        20: "Le Skoda Kamiq est un petit SUV urbain compact et facile à garer.",
        21: "Révolution électrique BMW. L'iX3 redéfinit le SUV allemand avec son moteur électrique ultra-moderne."
    };
    document.getElementById('voiture-description').textContent = descriptions[voiture.id] || 'Découvrez cette magnifique voiture avec toutes ses qualités exceptionnelles.';

    // Biographies
    const biographies = {
        1: "Symbole de puissance et d'excellence, l'Audi RS6 Avant redéfinit les standards de performance. Ses performances brutales couplées à un confort inégalé en font un choix de prestige pour les connaisseurs.",
        2: "Dynamique et urbaine, l'Audi A3 Sportback séduira les jeunes conducteurs en quête de sportivité et de style. Une citadine qui ne craint pas la compétition.",
        3: "Élégance et sophistication incarnées, l'Audi A4 offre l'équilibre parfait entre design intemporel et technologie moderne. Une berline pour les vrais connaisseurs.",
        4: "Prestige et capacités, le Q5 combine l'agilité urbaine avec la polyvalence d'un véritable SUV. Idéal pour les familles actives.",
        5: "Légende vivante, l'Audi R8 est une supercar qui fait battre le cœur de tout passionné. Chaque trajet devient une expérience inoubliable.",
        6: "Adrenaline et précision, la BMW M3 Competition est une bête de course domptée pour la route. Performance extrême et contrôle absolu.",
        7: "Majesté et confort, le BMW X5 offre une expérience de conduite royale. Le SUV de référence pour les familles de prestige.",
        8: "Intemporelle et fiable, la BMW Série 3 est la référence des berlines sportives. Excellence et équilibre en parfaite harmonie.",
        9: "Luxe suprême et technologie avancée, la BMW Série 5 est le nec plus ultra de l'industrie automobile. Sophistication à l'état pur.",
        10: "Futuriste et écologique, la BMW i8 prouve que performance et environnement peuvent coexister. Innovation au-delà des limites.",
        11: "Fiabilité légendaire et polyvalence, la Volkswagen Golf 8 est l'auto du peuple réinventée. Simple, efficace et toujours désirable.",
        12: "Spacieuse et economique, la Volkswagen Passat est la berline familiale par excellence. Confort et praticité garantis.",
        13: "Aventure urbaine, le Volkswagen Tiguan allie maniabilité et capacité. Parfait pour explorer sans compromis.",
        14: "Commandement et prestige, le Volkswagen Touareg offre une position de domination. Un SUV grand luxe qui impose le respect.",
        15: "Agile et efficace, la Volkswagen Polo prouve qu'une petite citadine peut avoir du caractère. Moderne et plaisante à conduire.",
        16: "Fiable et spacieuse, la Skoda Octavia offre l'excellent rapport qualité-prix. Surprenante d'efficacité.",
        17: "Élégance tchèque, la Skoda Superb combine espace et sophistication. Une berline undercover pour les connaisseurs avertis.",
        18: "Polyvalence familiale, le Skoda Kodiaq offre sept places et un grand coffre. Le SUV pratique par excellence.",
        19: "Petite mais costaud, la Skoda Fabia régale les conducteurs urbains. Efficacité et charme en petit format.",
        20: "Compact et urbain, le Skoda Kamiq apporte des solutions pratiques au quotidien. Petit SUV avec grandes ambitions.",
        21: "Révolution électrique BMW. L'iX3 redéfinit le SUV allemand avec son moteur électrique ultra-moderne. Design futuriste, autonomie exceptionnelle et accélération époustouflante."
    };
    document.getElementById('voiture-biographie').textContent = biographies[voiture.id] || "Une automobile d'exception qui vous séduira par sa qualité et ses performances.";
}

function ajouterAuPanier() {
    const voiture = obtenirVoitureActuelle();
    if (!voiture) return;

    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    panier.push(voiture);
    localStorage.setItem("panier", JSON.stringify(panier));

    alert(`${voiture.marque} ${voiture.modele} ajoutée au panier !`);
    window.location.href = 'panier.html';
}

document.addEventListener('DOMContentLoaded', afficherDetailsVoiture);