import { bookService } from '../services/bookService.js';
import { eventBus } from '../services/event-bus-service.js';



export default {
    name: 'addReview-cmp',
    props: ['bookId'],
    data() {
        return {
            review: {
                fullName: null,
                rate: null,
                readAt: '2020-11-03',
                textArea: null
            },
            bookReviews: [],
        }
    },
    template: `
    <div class="review-container">
        <form @submit.prevent="saveReview">
            <h2>Add Review</h2>
        <div>
            <label for="full-name" >Full Name:</label>
            <input type="text" v-model="review.fullName" placeholder="Books Reader">
        </div>
        <div>
            <label for="rate">Rate:</label>
            <select name="rate" v-model="review.rate">
                <option  value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
        <div>
            <label for="read-at">Read At:</label>
            <input type="date" v-model="review.readAt">
        </div>
        <div>
            <p>Free Write</p>
            <input type="texterea" class="text-area" v-model="review.textArea">
        </div>
        <button>Add Review</button>
    </form>
    <ul v-if="bookReviews">
        <h3>Reviews:</h3>
        <li v-for="review in bookReviews" :key="review.id">
            <span><strong>Name: </strong>{{review.fullName}}</span>
            <span><strong>Rate: </strong>{{review.rate}}</span>
            <span><strong>ReadAt: </strong>{{review.readAt}}</span>
            <span><strong>More: </strong>{{review.textArea}}</span>
            <button @click="removeReview(bookReviews,review.id)">X</button>
        </li>
    </ul>
    </div>
    `,
    methods: {
        saveReview() {
            bookService.addReview(this.bookId, this.review)
                .then(reviews => {
                    this.bookReviews = reviews
                    eventBus.$emit('reviewAdded', 'Review succesfuly added!')
                })
        },
        removeReview(bookReviews, reviewId) {

            bookService.removeReview(bookReviews, reviewId)
                .then(reviewIdx => {
                    this.bookReviews.splice(reviewIdx, 1)
                    eventBus.$emit('reviewDeleted', 'Review succesfuly Deleted!')
                })

        }
    },
    created() {
        bookService.getReviews(this.bookId)
            .then(reviews => this.bookReviews = reviews)
    },
}