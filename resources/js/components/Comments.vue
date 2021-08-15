<template>
    <!-- Comments -->
    <div class="comment-wrapper">
        <div v-for="(comment, index) in comments"
             :key="comment.id"
             class="d-block mt-3 mx-5 px-4 py-2 rounded-3 comment-block"
        >
            <div class="d-flex flex-row user-info">
                <img class="rounded-circle avatar"
                     :src="comment.user.avatar"
                     width="40">
                <div class="d-flex flex-column justify-content-start ml-2"><span
                    class="d-block font-weight-bold text-dark">{{ comment.user.full_name }}</span><span
                    class="date text-black-50">{{ comment.human_date }}</span></div>
            </div>
            <div class="mt-2">
                <p class="comment-text mb-0">{{ comment.body }}</p>
            </div>
        </div>
    </div>

</template>

<script>
import AuthService from './../services/auth.service'

export default {
    props: ['latestComments', 'postId'],

    data() {
        return {
            postId: null,
            page: 1,
            comments: [],
        }
    },

    mounted() {
        this.postId = this.postId;
        this.page = this.latestComments.current_page;
        this.comments = this.latestComments.data;
    },

    created() {
        // console.log('Component created.')
        // console.log(this.comments)
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
