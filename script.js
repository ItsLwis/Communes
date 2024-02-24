var communes;

function miseAJourListe(value) {
    var datalistCommunes = document.getElementById("communesList");
    datalistCommunes.innerHTML = "";

    if (value.trim() !== "") {
        var suggestions = communes.filter(function (commune) {
            return commune.nom.toLowerCase().startsWith(value.toLowerCase());
        });

        suggestions.forEach(function (commune) {
            var option = document.createElement("option");
            option.value = commune.nom;
            datalistCommunes.appendChild(option);
        });

        datalistCommunes.style.display = 'block';
    } else {
        datalistCommunes.style.display = 'none';
    }
}

function rechercherCommune() {
    var communeName = document.getElementById("commune").value.trim().toLowerCase();
    var selectedCommune = communes.find(function (commune) {
        return commune.nom.toLowerCase() === communeName;
    });

    var resultatReglements = document.getElementById('lienReglements');
    var resultatPortail = document.getElementById('lienPortail');
    var resultatRemarques = document.getElementById('remarques');

    if (selectedCommune) {
        // Condition pour la classe CSS verte ou rouge
        var reglementsBtnClass = selectedCommune.lienReglements.toLowerCase() === 'aucun' ? 'red-btn' : 'green-btn';
        var portailBtnClass = selectedCommune.lienPortail.toLowerCase() === 'aucun' ? 'red-btn' : 'green-btn';

        // Affiche les logos dans les résultats avec les classes CSS conditionnelles
        resultatReglements.innerHTML = '<button onclick="ouvrirLien(\'' + selectedCommune.lienReglements + '\')" class="icon-btn ' + reglementsBtnClass + '"><i class="gg-file-document"></i> Reglements</button>';
        resultatPortail.innerHTML = '<button onclick="ouvrirLien(\'' + selectedCommune.lienPortail + '\')" class="icon-btn ' + portailBtnClass + '"><i class="gg-browser"></i> Guichet</button>';
        resultatRemarques.innerHTML = selectedCommune.remarques;

        // Affiche les résultats dans la console pour déboguer
        console.log('Commune trouvée:', selectedCommune);

        // Affiche les résultats
        resultatReglements.style.display = 'block';
        resultatPortail.style.display = 'block';
        resultatRemarques.style.display = 'block';
    } else {
        // Efface les résultats si la commune n'est pas trouvée
        resultatReglements.innerHTML = '';
        resultatPortail.innerHTML = '';
        resultatRemarques.innerHTML = '';

        resultatReglements.style.display = 'none';
        resultatPortail.style.display = 'none';
        resultatRemarques.style.display = 'none';

        // Affiche un message dans la console pour déboguer
        console.log('Aucune commune trouvée pour:', communeName);
    }
}

function ouvrirLien(url) {
    window.open(url, '_blank');
}

function afficherListe() {
    var listeContainer = document.getElementById('listeContainer');
    var listeHTML = '<h2>Liste des Communes</h2><table border="1"><tr><th>Nom</th><th>Lien Règlements</th><th>Lien Portail</th><th>Remarques</th></tr>';

    communes.forEach(function (commune) {
        listeHTML += '<tr><td>' + commune.nom + '</td><td>' + commune.lienReglements + '</td><td>' + commune.lienPortail + '</td><td>' + commune.remarques + '</td></tr>';
    });

    listeHTML += '</table>';
    listeContainer.innerHTML = listeHTML;
    listeContainer.style.display = 'block';
}

fetch('communes.json')
    .then(response => response.json())
    .then(data => {
        communes = data;
        var datalistCommunes = document.getElementById("communesList");
        communes.forEach(function (commune) {
            var option = document.createElement("option");
            option.value = commune.nom;
            datalistCommunes.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Erreur lors du chargement des communes:', error);
    });