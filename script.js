function zidlpanier(bouton) {
    let produit = bouton.parentElement;
    let element = produit.querySelector(".compteur");
    element.innerHTML = Number(element.innerHTML) + 1;
}