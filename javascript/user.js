const API_URL = "../php/api.php";

function showMessage(text, type = "info") {
    const el = document.getElementById("auth-message");
    if (!el) return;
    el.textContent = text;
    el.className = `auth-message ${type}`;
}

function clearMessage() {
    const el = document.getElementById("auth-message");
    if (!el) return;
    el.textContent = "";
    el.className = "auth-message";
}

function togglePassword(fieldId) {
    const input = document.getElementById(fieldId);
    if (!input) return;
    input.type = input.type === "password" ? "text" : "password";
}

// ============================================================
//  INSCRIPTION
// ============================================================
async function validerInscription(e) {
    e.preventDefault();
    clearMessage();

    const nom     = document.getElementById("nom").value.trim();
    const email   = document.getElementById("email").value.trim();
    const pass    = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex  = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!nom)                       { showMessage("Veuillez saisir votre nom.", "error"); return; }
    if (!emailRegex.test(email))    { showMessage("Email invalide.", "error"); return; }
    if (!passRegex.test(pass))      { showMessage("Mot de passe invalide. 6 caractères min avec 1 chiffre.", "error"); return; }
    if (pass !== confirm)           { showMessage("Les mots de passe ne correspondent pas.", "error"); return; }

    const parts  = nom.split(" ");
    const prenom = parts[0];
    const nomFam = parts.slice(1).join(" ") || prenom;

    const formData = new FormData();
    formData.append("nom",                  nomFam);
    formData.append("prenom",               prenom);
    formData.append("email",                email);
    formData.append("mot_de_passe",         pass);
    formData.append("mot_de_passe_confirm", confirm);

    try {
        const response = await fetch(`${API_URL}?action=inscription`, {
            method: "POST",
            body: formData
        });
        const data = await response.json();

        if (data.succes) {
            showMessage(data.message, "success");
            setTimeout(() => { window.location.href = "connexion.html"; }, 1200);
        } else {
            showMessage(data.erreur || "Erreur lors de l'inscription.", "error");
        }
    } catch (err) {
        showMessage("Impossible de contacter le serveur.", "error");
    }
}

// ============================================================
//  CONNEXION
// ============================================================
async function connexion(e) {
    e.preventDefault();
    clearMessage();

    const email = document.getElementById("email").value.trim();
    const pass  = document.getElementById("password").value;

    if (!email || !pass) { showMessage("Veuillez remplir tous les champs.", "error"); return; }

    const formData = new FormData();
    formData.append("email",        email);
    formData.append("mot_de_passe", pass);

    try {
        const response = await fetch(`${API_URL}?action=connexion`, {
            method: "POST",
            body: formData,
            credentials: "include"
        });
        const data = await response.json();

        if (data.succes) {
            localStorage.setItem("user", JSON.stringify(data.utilisateur));
            showMessage("Connexion réussie ! Redirection...", "success");
            setTimeout(() => { window.location.href = "../index.html"; }, 900);
        } else {
            showMessage(data.erreur || "Email ou mot de passe incorrect.", "error");
        }
    } catch (err) {
        showMessage("Impossible de contacter le serveur.", "error");
    }
}

// ============================================================
//  DÉCONNEXION
// ============================================================
async function deconnexion() {
    try {
        await fetch(`${API_URL}?action=deconnexion`, { credentials: "include" });
    } catch (e) {}
    localStorage.removeItem("user");
    window.location.href = "../content/connexion.html";
}
