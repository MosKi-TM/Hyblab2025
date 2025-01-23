// Attendre que la page soit chargée
document.addEventListener("DOMContentLoaded", function () {
    // Sélectionner la div qui contient l'image
    const hiddenDiv = document.querySelector(".hidden.mouse.over");

    // Ajouter les événements pour gérer le survol
    hiddenDiv.addEventListener("mouseover", function () {
        // Ajouter une ombre visible
        hiddenDiv.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.5)";
    });

    hiddenDiv.addEventListener("mouseout", function () {
        // Retirer l'ombre
        hiddenDiv.style.boxShadow = "none";
    });
});
