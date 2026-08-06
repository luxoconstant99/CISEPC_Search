function normaliser(texte) {
    return texte
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}


async function chercher() {

    let mot = normaliser(document.getElementById("recherche").value.trim());
    let zone = document.getElementById("resultats");

    if (mot === "") {
        zone.innerHTML = "<h3>Veuillez saisir un mot à rechercher.</h3>";
        return;
    }

    let reponse = await fetch("/data");

    let donnees = await reponse.json();

    zone.innerHTML = "";

    let motsRecherche = mot.split(" ");

    let resultat = donnees.filter(item => {

let contenu = normaliser(
    (item.titre || "") + " " +
    (item.categorie || "") + " " +
    (item.description || "")
);
        return motsRecherche.every(mot => contenu.includes(mot));

    });


    if (resultat.length === 0) {

        zone.innerHTML = "<h3>Aucun résultat trouvé.</h3>";

        return;
    }


    zone.innerHTML = "<h3>" + resultat.length + " résultat(s) trouvé(s)</h3>";


    resultat.forEach(item => {

        zone.innerHTML += `

        <div class="resultat">

            <h2>🔎 ${item.titre}</h2>

            <h4>Catégorie : ${item.categorie}</h4>

            <p>${item.description}</p>

            <a href="${item.url}" target="_blank">
                <button>Voir</button>
            </a>

        </div>

        `;

    });

}