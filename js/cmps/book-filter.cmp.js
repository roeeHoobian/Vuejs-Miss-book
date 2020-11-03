export default {
    data() {
        return {
            filterBy: {
                byName: '',
                byPriceFrom: 0,
                byPriceTo: 1000,
            }
        }
    },
    template: `<section >
        <form @submit.prevent="emitFilter" class="book-filter">

        <div>
        <label for="">Name</label>
         <input type="text" v-model="filterBy.byName" placeholder="Filter By Name"  />
         </div>

        <div>
            <label for="">Min Price</label>
        <input type="number" v-model.number="filterBy.byPriceFrom" placeholder="Min Price" />
         </div>

        <div>
        <label for="">Max Price</label>
        <input type="number" v-model.number="filterBy.byPriceTo" placeholder="Max Price" />
        <button>Search</button>
         </div>
         
        </form>
    </section>`,
    methods: {
        emitFilter() {
            this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)));
        }
    },
}