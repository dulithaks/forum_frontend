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
    props: ['filter'],
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
            page = typeof page === 'undefined' ? 1 : page;

            try {
                let resourceUrl = RouteService.getPostsUrl(this.form);
                
                if(this.filter && this.filter == 'my-posts') {
                    resourceUrl = RouteService.getMyPostsUrl(this.form, AuthService.user());
                }

                const requestOptions = {
                    method: 'GET',
                    headers: AuthService.authHeader(),
                };

                console.log(resourceUrl);

                let response = await fetch(resourceUrl, requestOptions);
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
