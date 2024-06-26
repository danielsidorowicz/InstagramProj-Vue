import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DefaultView from '../views/DefaultView.vue'
import AboutView from '../views/AboutView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import AddPhoto from '../views/AddPhoto.vue'
import Profile from '../views/ProfileView.vue'
import EditProfile from '../views/EditProfileView.vue'
import ViewPostView from '../views/ViewPostView.vue'

const NotFoundView = () => import("@/views/NotFoundView.vue")

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/default',
      name: 'default',
      component: DefaultView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView,
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/addPhoto',
      name: 'AddPhoto',
      component: AddPhoto,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
    },
    {
      path: '/editProfile',
      name: 'EditProfile',
      component: EditProfile,
    },
    {
      path: '/viewPost',
      name: 'ViewPost',
      component: ViewPostView,
    },
  ]
})

export default router
