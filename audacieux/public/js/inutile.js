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
