let panier = JSON.parse(localStorage.getItem("panier")) || [];

function afficherRecap() {
    const div = document.getElementById("recap");

    if (!div) return;

    let total = 0;
    div.innerHTML = "";
    

    if (panier.length === 0) {
        div.innerHTML = "<p>Votre panier est vide 🛒</p>";
        return;
    }

    panier.forEach(p => {
        total += p.prix;
        div.innerHTML += `<p>${p.marque} ${p.modele} - ${p.prix}€</p>`;
    });

    div.innerHTML += `<h2>Total : ${total} €</h2>`;
}

function validerCommande() {
    if (panier.length === 0) {
        alert("Panier vide !");
        return;
    }

    panier = [];
    localStorage.setItem("panier", JSON.stringify(panier));

    alert("🎉 Commande confirmée !");
    window.location.href = "../index.html";
}

document.addEventListener("DOMContentLoaded", afficherRecap);
