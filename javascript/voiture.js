document.addEventListener("DOMContentLoaded", () => {

    const id = localStorage.getItem("selectedCar");

    const voiture = voitures.find(v => v.id == id);

    const box = document.getElementById("car-details");

    if (!box) {
        console.log("DIV car-details introuvable");
        return;
    }

    if (!voiture) {
        box.innerHTML = "<h2>Voiture introuvable</h2>";
        return;
    }

    box.innerHTML = `
        <div class="car-detail-card">
            <h1>${voiture.marque} ${voiture.modele}</h1>
            <img src="${voiture.image}" alt="${voiture.marque} ${voiture.modele}">
            <div class="car-detail-specs">
                <div class="spec"><b>Moteur:</b><br>${voiture.moteur || "Non renseigné"}</div>
                <div class="spec"><b>Chevaux:</b><br>${voiture.chevaux || "Non renseigné"}</div>
                <div class="spec"><b>Couple:</b><br>${voiture.couple || "Non renseigné"}</div>
                <div class="spec"><b>0-100:</b><br>${voiture.zero100 || "Non renseigné"}</div>
                <div class="spec"><b>Vitesse:</b><br>${voiture.vitesse || "Non renseigné"}</div>
                <div class="spec"><b>Prix:</b><br>${voiture.prix} €</div>
            </div>
        </div>
    `;
});