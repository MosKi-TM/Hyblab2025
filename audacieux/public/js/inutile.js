class InteractiveBook {
    constructor(bookElement) {
        this.book = bookElement;
        this.content = this.book.querySelector('.content');
        this.bookCover = this.book.querySelector('.book-cover');
        this.pages = Array.from(this.content.querySelectorAll('.page'));
        this.currentPageIndex = 0;

        this.initializeEvents();
    }

    initializeEvents() {
        // Allow opening book from either cover or main body
        this.book.addEventListener('click', (e) => {
            // Prevent opening if clicking on navigation buttons
            if (e.target.closest('.navigation')) return;
            this.toggleBookState();
        });
    }

    toggleBookState() {
        this.book.classList.toggle('open');
        
        if (this.book.classList.contains('open')) {
            this.openBook();
        } else {
            this.closeBook();
        }
    }

    openBook() {
        // Hide book cover
        if (this.bookCover) {
            this.bookCover.style.display = 'none';
        }

        // Create book container
        const bookContainer = document.createElement('div');
        bookContainer.className = 'book-container';

        // Create current pages container
        const currentPagesContainer = document.createElement('div');
        currentPagesContainer.className = 'current-pages';

        // Clone and display only current two pages
        const currentPages = this.pages.slice(this.currentPageIndex, this.currentPageIndex + 2);
        currentPages.forEach(page => {
            const clonedPage = page.cloneNode(true);
            clonedPage.style.display = 'block';
            currentPagesContainer.appendChild(clonedPage);
        });

        bookContainer.appendChild(currentPagesContainer);

        // Add navigation buttons
        const navigation = document.createElement('div');
        navigation.className = 'navigation';
        navigation.innerHTML = `
            <button id="prev">Précédent</button>
            <button id="next">Suivant</button>
        `;

        this.book.appendChild(bookContainer);
        this.book.appendChild(navigation);

        // Add navigation event listeners
        this.book.querySelector('#prev').addEventListener('click', (e) => {
            e.stopPropagation();
            this.navigatePage(-2);
        });
        this.book.querySelector('#next').addEventListener('click', (e) => {
            e.stopPropagation();
            this.navigatePage(2);
        });
    }

    closeBook() {
        // Remove book container and navigation
        const bookContainer = this.book.querySelector('.book-container');
        const navigation = this.book.querySelector('.navigation');
        
        if (bookContainer) this.book.removeChild(bookContainer);
        if (navigation) this.book.removeChild(navigation);

        // Restore book cover
        if (this.bookCover) {
            this.bookCover.style.display = 'flex';
        }
    }

    navigatePage(step) {
        const newIndex = this.currentPageIndex + step;
        if (newIndex >= 0 && newIndex < this.pages.length - 1) {
            this.currentPageIndex = newIndex;
            this.updatePageView();
        }
    }

    updatePageView() {
        // Remove existing pages
        const bookContainer = this.book.querySelector('.book-container');
        const currentPagesContainer = bookContainer.querySelector('.current-pages');
        currentPagesContainer.innerHTML = '';

        // Add new pages
        const currentPages = this.pages.slice(this.currentPageIndex, this.currentPageIndex + 2);
        currentPages.forEach(page => {
            const clonedPage = page.cloneNode(true);
            clonedPage.style.display = 'block';
            currentPagesContainer.appendChild(clonedPage);
        });
    }
}

// Initialize books
document.addEventListener('DOMContentLoaded', () => {
    const books = document.querySelectorAll('.book');
    books.forEach(book => new InteractiveBook(book));
});

class InteractiveBook {
    // Ajoutez cette méthode dans votre classe
    async loadPagesFromJSON(jsonPath) {
        try {
            const response = await fetch(jsonPath);
            const pagesData = await response.json();
            
            pagesData.forEach(page => this.addPage(page));
        } catch (error) {
            console.error("Erreur lors du chargement des pages :", error);
        }
    }

    addPage(pageData) {
        const newPage = document.createElement('div');
        newPage.className = `page ${this.pages.length % 2 === 0 ? 'left-page' : 'right-page'}`;
        
        newPage.innerHTML = `
            <h2>${pageData.title}</h2>
            <p>${pageData.content}</p>
            ${pageData.media.type === 'image' ? 
                `<img src="${pageData.media.src}" alt="${pageData.media.alt}">` : 
                `<video controls>
                    <source src="${pageData.media.src}" type="video/mp4">
                    Votre navigateur ne supporte pas les vidéos.
                </video>`
            }
        `;

        this.content.appendChild(newPage);
        this.pages.push(newPage);
    }
}





// //Pour gérer l'insertion dynamique du contenu du livre.

// class DynamicBookContent {
//     constructor(bookElement, jsonPath) {
//         this.book = bookElement;
//         this.contentContainer = this.book.querySelector('.content');
//         this.jsonPath = jsonPath;
//         this.bookContent = null;
//         this.currentStep = 0;
//     }

//     async initializeContent() {
//         try {
//             const response = await fetch(this.jsonPath);
//             this.bookContent = await response.json();
//             this.updateBookContent();
//         } catch (error) {
//             console.error('Erreur de chargement du contenu:', error);
//         }
//     }

//     updateBookContent() {
//         // Récupérer l'étape actuelle depuis sceneManager
//         this.currentStep = sceneManager.time;

//         // Filtrer les pages qui correspondent à l'étape actuelle ou antérieure
//         const availablePages = this.bookContent.pages
//             .filter(page => page.step <= this.currentStep)
//             .sort((a, b) => a.step - b.step);

//         // Vider le contenu actuel
//         this.contentContainer.innerHTML = '';

//         // Ajouter les pages filtrées
//         availablePages.forEach((pageData, index) => {
//             const pageElement = document.createElement('div');
//             pageElement.className = `page ${index % 2 === 0 ? 'left-page' : 'right-page'}`;
//             pageElement.innerHTML = `
//                 <h2>${pageData.title}</h2>
//                 <p>${pageData.content}</p>
//                 ${pageData.image ? `<img src="${pageData.image}" alt="Illustration">` : ''}
//             `;
//             this.contentContainer.appendChild(pageElement);
//         });

//         // Mettre à jour le localStorage
//         localStorage.setItem('bookProgress', JSON.stringify({
//             currentStep: this.currentStep,
//             pagesUnlocked: availablePages.length
//         }));
//     }

//     // Méthode pour restaurer la progression
//     restoreProgress() {
//         const savedProgress = JSON.parse(localStorage.getItem('bookProgress'));
//         if (savedProgress) {
//             this.currentStep = savedProgress.currentStep;
//             // Vous pouvez ajouter une logique supplémentaire si nécessaire
//         }
//     }
// }

// // Initialisation
// document.addEventListener('DOMContentLoaded', () => {
//     const book = document.getElementById('book1');
//     const dynamicBook = new DynamicBookContent(book, '/path/to/book-content.json');
    
//     // Lier la mise à jour du livre à la progression de la scène
//     sceneManager.addEventListener('timeupdate', () => {
//         dynamicBook.updateBookContent();
//     });

//     // Initialiser le contenu
//     dynamicBook.initializeContent();
// });