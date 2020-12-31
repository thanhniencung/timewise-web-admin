import {
    createWebHistory,
    createRouter
}
from "vue-router";

import Main from "../components/Main.vue";
import SignIn from "../components/account/SignIn.vue";
import AddCate from "../components/category/AddCate.vue";
import CateList from "../components/category/CateList.vue";
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
    next('/admin/sign-in')
}

const routes = createRouter({
    history,
    routes: [{
            name: 'Main',
            path: '/:focusTargetComponent?',
            component: Main,
            beforeEnter: ifAuthenticated,
        },
        {
            name: 'SignIn',
            path: '/admin/sign-in',
            component: SignIn,
            beforeEnter: ifNotAuthenticated,
        },
        {
            name: 'AddCate',
            path: '/cate/add',
            component: AddCate,
            beforeEnter: ifAuthenticated,
        },
        {
            name: 'CateList',
            path: '/cate/list',
            component: CateList,
            beforeEnter: ifAuthenticated,
        },
        {
            name: 'NotFound',
            path: "/:catchAll(.*)",
            component: NotFound,
        },
    ],
});

export default routes;