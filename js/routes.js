import bookApp from '../js/pages/book-app.cmp.js';
import homePage from '../js/pages/home-page.cmp.js';
import about from '../js/pages/about.cmp.js';
import bookDetails from '../js/pages/book-details.cmp.js';

const routes = [{
        path: '/book',
        component: bookApp
    },
    {
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: about
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    }
]

export const router = new VueRouter({ routes })