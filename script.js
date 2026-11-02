function zidlpanier(bouton, taman) {
    let produit = bouton.parentElement;
    let compteur = produit.querySelector(".compteur");
    let sousTotal = produit.querySelector(".sous-total");

    let nombre = Number(compteur.innerHTML) + 1;
    compteur.innerHTML = nombre;
    sousTotal.innerHTML = nombre * taman;
}