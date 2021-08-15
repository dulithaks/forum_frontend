<template>

    <div class="main-content container bg-light min-vh-100 px-0">
        <nav v-if="!['login', 'register', 'notfound'].includes($route.name)" class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <router-link to="/" class="navbar-brand" href="#">Forum</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link to="/login" class="nav-item nav-link">Login</router-link>
                        </li>
                    </ul>
                </div>
                <ul class="nav navbar-nav navbar-right">
                    <li style="align-content:center">
                        <a v-on:click="logout" type="submit" class="text-white text-decoration-none" >Logout</a>
                    </li>
                </ul>
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
        }
    },
    methods: {
        async logout () {
            AuthService.logout(this.$router);
        }
    }
}
</script>
