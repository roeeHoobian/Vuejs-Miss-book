import bookPreview from '../cmps/book-preview.cmp.js';

export default {
    props: ['books'],
    template: `
    <section class="books-cards-container">
    <ul class="books-list">
        <li v-for="currBook in books"> 
            <book-preview :book="currBook" @click.native="bookClicked()"></book-preview>
            <!-- <button @click="emitSelect(currBook.id)">More Details </button> -->
        </li>
    </ul>
    </section>
    `,
    methods: {
        bookClicked() {
            console.log('book clicked');
            // this.$router.push('/')

        },
        emitSelect(bookId) {
            this.$emit('selected', bookId)
        },
    },
    components: {
        bookPreview
    }

}