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

function ouvrirCommandeAncien() {
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
        alert("L panier khawi!");
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
function confirmerCommandeAncien() {
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
function filtrer(categorie, bouton) {
    let boutons = document.querySelectorAll(".filtre");
    for (let b of boutons) {
        b.classList.remove("actif");
    }
    bouton.classList.add("actif");

    let produits = document.querySelectorAll(".produit");
    for (let produit of produits) {
        let cat = produit.dataset.categorie || "";
        if (categorie === "tous" || cat.includes(categorie)) {
            produit.style.display = "";
        } else {
            produit.style.display = "none";
        }
    }
}
document.addEventListener("click", function (e) {
    let bouton = e.target.closest(".couleur, .taille");
    if (!bouton) return;

    let groupe = bouton.parentElement;
    for (let b of groupe.children) {
        b.classList.remove("actif");
    }
    bouton.classList.add("actif");
});
function ouvrirContact() {
    document.getElementById("menu").classList.remove("ouvert");
    document.getElementById("fond").classList.remove("visible");
    document.getElementById("contact-cmd").classList.add("visible");
}

function fermerContact() {
    document.getElementById("contact-cmd").classList.remove("visible");
}

function choisirContact(type, bouton) {
    let boutons = document.querySelectorAll(".choix-btn");
    for (let b of boutons) {
        b.classList.remove("actif");
    }
    bouton.classList.add("actif");

    document.getElementById("contact-commande").style.display = type === "commande" ? "block" : "none";
    document.getElementById("contact-autre").style.display = type === "autre" ? "block" : "none";
}

function envoyerContact() {
    let estCommande = document.getElementById("contact-commande").style.display !== "none";
    let message = document.getElementById("contact-message").value.trim();
    let texte = "";

    if (estCommande) {
        let nom = document.getElementById("cc-nom").value.trim();
        let tel = document.getElementById("cc-tel").value.trim();
        if (!nom || !tel || !message) {
            alert("Merci de remplir tous les champs");
            return;
        }
        texte = "Bonjour, question sur ma commande.\n"
              + "Nom : " + nom + "\n"
              + "Téléphone : " + tel + "\n"
              + "Message : " + message;
    } else {
        let nom = document.getElementById("ca-nom").value.trim();
        let sujet = document.getElementById("ca-sujet").value;
        if (!nom || !message) {
            alert("Merci de remplir tous les champs");
            return;
        }
        texte = "Bonjour, ma question concerne : " + sujet + "\n"
              + "Nom : " + nom + "\n"
              + "Message : " + message;
    }

    window.open("https://wa.me/212631599100?text=" + encodeURIComponent(texte), "_blank");
}
// ===== Panier avec options =====

// 1) Kay9ra l panier mn l tlfon (ila khawi, kayrje3 lista khawya)
function lirePanier() {
    try {
        return JSON.parse(localStorage.getItem("panier2")) || [];
    } catch (e) {
        return [];
    }
}

// 2) Kay7fed l panier f l tlfon w kayzid l badge
function ecrirePanier(panier) {
    localStorage.setItem("panier2", JSON.stringify(panier));
    majBadge2();
}

// 3) Kay7sseb ch7al men 7aja f l panier w kaktbha f l badge
function majBadge2() {
    let panier = lirePanier();
    let total = 0;
    for (let ligne of panier) {
        total += ligne.qte;
    }
    let badge = document.getElementById("badge");
    if (badge) {
        badge.textContent = total;
    }
}

// 4) L fonction l kbira: kat7ett produit f l panier
function ajouterAuPanier(bouton, prix) {
    let carte = bouton.closest(".produit");
    let nom = carte.querySelector("h3").textContent;
    let image = carte.querySelector("img").getAttribute("src");

    let couleur = "";
    let pointure = "";

    // Ila produit fih couleurs, khass l client ykhtar wa7da
    if (carte.querySelector(".couleur")) {
        let c = carte.querySelector(".couleur.actif");
        if (!c) {
            alert("Choisissez une couleur");
            return;
        }
        couleur = c.dataset.nom;
    }

    // Ila produit fih pointures, khass l client ykhtar wa7da
    if (carte.querySelector(".taille")) {
        let t = carte.querySelector(".taille.actif");
        if (!t) {
            alert("Choisissez une pointure");
            return;
        }
        pointure = t.textContent;
    }

    let panier = lirePanier();
    let existe = false;

    // Ila nfs produit + nfs couleur + nfs pointure: zid l 9dr
    for (let ligne of panier) {
        if (ligne.nom === nom && ligne.couleur === couleur && ligne.pointure === pointure) {
            ligne.qte++;
            existe = true;
            break;
        }
    }

    // Ila ma kaynach: ligne jdida
    if (!existe) {
        panier.push({ nom: nom, image: image, prix: prix, couleur: couleur, pointure: pointure, qte: 1 });
    }

    ecrirePanier(panier);

    bouton.textContent = "Ajouté ✓";
    setTimeout(function () {
        bouton.textContent = "Ajouter au panier";
    }, 1200);
}

majBadge2();
function ouvrirCommande() {
    let panier = lirePanier();
    let lignes = document.getElementById("cmd-lignes");
    lignes.innerHTML = "";
    let prix = 0;

    for (let ligne of panier) {
        let options = "";
        if (ligne.couleur) {
            options = ligne.couleur;
        }
        if (ligne.pointure) {
            if (options) {
                options = options + " · ";
            }
            options = options + "Pointure " + ligne.pointure;
        }

        lignes.innerHTML += '<div class="cmd-ligne">'
            + '<img src="' + ligne.image + '" alt="">'
            + '<div><p>' + ligne.nom + ' (x' + ligne.qte + ')</p>'
            + '<small>' + options + '</small></div>'
            + '<p>' + (ligne.prix * ligne.qte) + ' DH</p>'
            + '</div>';

        prix += ligne.prix * ligne.qte;
    }

    if (prix === 0) {
        alert("L panier farigh!");
        return;
    }

    document.getElementById("cmd-prix").textContent = prix + " DH";
    document.getElementById("cmd-livraison").textContent = LIVRAISON + " DH";
    document.getElementById("cmd-total").textContent = (prix + LIVRAISON) + " DH";
    document.getElementById("cmd").classList.add("visible");
}
function confirmerCommande() {
    let nom = document.getElementById("cmd-nom").value.trim();
    let tel = document.getElementById("cmd-tel").value.trim();
    let adresse = document.getElementById("cmd-adresse").value.trim();

    if (!nom || !tel || !adresse) {
        alert("Merci de remplir tous les champs");
        return;
    }

    let panier = lirePanier();
    let message = "Bonjour, je souhaite commander :\n";
    let prix = 0;

    for (let ligne of panier) {
        let details = "";
        if (ligne.couleur) {
            details = details + " - " + ligne.couleur;
        }
        if (ligne.pointure) {
            details = details + " - Pointure " + ligne.pointure;
        }
        message = message + "- " + ligne.nom + details + " x" + ligne.qte
                + " = " + (ligne.prix * ligne.qte) + " DH\n";
        prix = prix + ligne.prix * ligne.qte;
    }

    message = message + "\nPrix : " + prix + " DH"
            + "\nLivraison : " + LIVRAISON + " DH"
            + "\nTotal : " + (prix + LIVRAISON) + " DH"
            + "\n\nNom : " + nom
            + "\nTéléphone : " + tel
            + "\nAdresse : " + adresse;

    window.open("https://wa.me/212631599100?text=" + encodeURIComponent(message), "_blank");

    // Mn b3d l'ersal: kharrej l panier w sedd popup
    localStorage.removeItem("panier2");
    majBadge2();
    fermerCommande();
}