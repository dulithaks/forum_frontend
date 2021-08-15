import Login from "./components/Login";
import NotFound from "./components/NotFound";
import AuthService from "./services/auth.service";
import PostList from "./components/PostList";

export const routes = [
    {
        name: 'notfound',
        path: '*',
        component: NotFound
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
        name: 'login',
        path: '/login',
        component: Login
    },
];
