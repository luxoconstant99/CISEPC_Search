
async function chercher() {

    let mot = document.getElementById("recherche").value.toLowerCase();

    let zone = document.getElementById("resultats");

    if (mot.trim() === "") {
        zone.innerHTML = "<h3>Veuillez saisir un mot à rechercher.</h3>";
        return;
    }

    let reponse = await fetch("/data");

    let donnees = await reponse.json();
zone.innerHTML = "";

    let resultat = donnees.filter(item =>
        item.titre.toLowerCase().includes(mot) ||
        item.categorie.toLowerCase().includes(mot) ||
        item.description.toLowerCase().includes(mot)
    );
    
 if (resultat.length == 0) {

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