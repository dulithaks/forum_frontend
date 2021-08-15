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
                    <div  v-for="(post, index) in posts"
                          :key="post.id"
                          class="post-block d-flex my-5 bg-white flex-column rounded-3 shadow">
                        <div class="bg-white p-2">
                            <!-- Post -->
                            <div class="d-flex flex-row user-info">
                                <img class="rounded-circle avatar"
                                     :src="post.user.avatar">
                                <div class="d-flex flex-column justify-content-start ml-2"><span
                                    class="d-block font-weight-bold name">{{ post.user.full_name }}</span><span
                                    class="date text-black-50">{{ post.human_date }}</span></div>
                            </div>
                            <div class="mt-2 ms-5">
                                <p class="comment-text">
                                    {{ post.body }}
                                </p>
                            </div>

                            <!-- Comments -->
                            <comments :post-id="post.id" :latest-comments="post.latest_comments"></comments>
                        </div>
                        <div class="bg-white p-2 pt-0">
                            <div class="d-block mx-5">
                                <textarea class="form-control ml-1 shadow-none textarea"></textarea>
                            </div>
                            <div class="mt-1 mx-5 text-right">
                                <button class="btn btn-primary btn-sm shadow-none" type="button">Comment</button>
                                <button class="btn btn-outline-primary btn-sm ml-1 shadow-none" type="button">Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import AuthService from './../services/auth.service'
import Comments from "./Comments";

export default {
    components: {
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
