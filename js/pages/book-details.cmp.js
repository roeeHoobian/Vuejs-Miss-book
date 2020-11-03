import { bookService } from '../services/bookService.js';
import longText from '../cmps/long-text.cmp.js';
import reviewAdd from '../cmps/review-add.cmp.js';

export default {
    // props: ['book'],
    name: 'bookReview-cmp',
    data() {
        return {
            bookId: null,
            book: null,
            priceColor: '',
            isOnSale: false,
            isShowReviews: false,
        }
    },
    template: `
    <div v-if="book" class="book-details-container">
    <div class="book-details">
        <img :src="book.thumbnail" class="book-img">
        <div class="book-info">
           <h1>Name:  {{book.title}}</h1>
        <h2>Authors:  {{getAuthor}}</h2>
        <p>Categories: {{getCategories}}</p>
        <long-text :txt="book.description" />
        <p>language: {{book.language}}</p>
        <h2 :class="priceColor">Price: {{getPrice}}</h2><img src="./img/on-sale-icon.png" class="on-sale-img" v-if="isOnSale">
        <p> Level: {{getReadingLevel}}</p>
        <p>publish date: {{getPublishDate}}</p>
    </div>
    <button @click="showReviewSection" class="review-btn">Reviews ⭐</button>
    <button @click="backToApp" class="back-btn">Back → </button>
    </div>
    <review-add v-if="isShowReviews" :bookId="bookId"></review-add>

    </div>
    `,
    methods: {
        backToApp() {
            this.$router.push('/book')
        },
        showReviewSection() {
            this.isShowReviews = !this.isShowReviews
        }
    },
    computed: {
        getAuthor() {
            if (!this.book.authors) return null
            return this.book.authors.join('');

        },
        getCategories() {
            if (!this.book.categories) return null
            return this.book.categories.join('');
        },
        getPrice() {
            if (this.book.listPrice.amount < 20) this.priceColor = 'green';
            if (this.book.listPrice.amount > 150) this.priceColor = 'red';

            if (this.book.listPrice.isOnSale) this.isOnSale = true;
            else this.isOnSale = false;

            var currencyIcon = '';
            switch (this.book.listPrice.currencyCode) {
                case 'EUR':
                    currencyIcon = '€';
                    break;
                case 'USD':
                    currencyIcon = '$';
                    break;
                case 'ILS':
                    currencyIcon = '₪';
                    break;
            }
            return `${this.book.listPrice.amount}${currencyIcon}`;
        },
        getReadingLevel() {
            var pageCount = this.book.pageCount;
            if (pageCount < 100) return 'Light Reading';
            if (pageCount > 100 && pageCount < 200) return 'Decent Reading';
            if (pageCount > 200) return 'Long reading';
        },
        getPublishDate() {
            if ((new Date().getFullYear() - this.book.publishedDate) > 10) return 'Veteran Book';
            else return 'New';
        },

        getReviewsCount() {
            var reviews = bookService.getBookById(this.bookId)
        }

    },
    created() {
        const id = this.$route.params.bookId;
        this.bookId = id;

        bookService.getBookById(id)
            .then(book => this.book = book)
            .then(bookService.getReviews(this.book))
    },
    components: {
        longText,
        reviewAdd
    }
}