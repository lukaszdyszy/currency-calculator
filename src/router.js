import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home.vue';
import Gold from './views/Gold.vue';
import Graphs from './views/Graphs.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/gold',
        component: Gold
    },
    {
        path: '/graphs',
        component: Graphs
    }
];

const router = new VueRouter({routes});

export default router;
