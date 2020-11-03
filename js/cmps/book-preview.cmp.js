export default {
    props: ['book'],
    data() {
        return {}
    },

    template: `
    <div>
    <img :src="getImgUrl" >
    <h3>{{book.title[0].toUpperCase()}}{{book.title.slice(1)}}</h3>
    <p>Price: {{book.listPrice.amount}}{{setCurrencyIcon}}</p>
    <router-link :to="'/book/'+book.id">Details</router-link>

    </div>
    `,
    computed: {
        setCurrencyIcon() {
            if (this.book.listPrice.currencyCode === 'EUR') return '€';
            if (this.book.listPrice.currencyCode === 'USD') return '$';
            if (this.book.listPrice.currencyCode === 'ILS') return '₪';
        },
        getImgUrl() {
            return this.book.thumbnail
        }

    },
}