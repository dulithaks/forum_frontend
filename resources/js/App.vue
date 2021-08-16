<template>

    <div class="main-content container bg-light min-vh-100 px-0 shadow">
        <nav v-if="!['login', 'register', 'notfound'].includes($route.name)"
             class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <router-link to="/" class="navbar-brand font-monospace" href="#">Forum</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link to="/posts/create" class="nav-link nav-link-custom" href="#">Create
                            </router-link>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link nav-link-custom dropdown-toggle" href="#" id="navbarDropdown"
                               role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Posts
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <router-link to="/posts/create" class="dropdown-item" href="#">Create</router-link>
                                </li>
                                <li>
                                    <router-link to="/" class="dropdown-item" href="#">My Posts</router-link>
                                </li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li>
                                    <router-link to="/" class="dropdown-item" href="#">Waiting for approve</router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li style="align-content:center">

                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="" role="button" data-bs-toggle="dropdown"
                               aria-expanded="false">
                                {{ userFirstName }}
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <a v-on:click="logout"
                                       class="dropdown-item">Logout</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div class="mt-2 w-100 px-2">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import AuthService from './services/auth.service';

export default {
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
            errors: [],
            get userFirstName() {
                const user = JSON.parse(localStorage.getItem('user'));
                return user.first_name || 'User';
            },
        }
    },
    methods: {
        async logout() {
            AuthService.logout(this.$router);
        }
    }
}
</script>
