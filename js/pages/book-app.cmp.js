import { bookService } from '../services/bookService.js';
import bookList from '../cmps/book-list.cmp.js'
import bookFilter from '../cmps/book-filter.cmp.js'
import bookDetails from '../pages/book-details.cmp.js'




export default {
    data() {
        return {
            books: null,
            selectedBook: null,
            filterBy: null,
        }
    },
    template: `
    <div v-if="books">

        <book-filter @filtered="setFilter"></book-filter>
        <book-list v-if="!selectedBook" :books="booksToShow" @selected="selectBook"></book-list>
        <book-details v-else :book="selectedBook" @hide="hideBookDetails"></book-details> 
    </div>
    `,
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        selectBook(bookId) {
            bookService.getBookById(bookId)
                .then(book => this.selectedBook = book)
        },
        hideBookDetails() {
            this.selectedBook = null;
        },


    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            const txt = this.filterBy.byName.toLowerCase();
            var minPrice = this.filterBy.byPriceFrom;
            var maxPrice = this.filterBy.byPriceTo;
            return this.books.filter(book =>
                book.title.toLowerCase().includes(txt) &&
                book.listPrice.amount >= minPrice &&
                book.listPrice.amount <= maxPrice);
        }
    },
    created() {
        var booksFromStorage = bookService.loadFromStorage('booksDB')
        if (booksFromStorage) this.books = booksFromStorage;
        else {
            bookService.query()
                .then((books => this.books = books))
                .then(books => bookService.saveToStorage('booksDB', books))
        }
    },
    components: {
        bookList,
        bookFilter,
        bookDetails,
    }

}