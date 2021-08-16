import Login from "./components/Login";
import NotFound from "./components/NotFound";
import AuthService from "./services/auth.service";
import PostList from "./components/PostList";
import PostCreate from "./components/PostCreate";
import Register from "./components/Register";
import MyPostList from "./components/MyPostList";

export const routes = [
    {
        name: 'notfound',
        path: '*',
        component: NotFound
    },
    {
        name: 'login',
        path: '/login',
        component: Login
    },
    {
        name: 'register',
        path: '/register',
        component: Register
    },
    {
        name: 'home',
        path: '/',
        component: PostList,
        beforeEnter: (to, form, next) =>{
            if(AuthService.isAuthUser()) {
                next();
            }
            else {
                return next({ name: 'login'});
            }
        }
    },
    {
        name: 'postCreate',
        path: '/posts/create',
        component: PostCreate,
        beforeEnter: (to, form, next) =>{
            if(AuthService.isAuthUser()) {
                next();
            }
            else {
                return next({ name: 'login'});
            }
        }
    },
    {
        name: 'myPosts',
        path: '/my-posts',
        component: MyPostList,
        beforeEnter: (to, form, next) =>{
            if(AuthService.isAuthUser()) {
                next();
            }
            else {
                return next({ name: 'login'});
            }
        }
    },
];
