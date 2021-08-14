import Posts from "./components/Posts";
import Login from "./components/Login";

export const routes = [
    {
        path: '/',
        component: Posts
    },
    {
        path: '/login',
        component: Login
    },
];
