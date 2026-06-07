// ============================================================
//  produits.js — Catalogue connecté au backend PHP
//  Affichage identique à l'original
// ============================================================

const API_URL = "../php/api.php";

const voitures = [
    { id:1,  marque:"Audi",       modele:"RS6 Avant",      prix:140000, image:"https://content.presspage.com/uploads/1442/1920_rs6-000002hoofdfoto-654949.jpg?10000",  moteur:"4.0L V8 Biturbo", chevaux:630,  couple:"850 Nm",  zero100:"3.4 sec", vitesse:"305 km/h" },
    { id:2,  marque:"Audi",       modele:"A3 Sportback",   prix:35000,  image:"https://aupvuiezrp.cloudimg.io/v7/https://s3.eu-central-1.amazonaws.com/datamotive-sulu-assets/pouw-content/01/dsc01718.jpg?width=840&height=630", moteur:"2.0L TFSI", chevaux:150, couple:"250 Nm", zero100:"8.4 sec", vitesse:"224 km/h" },
    { id:3,  marque:"Audi",       modele:"A4",             prix:45000,  image:"https://cms-assets.autoscout24.com/uaddx06iwzdz/of50RgUFUJU9XuoP5qhJm/a1a83caf7250edd7f91b245046538031/audi-a4-2019-29-2.jpg?w=1100", moteur:"2.0L TFSI", chevaux:190, couple:"320 Nm", zero100:"7.3 sec", vitesse:"240 km/h" },
    { id:4,  marque:"Audi",       modele:"Q5",             prix:60000,  image:"https://emea-dam.audi.com/adobe/assets/urn:aaid:aem:982642eb-c19a-4133-91b2-ee4e7effda58/as/Q5_2024_6823_V1-S.jpg?width=576", moteur:"2.0L TFSI", chevaux:204, couple:"340 Nm", zero100:"7.6 sec", vitesse:"222 km/h" },
    { id:5,  marque:"Audi",       modele:"R8",             prix:180000, image:"https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800", moteur:"5.2L V10", chevaux:570, couple:"550 Nm", zero100:"3.5 sec", vitesse:"330 km/h" },
    { id:6,  marque:"BMW",        modele:"M3 Competition", prix:100000, image:"https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=800", moteur:"3.0L 6 cylindres Twin Turbo", chevaux:510, couple:"650 Nm", zero100:"3.9 sec", vitesse:"290 km/h" },
    { id:7,  marque:"BMW",        modele:"X5",             prix:80000,  image:"https://smartcdn.gprod.postmedia.digital/driving/wp-content/uploads/2024/09/bmw-x5-edition-25-ja-5.jpg", moteur:"3.0L 6 cylindres", chevaux:286, couple:"650 Nm", zero100:"6.1 sec", vitesse:"235 km/h" },
    { id:8,  marque:"BMW",        modele:"Série 3",        prix:50000,  image:"https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800", moteur:"2.0L Diesel", chevaux:190, couple:"400 Nm", zero100:"7.1 sec", vitesse:"235 km/h" },
    { id:9,  marque:"BMW",        modele:"Série 5",        prix:65000,  image:"https://images.netdirector.co.uk/gforces-auto/image/upload/w_392,h_294,dpr_2.0,q_auto,c_fill,f_auto,fl_lossy/auto-client/f78cb706d9638a083c8324f1fc5674c6/2023_07_12_bmw_mena_5_series_performance.jpg", moteur:"2.0L TwinPower", chevaux:530, couple:"650 Nm", zero100:"3.7 sec", vitesse:"250 km/h" },
    { id:10, marque:"BMW",        modele:"i8",             prix:150000, image:"https://images.thewest.com.au/publication/B88993698Z/1539744580702_G211SJPT1.2-1.jpg", moteur:"2.0L Turbo", chevaux:252, couple:"350 Nm", zero100:"6.0 sec", vitesse:"250 km/h" },
    { id:11, marque:"Volkswagen", modele:"Golf 8",         prix:30000,  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH6T3RlM6xMWVqHVUIA__WbZk66g6w4d9fpQ&s", moteur:"1.5L TSI", chevaux:150, couple:"250 Nm", zero100:"8.5 sec", vitesse:"224 km/h" },
    { id:12, marque:"Volkswagen", modele:"Passat",         prix:40000,  image:"https://uploads.vw-mms.de/system/production/images/vwn/029/415/images/869424d4159b91be4431c309c1e63f53ea727f0f/DB2019AU00902_web_1600.jpg?1649155074", moteur:"2.0L TDI", chevaux:150, couple:"340 Nm", zero100:"8.2 sec", vitesse:"220 km/h" },
    { id:13, marque:"Volkswagen", modele:"Tiguan",         prix:42000,  image:"https://cms-assets.autoscout24.com/uaddx06iwzdz/6yKTRNqqp1WsmunBH4nnal/46330e3d67cdba09a9c5c7c14f7b0402/volkswagen-tiguan-front.jpeg?w=1100", moteur:"2.0L TSI", chevaux:190, couple:"320 Nm", zero100:"7.4 sec", vitesse:"210 km/h" },
    { id:14, marque:"Volkswagen", modele:"Touareg",        prix:70000,  image:"https://uploads.vw-mms.de/system/production/images/vwn/038/976/images/4e9b0c09e53070c4e90708f0153ff34298b21394/DB2022AU00475_web_1600.jpg?1653306096", moteur:"3.0L V6", chevaux:286, couple:"600 Nm", zero100:"6.1 sec", vitesse:"235 km/h" },
    { id:15, marque:"Volkswagen", modele:"Polo",           prix:20000,  image:"https://www.cacars.co.uk/Posts/files/vw-polo-review-1_638327865225965726.jpg", moteur:"1.0L TSI", chevaux:95, couple:"175 Nm", zero100:"10.8 sec", vitesse:"187 km/h" },
    { id:16, marque:"Skoda",      modele:"Octavia",        prix:28000,  image:"https://images.caradisiac.com/logos/1/1/8/1/261181/S0-nouvelle-skoda-octavia-prix-a-partir-de-26-430-eur-184158.jpg", moteur:"2.0L TDI", chevaux:150, couple:"360 Nm", zero100:"8.1 sec", vitesse:"230 km/h" },
    { id:17, marque:"Skoda",      modele:"Superb",         prix:42000,  image:"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e4c9d505-d055-45f2-aa11-7d8a2f9c57ed/d8p0sg3-1fedb6da-fcde-4792-a8d6-f85feb8aa63f.jpg/v1/fill/w_1600,h_1063,q_75,strp/2016_skoda_superb_in_magnetic_brown_by_splicer436_d8p0sg3-fullview.jpg", moteur:"2.0L TSI", chevaux:280, couple:"350 Nm", zero100:"5.8 sec", vitesse:"250 km/h" },
    { id:18, marque:"Skoda",      modele:"Kodiaq",         prix:45000,  image:"https://www.largus.fr/images/styles/max_1300x1300/public/images/skoda-kodiaq-scout.jpg?itok=GoN8lziI", moteur:"2.0L TDI", chevaux:190, couple:"400 Nm", zero100:"8.0 sec", vitesse:"210 km/h" },
    { id:19, marque:"Skoda",      modele:"Fabia",          prix:20000,  image:"https://cdn.skoda-auto.com/images/sites/enmaster-v2/5124113b-085e-48a6-a682-72770bfdad77/3b7484b16f6ce90a40121ee87e4db4c4/ModelCharacterGalleryModule/7632a1f0aa516594d6a0e94356eefae7250acf63669750b30971a08237c5496b/Default_bp1920_1.webp", moteur:"1.0L MPI", chevaux:80, couple:"95 Nm", zero100:"14 sec", vitesse:"170 km/h" },
    { id:20, marque:"Skoda",      modele:"Kamiq",          prix:25000,  image:"https://images.autoweek.nl/256968377/width/1024/256968377", moteur:"1.0L TSI", chevaux:115, couple:"200 Nm", zero100:"10.0 sec", vitesse:"195 km/h" },
    { id:21, marque:"BMW",        modele:"I3X SUV",        prix:65000,  image:"https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=800", moteur:"Electric", chevaux:469, couple:"645 Nm", zero100:"4.9 sec", vitesse:"200 km/h" }
];

let panier = JSON.parse(localStorage.getItem("panier")) || [];
let listeActive = [...voitures];

// ============================================================
//  PANIER — Ajouter via PHP ou localStorage (fallback)
// ============================================================
async function ajouterPanier(id) {
    const produit = voitures.find(v => v.id === id);
    if (!produit) return;

    try {
        const formData = new FormData();
        formData.append("action",     "panier_ajouter");
        formData.append("voiture_id", id);

        const res  = await fetch(API_URL, { method: "POST", body: formData, credentials: "include" });
        const data = await res.json();

        if (data.erreur && data.erreur.includes("connecté")) {
            ajouterLocalStorage(produit);
        } else {
            updateCartCount();
            alert(`${produit.marque} ${produit.modele} ajouté au panier !`);
        }
    } catch (e) {
        ajouterLocalStorage(produit);
    }
}

function ajouterLocalStorage(produit) {
    panier.push(produit);
    localStorage.setItem("panier", JSON.stringify(panier));
    updateCartCount();
    alert(`${produit.marque} ${produit.modele} ajouté au panier !`);
}

function updateCartCount() {
    const badge = document.getElementById("cart-count");
    if (!badge) return;
    const local = JSON.parse(localStorage.getItem("panier")) || [];
    badge.textContent = local.length;
}

// ============================================================
//  AFFICHAGE DU CATALOGUE — identique à l'original
// ============================================================
function afficherVoitures(liste = voitures) {
    const container = document.getElementById("produits-container");
    if (!container) return;
    container.innerHTML = "";

    liste.forEach(v => {
     container.innerHTML +=
     `
<div class="product-card" onclick="voirDetails(${v.id})" draggable="true" ondragstart="drag(event, ${v.id})">
    <div class="product-image">
        <img src="${v.image}" alt="${v.marque} ${v.modele}">
    </div>
    <div class="product-info">
        <div class="product-brand">${v.marque}</div>
        <div class="product-name">${v.modele}</div>
        <div class="product-specs">
            <p><strong>${v.chevaux}</strong> ch | <strong>${v.zero100}</strong> | <strong>${v.vitesse}</strong></p>
        </div>
        <div class="product-price">${v.prix.toLocaleString('fr-FR')} €</div>
        <div class="product-actions">
            <button class="btn-view" onclick="event.stopPropagation(); voirDetails(${v.id})">Consulter</button>
            <button class="btn-view" onclick="event.stopPropagation(); ajouterPanier(${v.id})">Panier</button>
        </div>
    </div>
</div>
`;
    });
}

// ============================================================
//  FILTRE PAR MARQUE
// ============================================================
function filtrer(marque) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.includes(marque) || (marque === "Tous" && btn.textContent.includes("Tous"))) {
            btn.classList.add('active');
        }
    });
    listeActive = marque === "Tous" ? [...voitures] : voitures.filter(v => v.marque === marque);
    afficherVoitures(listeActive);
}

// ============================================================
//  RECHERCHE
// ============================================================
function rechercher() {
    const value = document.getElementById("search")?.value.toLowerCase();
    const result = listeActive.filter(v =>
        v.marque.toLowerCase().includes(value) ||
        v.modele.toLowerCase().includes(value)
    );
    afficherVoitures(result);
}

// ============================================================
//  DÉTAIL D'UNE VOITURE
// ============================================================
function voirDetails(id) {
    window.location.href = `voiture-detail.html?id=${id}`;
}

// ============================================================
//  DRAG & DROP
// ============================================================
function allowDrop(ev) { ev.preventDefault(); }
function drag(ev, id)  { ev.dataTransfer.setData("id", id); }
function drop(ev) {
    ev.preventDefault();
    const id = ev.dataTransfer.getData("id");
    ajouterPanier(Number(id));
}

// ============================================================
//  INIT
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
    afficherVoitures(voitures);
    updateCartCount();
});
