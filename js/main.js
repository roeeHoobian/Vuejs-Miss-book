import { router } from './routes.js';
import { eventBus } from './services/event-bus-service.js';
import userMsg from './cmps/user-msg.cmp.js';


new Vue({
    el: '#app',
    router,
    template: `
    <section>
        
    <header class="main-header"> 
        <nav>
            <router-link to="/">Home</router-link>
            <router-link to="/book">Book App</router-link>
            <router-link to="/about">About</router-link>
        </nav>
    </header>

        <router-view></router-view>
    <user-msg></user-msg>
    </section>
    `,
    components: {
        userMsg,
    },
    created() {
        eventBus.$on('reviewAdded', () => {


        })
    },


})