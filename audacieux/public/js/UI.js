
document.getElementById("inventaire").addEventListener("click", () => {
    const player = new Player(2000, [
        new Item("Éponges", 500),
        new Item("Gants en latex", 300),
        new Item("Boite de Pringles", 200)
    ]);

    const popupMessage = createPopup({
        title: "Liste de course",
        message: player.generateShoppingListHTML(),
        buttonText: "Fermer",
        width: "300px", // Augmente la taille de l'image
        height: "auto", // Augmente la taille de l'image
        backgroundImage : "img/postit.webp",
        
        customStyles: {
            container :{
                position: "relative",
                width: "300px", // Taille ajustable
                height: "auto", // Taille ajustable
                textAlign: "center",
                backgroundImage: "url('img/postit.webp')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
                boxSizing: "border-box",
                borderRadius: "8px",
                color: "black",
                transform: "scale(2)"
            },
            triangle: {
                visibility: "hidden",
            },
            closeButton: {
                visibility: "hidden",
            },

        },

    });

    
});