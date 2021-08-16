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
                               @input="validateForm"
                               name="body"
                               class="form-control"
                               placeholder="Enter your post content"
                               autocomplete="off"
                        ></textarea>
                        <span v-if="errors.body" class="validation-errors">{{ errors.body }}</span>
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
import {required, minLength, email} from "vuelidate/lib/validators";
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
                    return toastr.error('Please enter post content.');
                }

                const requestOptions = {
                    method: 'POST',
                    headers: AuthService.authHeader(),
                    body: JSON.stringify(this.form),
                };

                let response = await fetch(RouteService.getCreatePostUrl(), requestOptions);
                const responseData = await response.json();

                if (response.status === 200) {
                    toastr.success('Success.');
                    await this.$router.push('/');
                }

                if (response.status === 422) {
                    this.formatServerValidationErrors(responseData.errors);
                    responseData.message ? toastr.error(responseData.message) : '';
                }

                if (response.status === 500) {
                    responseData.message ? toastr.error(responseData.message) : '';
                }
            } catch (error) {
                console.log(error)
                toastr.error('Something went wrong. Please try again.', 'Oops!')
            }
        },
        validateForm(event) {
            this.$v.form[event.target.name].$touch()
            this.addValidationErrors(event.target.name);
        },
        addValidationErrors(field) {
            console.log(field, this.$v.form[field].required, this.$v.form[field].$dirty, this.$v.form[field].$error)

            if(!this.$v.form[field].$error) {
                return this.errors[field] = '';
            }

            if (!this.$v.form[field].required && this.$v.form[field].$dirty) {
                this.errors[field] = `The ${field.replace('_', ' ')} field is required.`;
            }

            if (!this.$v.form[field].minLength && this.$v.form[field].$dirty) {
                this.errors[field] = `The ${field.replace('_', ' ')} must be at least 10 characters.`;
            }
        },
        formatServerValidationErrors(errors) {
            errors = errors || {}
            Object.keys(errors).map(function (key, index) {
                errors[key] = errors[key][0];
            });
            this.errors = errors;
        }
    }
}
</script>
