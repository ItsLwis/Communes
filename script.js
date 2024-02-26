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
    var tableauContainer = document.getElementById('tableau-container');

    if (selectedCommune) {
        var reglementsBtnClass = selectedCommune.lienReglements.toLowerCase() === 'aucun' ? 'red-btn' : 'green-btn';
        var portailBtnClass = selectedCommune.lienPortail.toLowerCase() === 'aucun' ? 'red-btn' : 'green-btn';

        resultatReglements.innerHTML = createButtonHtml('Reglements', selectedCommune.lienReglements, reglementsBtnClass);
        resultatPortail.innerHTML = createButtonHtml('Guichet', selectedCommune.lienPortail, portailBtnClass);
        resultatRemarques.innerHTML = selectedCommune.remarques;

        showElement(resultatReglements);
        showElement(resultatPortail);
        showElement(resultatRemarques);

        // Efface le tableau si une commune est trouvée
        tableauContainer.innerHTML = '';
    } else {
        hideElement(resultatReglements);
        hideElement(resultatPortail);
        hideElement(resultatRemarques);
    }
}

function ouvrirLien(url) {
    window.open(url, '_blank');
}

function afficherTableau() {
    var tableauContainer = document.getElementById('tableau-container');
    var tableauHTML = '<h2>Liste des Communes</h2>';

    tableauHTML += '<table id="editable-table" border="1">';
    tableauHTML += '<thead><tr><th>Nom</th><th>Lien Règlements</th><th>Lien Portail</th><th>Remarques</th></tr></thead>';
    tableauHTML += '<tbody>';

    communes.forEach(function (commune) {
        tableauHTML += `<tr>
            <td contenteditable="true" data-field="nom">${commune.nom}</td>
            <td contenteditable="true" data-field="lienReglements">${commune.lienReglements}</td>
            <td contenteditable="true" data-field="lienPortail">${commune.lienPortail}</td>
            <td contenteditable="true" data-field="remarques">${commune.remarques}</td>
        </tr>`;
    });

    tableauHTML += '</tbody></table>';
    tableauContainer.innerHTML = tableauHTML;

    // Ajouter des événements pour permettre la modification
    var editableCells = document.querySelectorAll('#editable-table tbody td[contenteditable="true"]');
    editableCells.forEach(function (cell) {
        cell.addEventListener('input', function () {
            // Mettre à jour les données dans le tableau
            var row = cell.parentNode;
            row.setAttribute('data-' + cell.dataset.field, cell.innerText);
        });
    });
}

function afficherListe() {
    afficherTableau();
    hideElement(document.getElementById('menu-container')); // Ferme le menu lors de l'affichage de la liste
}

function toggleMenu() {
    var menuContainer = document.getElementById('menu-container');
    menuContainer.classList.toggle('show');
}

function fermerMenu() {
    var menuContainer = document.getElementById('menu-container');
    menuContainer.classList.remove('show');
}

function createButtonHtml(label, link, btnClass) {
    return `<button onclick="ouvrirLien('${link}')" class="icon-btn ${btnClass}">
        <i class="gg-file-document"></i> ${label}
    </button>`;
}

function showElement(element) {
    if (element) {
        element.style.display = 'block';
    }
}

function hideElement(element) {
    if (element) {
        element.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Ajoutez cet événement pour le bouton du menu
    var menuButton = document.getElementById('menuButton');
    if (menuButton) {
        menuButton.addEventListener('click', toggleMenu);
    }

    // Ajoutez cet événement pour le bouton de recherche
    var searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', rechercherCommune);
    }

    // Ajoutez cet événement pour chaque élément du menu
    var menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(function (menuItem) {
        menuItem.addEventListener('click', function () {
            fermerMenu(); // Utilisez la fonction fermerMenu pour fermer le menu
            // Vous pouvez également ajouter ici d'autres actions liées à la sélection d'un élément du menu
        });
    });

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
});
