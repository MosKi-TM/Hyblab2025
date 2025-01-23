function colorizeAllImages(selector) {
    const images = document.querySelectorAll(selector);

    if (images.length === 0) {
        console.error("Aucune image correspondante trouvée pour le sélecteur :", selector);
        return;
    }

    images.forEach(image => {
        colorizeImage(image);
    });
}

function colorizeImage(imageElement) {
    if (!imageElement) {
        console.error("Aucun élément d'image fourni.");
        return;
    }

    let isClicked = false;

    imageElement.addEventListener("click", () => {
        imageElement.style.filter = "none";
        isClicked = true;
    });

    imageElement.addEventListener("mouseover", () => {
        if (!isClicked) {
            imageElement.style.filter = "none";
        }
    });

    imageElement.addEventListener("mouseout", () => {
        if (!isClicked) {
            imageElement.style.filter = "grayscale(100%)";
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    colorizeAllImages(".interactive-image");
});
