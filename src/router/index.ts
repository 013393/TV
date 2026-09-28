import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Trending from '../components/Trending.vue'
import TVShow from '../components/TVShow.vue'
import Search from '../components/Search.vue'
import MovieDetail from '../components/MovieDetail.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/movies',
      component: Trending,
    },
    {
      path: '/tv',
      component: TVShow,
    },
    {
      path: '/trending',
      component: Trending,
    },
    {
      path: '/search',
      component: Search,
    },
    {
      path: '/movie/:id',
      component: MovieDetail,
    },
  ],
})

export default router
