document.addEventListener('DOMContentLoaded', () => {
    // Sélectionne tous les livres sur la page
    const books = document.querySelectorAll('.book');
    let currentOpenBook = null;

    books.forEach(book => {
        const content = book.querySelector('.content');
        const pages = Array.from(content.querySelectorAll('.page'));
        let currentPageIndex = 0;

        const prevButton = book.querySelector('#prev');
        const nextButton = book.querySelector('#next');

        // Ouvrir un livre au clic
        book.addEventListener('click', () => {

            // Basculer l'état du livre actuel
            if (book.classList.contains('open')) {
                closeBook(book);
            } else {
                openBook(book);
            }
        });

        // Bouton "Précédent"
        prevButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Empêche le clic sur le bouton de fermer le livre
            if (currentPageIndex > 0) {
                currentPageIndex -= 2;
                updatePages();
            }
        });

        // Bouton "Suivant"
        nextButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Empêche le clic sur le bouton de fermer le livre
            if (currentPageIndex < pages.length - 2) {
                currentPageIndex += 2;
                updatePages();
            }
        });

        // Mise à jour de l'affichage des pages
        const updatePages = () => {
            pages.forEach((page, index) => {
                if (index === currentPageIndex || index === currentPageIndex + 1) {
                    page.classList.remove('hidden');
                } else {
                    page.classList.add('hidden');
                }
            });
        };
        

        // Ouvrir un livre
        const openBook = (book) => {
            currentOpenBook = book;
            book.classList.add('open');
            book.style.transform = 'scale(3)';
            book.style.transition = 'transform 0.5s ease';
            content.style.display = 'block';
            updatePages(); // Afficher les premières pages
        };

        // Fermer un livre
        const closeBook = (book) => {
            book.classList.remove('open');
            book.style.transform = 'scale(1)';
            book.style.transition = 'transform 0.5s ease';
            content.style.display = 'none';
            currentOpenBook = null;
        };

        // Initialiser l'affichage des pages au début
        updatePages();
    });
});
