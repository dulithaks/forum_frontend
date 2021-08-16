<template>
    <div class="post-list">
        <div class="container pb-5">
            <div class="d-flex justify-content-center row">
                <div class="col-md-8 my-2">
                    <h1 class="mb-4">{{ pageTitle || 'Posts' }}</h1>

                    <div class="d-flex">
                        <input v-model="form.term" class="form-control me-2" type="search" placeholder="Search"
                               aria-label="Search">
                        <button v-on:click="search()" class="btn btn-outline-dark" type="submit">Search</button>

                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-center row mt-2">
                <div class="col-md-8">
                    <div v-for="(post, index) in posts" :key="post.id">
                        <post :post="post"></post>
                    </div>
                    <div v-if="noResultFound" class="fs-5 fw-normal">
                        No result found.
                    </div>

                    <div v-if="page < lastPage" class="d-flex">
                        <button v-on:click="nextPage()" class="btn btn-outline-dark mx-auto">More</button>
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
    props: [
        'filter',
        'pageTitle',
    ],
    components: {
        Post,
        Comments
    },
    mounted() {
        this.form.term = null;
        this.page = 1;
        this.getPosts();
    },
    data() {
        return {
            page: 1,
            lastPage: 1,
            posts: [],
            form: {
                term: null,
            },
            noResultFound: false,
        }
    },
    methods: {
        search () {
            this.page = 1;
            this.lastPage = 1;
            this.getPosts();
        },
        nextPage() {
            this.page++;
            this.getPosts();
        },
        async getPosts() {
            try {
                let resourceUrl = RouteService.getPostsUrl(this.form, this.page);

                if (this.filter && this.filter == 'my-posts') {
                    resourceUrl = RouteService.getMyPostsUrl(this.form, AuthService.user(), this.page);
                } else if (this.filter && this.filter == 'pending-posts') {
                    resourceUrl = RouteService.getPendingPostsUrl(this.form, this.filter, this.page);
                }

                const requestOptions = {
                    method: 'GET',
                    headers: AuthService.authHeader(),
                };

                console.log(this.posts)
                console.log(resourceUrl);

                let response = await fetch(resourceUrl, requestOptions);
                const responseData = await response.json();

                if (response.status === 200) {
                    let posts = responseData.data;
                    this.page = posts.current_page;
                    this.lastPage = posts.last_page;
                    this.posts = this.lastPage > 1 ? this.posts.concat(posts.data) : posts.data;
                    console.log(this.posts.length)
                }

                if (response.status === 401) {
                    AuthService.unauthorized(this.$router)
                }
            } catch (error) {
                toastr.error('Something went wrong. Please try again.', 'Oops!')
            }
        },
    }
}
</script>
