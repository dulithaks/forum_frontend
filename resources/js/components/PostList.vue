<template>
    <div class="post-list">
        <div class="container pb-5">
            <div class="d-flex justify-content-center row">
                <div class="col-md-8 my-2">
                    <h1>Posts</h1>
                    <div class="d-flex">
                        <input v-model="form.term" class="form-control me-2" type="search" placeholder="Search"
                               aria-label="Search">
                        <button v-on:click="getPosts(1)" class="btn btn-outline-dark" type="submit">Search</button>

                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-center row mt-2">
                <div class="col-md-8">
                    <div v-for="(post, index) in posts" :key="post.id">
                        <post :post="post"></post>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import AuthService from './../services/auth.service'
import RouteService from './../services/route.service'
import Comments from "./Comments";
import Post from "./Post";

export default {
    components: {
        Post,
        Comments
    },
    mounted() {
        console.log('Component mounted.')
    },
    data() {
        return {
            posts: [],
            form: {
                term: null,
            }
        }
    },
    created() {
        this.getPosts();
    },
    methods: {
        async getPosts(page) {
            if (typeof page === 'undefined') {
                page = 1;
            }

            try {
                const requestOptions = {
                    method: 'GET',
                    headers: AuthService.authHeader(),
                };

                console.log(RouteService.getPostsUrl(this.form))

                let response = await fetch(RouteService.getPostsUrl(this.form), requestOptions);
                const responseData = await response.json();

                if (response.status === 200) {
                    this.posts = responseData.data;
                }

                if (response.status === 401) {
                    AuthService.unauthorized(this.$router)
                }
            } catch (error) {
                console.log(error)
                toastr.error('Something went wrong. Please try again.', 'Oops!')
            }
        }
    }
}
</script>
