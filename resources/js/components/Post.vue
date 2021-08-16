<template>
    <div class="post-block d-flex mb-5 bg-white flex-column rounded-3 shadow">
        <div class="bg-white p-2">
            <!-- Post -->
            <div class="d-flex flex-row user-info">
                <img class="rounded-circle avatar"
                     :src="post.user.avatar">
                <div class="d-flex flex-column justify-content-start ml-2"><span
                    class="d-block font-weight-bold name">{{ post.user.full_name }}</span><span
                    class="date text-black-50">{{ post.human_date }}</span>
                </div>
                <div class="flex-grow-1 text-end">
                    <button v-on:click.prevent="approve"
                            v-if="!post.status && user && user.role == 'admin'"
                            class="btn btn-success btn-sm mt-2" type="button">Approve
                    </button>
                    <button v-on:click.prevent="deletePost"
                            v-if="(user && user.id == post.user.id) || (user && user.role == 'admin')"
                            class="btn btn-danger ms-1 me-5 btn-sm mt-2" type="button">
                        Delete
                    </button>
                </div>
            </div>
            <div class="mt-2 ms-5">
                <p class="comment-text">
                    {{ post.body }}
                </p>
            </div>

            <!-- Comments -->
            <comments :post-id="post.id" :latest-comments="post.latest_comments" ref="comments"
                      :key="post.id"></comments>
        </div>
        <div class="bg-white p-2 pt-0">
            <div class="d-block mx-5">
                <textarea v-model="form.body"
                          v-on:keyup="resetServerValidationErrors"
                          :class="[
                            $v.form.body.$dirty && $v.form.body.$error ? 'border-danger' : ''
                          ]"
                          placeholder="Type "
                          class="form-control ml-1 shadow-none textarea"></textarea>
                <span v-if="errors.body" class="validation-errors">{{ errors.body[0] }}</span>
                <div v-if="!$v.form.body.required && $v.form.body.$dirty"
                     class="validation-errors">Field is required
                </div>
                <div v-if="!$v.form.body.minLength && $v.form.body.$dirty"
                     class="validation-errors">Comment must have at least {{ $v.form.body.$params.minLength.min }}
                    letters.
                </div>
            </div>
            <div class="mt-1 mx-5 text-right">
                <button v-on:click.prevent="create" class="btn btn-sm btn-dark" type="button">Comment</button>
                <button v-on:click.prevent="cancel" class="btn btn-sm btn-outline-dark ms-1" type="button">Cancel
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import AuthService from './../services/auth.service'
import RouteService from './../services/route.service';
import Comments from "./Comments";
import {minLength, required} from "vuelidate/lib/validators";

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
            errors: [],
            get user() {
                return  JSON.parse(localStorage.getItem('user')) || null;
            },
        }
    },
    validations: {
        form: {
            body: {
                required,
                minLength: minLength(10)
            },
        },
    },
    methods: {
        async create() {
            try {
                this.$v.$touch()
                if (this.$v.$invalid) {
                    return toastr.error('Please check input.');
                }

                const requestOptions = {
                    method: 'POST',
                    headers: AuthService.authHeader(),
                    body: JSON.stringify(this.form),
                };

                let response = await fetch(RouteService.getCommentsUrl(this.form.post_id), requestOptions);
                const responseData = await response.json();

                if (response.status === 200) {
                    this.form.body = '';
                    this.errors = [];
                    this.$v.$reset();
                    await this.$refs.comments.getComments(1);
                    return toastr.success('Thanks for your comment.');
                }

                if (response.status === 422) {
                    this.errors = responseData.errors || [];

                    console.log(responseData, responseData.errors)

                    if (!responseData.errors && responseData.message) {
                        toastr.error(responseData.message);
                    }
                }
            } catch (error) {
                console.log(error)
                toastr.error('Something went wrong. Please try again.', 'Oops!')
            }
        },
        resetServerValidationErrors() {
            this.$v.$touch();
            this.errors = [];
        },
        cancel() {
            this.form.body = '';
            this.$v.$reset();
        },
        async approve() {
            try {
                const requestOptions = {
                    method: 'PUT',
                    headers: AuthService.authHeader(),
                    body: JSON.stringify(this.form),
                };

                let response = await fetch(RouteService.getPostApproveUrl(this.post.id), requestOptions);
                const responseData = await response.json();

                if(response.status === 200) {
                    this.post.status = 1;
                    toastr.success('Successfully approved.');
                }

                response.status === 401 ? toastr.warning('Authorization Required.') : ''

                response.status === 422 && responseData.message ? toastr.error(responseData.message) : ''

                response.status === 500 ? toastr.error('Something went wrong. Please try again.', 'Oops!') : '';
            } catch (error) {
                toastr.error('Something went wrong. Please try again.', 'Oops!')
            }
        }

    }
}
</script>
