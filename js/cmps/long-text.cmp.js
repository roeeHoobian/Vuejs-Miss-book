export default {
    props: ['txt'],
    data() {
        return {
            currTxt: '',
            isShowMore: false,
            buttonTxt: 'Read More'
        }
    },
    template: `
    <div>
        <p>{{showTxt}}</p>
        <button @click="showMore">{{ buttonTxt }}</button>
    </div>
    `,
    computed: {
        showTxt() {
            if (!this.txt) return
            else if (this.txt.length > 100 && !this.isShowMore) {
                this.buttonTxt = 'Read More';
                return this.txt.slice(0, 99) + '...';
            } else {
                return this.txt;
            }
        },
    },
    methods: {
        showMore() {
            this.isShowMore = !this.isShowMore;
            this.buttonTxt = 'Read Less';
        }
    },
}