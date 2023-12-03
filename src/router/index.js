import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieView from "@/views/MovieView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // {
        //     path: '/:id',
        //     component: MovieView
        // },
        {
            name: 'movie',
            path: '/movie/:id',
            component: MovieView,
        },
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
    ]
})

export default router
