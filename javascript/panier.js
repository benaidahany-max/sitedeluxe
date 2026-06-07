// ============================================================
//  panier.js — Panier connecté au backend PHP
// ============================================================

const API_URL = "../php/api.php";

// ---- Charger le panier depuis le serveur ----
async function chargerPanier() {
    try {
        const res  = await fetch(`${API_URL}?action=panier_afficher`, { credentials: "include" });
        const data = await res.json();
        if (data.succes) {
            afficherPanier(data.panier);
        } else {
            // Si non connecté → fallback localStorage
            const local = JSON.parse(localStorage.getItem("panier")) || [];
            afficherPanier(local);
        }
    } catch (e) {
        const local = JSON.parse(localStorage.getItem("panier")) || [];
        afficherPanier(local);
    }
}

// ---- Afficher les items du panier ----
function afficherPanier(items) {
    const box        = document.getElementById("panier-container");
    const actionsBox = document.getElementById("actions-container");
    if (!box || !actionsBox) return;

    if (!items || items.length === 0) {
        box.innerHTML = `
            <section class="empty-state">
                <h2>Votre panier est vide</h2>
                <p>Ajoutez une voiture depuis la page de produits pour commencer votre réservation.</p>
                <a class="btn btn-secondary" href="produits.html">Voir les voitures</a>
            </section>`;
        actionsBox.innerHTML = "";
        return;
    }

    // Grouper les doublons
    const map = new Map();
    items.forEach(item => {
        const key = item.id;
        if (!map.has(key)) map.set(key, { ...item, quantite: 1 });
        else map.get(key).quantite += 1;
    });
    const grouped = Array.from(map.values());

    let total = 0;
    box.innerHTML = "";

    grouped.forEach(item => {
        const sousTotal = item.prix * item.quantite;
        total += sousTotal;
        box.innerHTML += `
        <div class="cart-card">
            <img src="${item.image}" alt="${item.marque} ${item.modele}">
            <div class="cart-card-details">
                <h3>${item.marque} ${item.modele}</h3>
                <p>${Number(item.prix).toLocaleString('fr-FR')} € par unité</p>
                <div class="quantity-controls">
                    <button onclick="changerQuantite(${item.id}, -1)">-</button>
                    <span>${item.quantite}</span>
                    <button onclick="changerQuantite(${item.id}, 1)">+</button>
                </div>
            </div>
            <div class="cart-card-info">
                <strong>Sous-total</strong>
                <p>${sousTotal.toLocaleString('fr-FR')} €</p>
                <button class="btn btn-secondary" onclick="supprimerItem(${item.id})">Supprimer</button>
            </div>
        </div>`;
    });

    actionsBox.innerHTML = `
    <div>
        <h2>Total panier</h2>
        <p>${total.toLocaleString('fr-FR')} €</p>
    </div>
    <div class="summary-actions">
        <button onclick="acheter()" class="btn btn-primary">Payer</button>
        <button onclick="viderPanier()" class="btn btn-secondary">Vider le panier</button>
    </div>`;
}

// ---- Changer la quantité ----
async function changerQuantite(id, delta) {
    const formData = new FormData();
    formData.append("voiture_id", id);

    if (delta === 1) {
        formData.append("action", "panier_ajouter");
    } else {
        formData.append("action", "panier_supprimer");
    }

    try {
        await fetch(`${API_URL}`, { method: "POST", body: formData, credentials: "include" });
    } catch (e) {}
    chargerPanier();
}

// ---- Supprimer un item ----
async function supprimerItem(id) {
    const formData = new FormData();
    formData.append("action",     "supprimer");
    formData.append("voiture_id", id);

    try {
        await fetch(`${API_URL}`, { method: "POST", body: formData, credentials: "include" });
    } catch (e) {}
    chargerPanier();
}

// ---- Vider le panier ----
async function viderPanier() {
    const formData = new FormData();
    formData.append("action", "panier_vider");

    try {
        await fetch(`${API_URL}`, { method: "POST", body: formData, credentials: "include" });
    } catch (e) {}
    chargerPanier();
}

// ---- Ouvrir le modal de paiement ----
function acheter() {
    document.getElementById("payment-modal").style.display = "flex";
}

function fermerModal() {
    document.getElementById("payment-modal").style.display = "none";
}

// ---- Confirmer le paiement ----
async function confirmerPaiement() {
    const nom    = document.getElementById("card-name").value.trim();
    const num    = document.getElementById("card-number").value.trim();
    const date   = document.getElementById("card-date").value.trim();
    const cvv    = document.getElementById("card-cvv").value.trim();

    if (!nom || !num || !date || !cvv) {
        alert("Veuillez remplir tous les champs de paiement."); return;
    }

    const formData = new FormData();
    formData.append("action", "panier_payer");

    try {
        const res  = await fetch(`${API_URL}`, { method: "POST", body: formData, credentials: "include" });
        const data = await res.json();

        if (data.succes) {
            fermerModal();
            alert(data.message);
            chargerPanier();
        } else {
            alert(data.erreur || "Erreur lors du paiement.");
        }
    } catch (e) {
        // Fallback si pas de serveur
        alert("Achat effectué ! Merci de votre réservation.");
        fermerModal();
    }
}

document.addEventListener("DOMContentLoaded", chargerPanier);
