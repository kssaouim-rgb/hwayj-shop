function zidlpanier (bouton, taman) {
    let produit = bouton.parentElement;
    let compteur = produit.querySelector(".compteur");
    let sousTotal = produit.querySelector(".sous-total");

    let nombre = Number(compteur.innerHTML) + 1;
    compteur.innerHTML = nombre;
    sousTotal.innerHTML = nombre * taman;
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
    let menu = document.getElementById("menu");
    menu.classList.toggle("ouvert");
}
function ouvrirInfo(id) {
    fermerInfo();
    document.getElementById("menu").classList.remove("ouvert");
    document.getElementById(id).classList.add("visible");
}

function fermerInfo() {
    let infos = document.querySelectorAll(".info");
    for (let info of infos) {
        info.classList.remove("visible");
    }
}