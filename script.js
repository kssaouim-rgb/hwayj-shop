function zidlpanier (bouton, taman) {
    let produit = bouton.parentElement;
    let compteur = produit.querySelector(".compteur");
    let sousTotal = produit.querySelector(".sous-total");

    let nombre = Number(compteur.innerHTML) + 1;
    compteur.innerHTML = nombre;
    sousTotal.innerHTML = nombre * taman;
        sauvegarder();
}
function n9es(bouton, taman) {
    let produit = bouton.parentElement;
    let compteur = produit.querySelector(".compteur");
    let sousTotal = produit.querySelector(".sous-total");

    let nombre = Number(compteur.innerHTML);
    if (nombre > 0) {
        nombre = nombre - 1;
    }
    compteur.innerHTML = nombre;
    sousTotal.innerHTML = nombre * taman;
        sauvegarder();
}

function envoyerCommande() {
    let message = "Salam, bghit ntlob:\n";
    let total = 0;

    let produits = document.querySelectorAll(".produit");

    for (let produit of produits) {
        let nom = produit.querySelector("h3").innerHTML;
        let nombre = Number(produit.querySelector(".compteur").innerHTML);
        let prix = Number(produit.querySelector(".sous-total").innerHTML);

        if (nombre > 0) {
            message = message + "- " + nom + " x" + nombre + " = " + prix + " DH\n";
            total = total + prix;
        }
    }

    if (total === 0) {
        alert("L panier farigh!");
        return;
    }

    message = message + "Total: " + total + " DH";
    let lien = "https://wa.me/2120631599100?text=" + encodeURIComponent(message);
    window.open(lien, "_blank");
}
function basculerMenu() {
    document.getElementById("menu").classList.toggle("ouvert");
    document.getElementById("fond").classList.toggle("visible");
}

function ouvrirInfo(id) {
    fermerInfo();
    document.getElementById("menu").classList.remove("ouvert");
    document.getElementById("fond").classList.remove("visible");
    document.getElementById(id).classList.add("visible");
}

function fermerInfo() {
    let infos = document.querySelectorAll(".info");
    for (let info of infos) {
        info.classList.remove("visible");
    }
}
function allerA(id) {
    document.getElementById("menu").classList.remove("ouvert");
    document.getElementById("fond").classList.remove("visible");
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}
function majBadge() {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    let somme = 0;
    for (let ligne of panier) {
        somme = somme + Number(ligne.nombre);
    }
    document.getElementById("badge").innerHTML = somme;
}
function sauvegarder() {
    let produits = document.querySelectorAll(".produit");
    let panier = [];
    for (let produit of produits) {
        let nombre = produit.querySelector(".compteur").innerHTML;
        let total = produit.querySelector(".sous-total").innerHTML;
        panier.push({ nombre: nombre, total: total });
    }
    localStorage.setItem("panier", JSON.stringify(panier));
    majBadge();
}
function charger() {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    let produits = document.querySelectorAll(".produit");
    for (let i = 0; i < produits.length; i++) {
        if (panier[i]) {
            produits[i].querySelector(".compteur").innerHTML = panier[i].nombre;
            produits[i].querySelector(".sous-total").innerHTML = panier[i].total;
        }
    }
}
charger();
majBadge();
const LIVRAISON = 30;

function ouvrirCommande() {
    let produits = document.querySelectorAll(".produit");
    let lignes = document.getElementById("cmd-lignes");
    lignes.innerHTML = "";
    let prix = 0;

    for (let produit of produits) {
        let nombre = Number(produit.querySelector(".compteur").innerHTML);
        if (nombre > 0) {
            let nom = produit.querySelector("h3").innerHTML;
            let image = produit.querySelector("img").getAttribute("src");
            let total = Number(produit.querySelector(".sous-total").innerHTML);
            prix = prix + total;
            lignes.innerHTML += '<div class="cmd-ligne"><img src="' + image + '"><span class="nom">' + nom + ' (x' + nombre + ')</span><span class="prix">' + total + ' DH</span></div>';
        }
    }

    if (prix === 0) {
        alert("L panier farigh!");
        return;
    }

    document.getElementById("cmd-prix").innerHTML = prix + " DH";
    document.getElementById("cmd-livraison").innerHTML = LIVRAISON + " DH";
    document.getElementById("cmd-total").innerHTML = (prix + LIVRAISON) + " DH";
    document.getElementById("cmd").classList.add("visible");
}

function fermerCommande() {
    document.getElementById("cmd").classList.remove("visible");
}
function ouvrirGalerie(img) {
    let produit = img.parentElement;
    let images = produit.querySelectorAll("img");
    let conteneur = document.getElementById("galerie-photos");
    conteneur.innerHTML = "";

    for (let image of images) {
        conteneur.innerHTML += '<img src="' + image.getAttribute("src") + '" alt="photo produit">';
    }

    conteneur.scrollLeft = 0;
    document.getElementById("galerie").classList.add("visible");
}

function fermerGalerie() {
    document.getElementById("galerie").classList.remove("visible");
}
function confirmerCommande() {
    let nom = document.getElementById("cmd-nom").value.trim();
    let tel = document.getElementById("cmd-tel").value.trim();
    let adresse = document.getElementById("cmd-adresse").value.trim();

    if (nom === "" || tel === "" || adresse === "") {
        alert("Merci de remplir tous les champs");
        return;
    }

    let produits = document.querySelectorAll(".produit");
    let message = "Bonjour, je souhaite passer la commande :\n\n";
    let prix = 0;

    for (let produit of produits) {
        let nombre = Number(produit.querySelector(".compteur").innerHTML);
        if (nombre > 0) {
            let nomProduit = produit.querySelector("h3").innerHTML;
            let total = Number(produit.querySelector(".sous-total").innerHTML);
            prix = prix + total;
            message = message + "- " + nomProduit + " x" + nombre + " = " + total + " DH\n";
        }
    }

    message = message + "\nPrix : " + prix + " DH";
    message = message + "\nLivraison : " + LIVRAISON + " DH";
    message = message + "\nTotal : " + (prix + LIVRAISON) + " DH\n";
    message = message + "\nNom : " + nom;
    message = message + "\nTéléphone : " + tel;
    message = message + "\nAdresse : " + adresse;

    let lien = "https://wa.me/212631599100?text=" + encodeURIComponent(message);
    window.open(lien, "_blank");
}