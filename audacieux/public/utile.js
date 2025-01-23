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
 * Crée un popup personnalisé.
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
    // Définir les valeurs par défaut si elles ne sont pas fournies
    const {
        title = "Popup Title",
        message = "This is a message",
        buttonText = "Close",
        width = "300px",
        height = "200px",
        customStyles = {}, // Par défaut, aucun style personnalisé
        onClose = () => {}
    } = options;

    // Créer les éléments du popup
    const popupOverlay = document.createElement("div");
    const popupContainer = document.createElement("div");
    const popupTitle = document.createElement("h2");
    const popupMessage = document.createElement("p");
    const closeButton = document.createElement("button");

    // Ajouter les classes pour le style
    popupOverlay.className = "popup-overlay";
    popupContainer.className = "popup-container";
    closeButton.className = "popup-close-button";

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
        zIndex: 1000
    });

    Object.assign(popupContainer.style, {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        width: width,
        height: height,
        textAlign: "center",
        position: "relative",
        ...customStyles.container // Appliquer les styles personnalisés ici
    });

    Object.assign(closeButton.style, {
        marginTop: "10%",
        padding: "10px 20px",
        border: "none",
        backgroundColor: "#007BFF",
        color: "#fff",
        borderRadius: "4px",
        cursor: "pointer",
        ...customStyles.closeButton
    });

    // Ajouter les événements
    closeButton.addEventListener("click", () => {
        document.body.removeChild(popupOverlay);
        onClose(); // Appeler la fonction onClose si définie
    });

    // Assembler les éléments
    popupContainer.appendChild(popupTitle);
    popupContainer.appendChild(popupMessage);
    popupContainer.appendChild(closeButton);
    popupOverlay.appendChild(popupContainer);

    // Ajouter le popup au DOM
    document.body.appendChild(popupOverlay);
}


document.getElementById("popup").addEventListener("click", () => {
    createPopup({
        title: "Bienvenue",
        message: "Ceci est un popup classique.",
        buttonText: "Fermer",
        width: "20%",
        height: "20%",
        customStyles: {
            container: {
                backgroundColor: "#f9f9f9",
                border: "2px solid #ccc"
            },
            closeButton: {
                backgroundColor: "red",
                color: "white",
                borderRadius: "10px",
                padding: "12px 24px",
            }
        }
    });
    
});


document.addEventListener("DOMContentLoaded", () => {
    colorizeAllImages(".interactive-image");
});
