import { eventBus } from '../services/event-bus-service.js'



export default {
    template: `
    <section class="user-msg" v-if="msg">
        <p>{{msg}}</p>
        <button @click="closeMsg">X</button>
    </section>
    `,
    data() {
        return {
            msg: null
        }
    },
    methods: {
        closeMsg() {
            this.msg = null;
        }
    },
    created() {
        eventBus.$on('reviewAdded', (msg) => {
                this.msg = msg
                setTimeout(() => {
                    this.msg = null
                }, 2000);

            }),
            eventBus.$on('reviewDeleted', (msg) => {
                this.msg = msg
                setTimeout(() => {
                    this.msg = null

                }, 2000);

            })
    },
}