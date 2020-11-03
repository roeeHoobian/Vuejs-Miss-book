import { bookService } from '../services/bookService.js';

export default {
    template: `
    <div class="add-book-container">
    <h1>Search books in google</h1>
    <label for="search">Search</label>
    <input type="text" name="search" @input="searcBook" v-model="txt" />
    <ul>
        <li v-if="booksRess" v-for="book in booksRess" :key="book.id">
            <p>{{book.volumeInfo.title.substr(0, 70)}}</p>
            <button @click="addGoogleBook(book)">+</button>
        </li>
    </ul>
    </div>
    `,
    data() {
        return {
            books: null,
            txt: null,
            booksRess: null,
        }
    },
    methods: {
        searcBook() {
            this.booksRess = this.books.filter(book => book.volumeInfo.title.toLowerCase().substr(0, 100).includes(this.txt));
        },
        addGoogleBook(book) {
            bookService.addGoogleBook(book);
        }
    },
    created() {
        bookService.getGoogleBooks()
            .then(books => {
                this.books = books
                bookService.saveToStorage('googleBooksDB', this.books)
            })
    }
}