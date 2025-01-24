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

/*
 * Crée un popup personnalisé avec une pointe triangulaire.
 * @param {Object} options - Options pour personnaliser le popup.
 * @param {string} options.title - Le titre du popup.
 * @param {string} options.message - Le message du popup.
 * @param {string} options.buttonText - Le texte du bouton de fermeture.
 * @param {string} options.width - Largeur du popup (par exemple, "300px").
 * @param {string} options.height - Hauteur du popup (par exemple, "200px").
 * @param {Object} options.customStyles - Styles CSS supplémentaires pour personnaliser le popup.
 * @param {function} options.onClose - Fonction appelée lorsque le popup est fermé.
 */
function createPopup(options) {
    const {
        title = "Popup Title",
        message = "This is a message",
        buttonText = "Close",
        width = "300px",
        height = "200px",
        customStyles = {},
        onClose = () => {},
    } = options;

    // Créer les éléments du popup
    const popupOverlay = document.createElement("div");
    const popupContainer = document.createElement("div");
    const popupTitle = document.createElement("h2");
    const popupMessage = document.createElement("p");
    const closeButton = document.createElement("button");
    const popupTriangle = document.createElement("div"); // Pointe triangulaire

    // Ajouter les classes pour le style
    popupOverlay.className = "popup-overlay";
    popupContainer.className = "popup-container";
    closeButton.className = "popup-close-button";
    popupTriangle.className = "popup-triangle";

    // Ajouter le contenu
    popupTitle.textContent = title;
    popupMessage.textContent = message;
    closeButton.textContent = buttonText;

    // Appliquer les styles de base
    Object.assign(popupOverlay.style, {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        ...customStyles.Overlay,
    });

    Object.assign(popupContainer.style, {
        backgroundColor: "#007BFF",
        color: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        width: width,
        height: height,
        textAlign: "center",
        position: "relative",
        ...customStyles.container,
    });

    Object.assign(popupTriangle.style, {
        content: "''",
        position: "absolute",
        bottom: "-20px", // Position sous la bulle
        left: "30px", // Ajustez pour centrer ou déplacer la pointe
        width: "0",
        height: "0",
        borderWidth: "20px 20px 0 20px", // Taille de la pointe
        borderStyle: "solid",
        borderColor: "#ffffff transparent transparent transparent",
        ...customStyles.triangle,
    });

    Object.assign(closeButton.style, {
        marginTop: "20px",
        padding: "10px 20px",
        border: "none",
        backgroundColor: "red",
        color: "white",
        borderRadius: "4px",
        cursor: "pointer",
        ...customStyles.closeButton,
    });

    // Ajouter les événements
    closeButton.addEventListener("click", () => {
        document.body.removeChild(popupOverlay);
        onClose();
    });
    popupOverlay.addEventListener("click", (e) => {
        // Si on clique à l'extérieur du popupContainer (c'est-à-dire sur l'overlay)
        if (e.target === popupOverlay) {
            document.body.removeChild(popupOverlay);
            onClose(); // Appeler la fonction onClose si définie
        }
    });

    // Assembler les éléments
    popupContainer.appendChild(popupTitle);
    popupContainer.appendChild(popupMessage);
    popupContainer.appendChild(closeButton);
    popupContainer.appendChild(popupTriangle); // Ajouter la pointe
    popupOverlay.appendChild(popupContainer);

    // Ajouter le popup au DOM
    document.body.appendChild(popupOverlay);
}

// Exemple d'utilisation
document.getElementById("popup").addEventListener("click", () => {
    createPopup({
        title: "Bienvenue",
        message: "Ceci est une jolie bulle de texte créée en CSS !",
        buttonText: "Fermer",
        width: "300px",
        height: "auto",
        customStyles: {
            container: {
                backgroundColor: "#ffffff",
                borderRadius: "30px",
                color: "black",
                transform: "scale(2)",  /* Augmente la taille de 1.5x, ajustez cette valeur selon vos besoins */
                transformOrigin: "center center",
                
            },
            triangle: {
                left: "10%", // Pointe centrée horizontalement
                //transform: "translateX(-50%)", // Ajustement du centrage
            },

            closeButtonWrapper: {
                /* Appliquez un wrapper autour du bouton pour éviter qu'il soit transformé */
                position: "relative",  // Assurez-vous que le wrapper soit positionné correctement
                zIndex: "100"
            },

            closeButton: {
                visibility: "hidden",
            },
        },
    });
});



document.addEventListener("DOMContentLoaded", () => {
    colorizeAllImages(".interactive-image");
});
