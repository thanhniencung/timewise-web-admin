import {
    createWebHistory,
    createRouter
}
from "vue-router";

import Main from "../components/Main.vue";
import SignIn from "../components/SignIn.vue";
import NotFound from "../components/NotFound.vue";

const history = createWebHistory();

const ifNotAuthenticated = (to, from, next) => {
    const token = localStorage.getItem("token");
    if (!token) {
        next()
        return
    }
    next('/')
}

const ifAuthenticated = (to, from, next) => {
    const token = localStorage.getItem("token");
    if (token) {
        next()
        return
    }
    next('/sign-in')
}

const routes = createRouter({
    history,
    routes: [{
            name: 'Main',
            path: '/',
            component: Main,
            beforeEnter: ifAuthenticated,
        },
        {
            name: 'SignIn',
            path: '/sign-in',
            component: SignIn,
            beforeEnter: ifNotAuthenticated,
        },
        {
            name: 'NotFound',
            path: "/:catchAll(.*)",
            component: NotFound,
        },
    ],
});

export default routes;