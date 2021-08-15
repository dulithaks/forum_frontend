<template>
    <div class="post-block d-flex mb-5 bg-white flex-column rounded-3 shadow">
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
            <comments :post-id="post.id" :latest-comments="post.latest_comments" ref="comments" :key="post.id"></comments>
        </div>
        <div class="bg-white p-2 pt-0">
            <div class="d-block mx-5">
                <textarea v-model="form.body" class="form-control ml-1 shadow-none textarea"></textarea>
            </div>
            <div class="mt-1 mx-5 text-right">
                <button v-on:click.prevent="saveComment" class="btn btn-dark" type="button">Comment</button>
                <button v-on:click.prevent="cancel" class="btn btn-outline-dark ms-1" type="button">Cancel
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import AuthService from './../services/auth.service'
import RouteService from './../services/route.service';
import Comments from "./Comments";

export default {
    props: ['post'],
    components: {
        Comments
    },
    created() {
        this.form.post_id = this.post.id;
    },
    data() {
        return {
            form: {
                body: '',
                post_id: null,
            },
        }
    },
    methods: {
        async saveComment() {
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: AuthService.authHeader(),
                    body: JSON.stringify(this.form),
                };

                let response = await fetch(RouteService.createCommentUrl(this.post.id), requestOptions);
                const responseData = await response.json();

                if (response.status === 200) {
                    await this.$refs.comments.getComments(1);
                    return toastr.success('Thanks for your comment.');
                }

                if (response.status === 422) {
                    return toastr.error('Please check your input.');
                }

                if (response.status === 401) {
                    return await AuthService.unauthorized(this.$router, response.status)
                }

                toastr.error('Oops... Something went wrong!');
            } catch (error) {
                toastr.error('Something went wrong. Please try again.', 'Oops!')
            }
        },
        cancel () {
            this.form.body = '';
        }
    }
}
</script>
