<template>
    <div class="post-list">
        <div class="container pb-5">
            <div class="d-flex justify-content-center row">
                <div class="col-md-8 my-2">
                    <h1>Create Post</h1>
                </div>
            </div>
            <div class="d-flex justify-content-center row">
                <div class="bg-white col-md-8 px-4 py-5 shadow">
                    <div class="mb-3">
                        <label for="body" class="form-label">Post Content</label>
                        <textarea v-model="form.body"
                               v-on:keydown="validate('body')"
                               v-on:change="validate('body')"
                               name="body"
                               class="form-control"
                               placeholder="Enter your post content"
                               autocomplete="off"
                        ></textarea>
                        <span v-if="errors.body" class="validation-errors">{{ errors.body[0] }}</span>
                    </div>
                    <div class="mb-3 text-center">
                        <button v-on:click.prevent="create" type="button" class="btn btn-dark">Create</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>



<script>
import AuthService from './../services/auth.service'
import RouteService from './../services/route.service'

export default {
    data() {
        return {
            form: {
                body: '',
            },
            errors: [],
        }
    },
    methods: {
        async create() {
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: AuthService.authHeader(),
                    body: JSON.stringify(this.form),
                };

                let response = await fetch(RouteService.getCreatePostUrl(), requestOptions);
                const responseData = await response.json();

                if (response.status === 200) {
                    console.log(responseData)
                    await this.$router.push('/');
                }

                if (response.status === 422) {
                    this.errors = responseData.errors || [];

                    console.log(responseData, responseData.errors)

                    if(!responseData.errors && responseData.message) {
                        toastr.error(responseData.message);
                    }
                }
            } catch (error) {
                console.log(error)
                toastr.error('Something went wrong. Please try again.', 'Oops!')
            }
        },
        validate(name) {
            setTimeout(() => {
                let value = this.form[name];
                console.log(name, value)

                if(value) {
                    this.errors[name] = null
                }

                if (value) {
                    this.errors[name] = null;
                }
                else {
                    this.errors[name] = [`The ${name} field is required.`];
                }
            }, 100);
        },
    }
}
</script>
