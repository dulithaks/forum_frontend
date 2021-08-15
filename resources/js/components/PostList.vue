<template>
    <div class="post-list">
        <div class="d-flex justify-content-between text-start pt-4 pb-2 px-2">
            <h2>Posts</h2>
            <div>
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>

        <div class="container pb-5">
            <div class="d-flex justify-content-center row">
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
                    body: JSON.stringify(this.form),
                };

                let response = await fetch('http://127.0.0.1:8000/api/posts', requestOptions);
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
