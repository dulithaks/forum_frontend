<template>
    <div class="login-form mx-auto">
        <div class="text-center pt-4 pb-2">
            <h2>Register</h2>
        </div>
        <div class="mb-3">
            <label for="first_name" class="form-label">First Name</label>
            <input v-model="form.first_name"
                   @input="validateForm"
                   type="text"
                   name="first_name"
                   class="form-control"
                   placeholder="Enter First Name"
                   autocomplete="off"
            >
            <span v-if="errors.first_name" class="validation-errors">{{ errors.first_name }}</span>
        </div>

        <div class="mb-3">
            <label for="last_name" class="form-label">Last Name</label>
            <input v-model="form.last_name"
                   @input="validateForm"
                   type="text"
                   name="last_name"
                   class="form-control"
                   placeholder="Enter Last Name"
                   autocomplete="off"
            >
            <span v-if="errors.last_name" class="validation-errors">{{ errors.last_name }}</span>
        </div>

        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input v-model="form.email"
                   @input="validateForm"
                   type="email"
                   name="email"
                   class="form-control"
                   placeholder="Enter email"
                   autocomplete="off"
            >
            <span v-if="errors.email" class="validation-errors">{{ errors.email }}</span>
        </div>

        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input v-model="form.password"
                   @input="validateForm"
                   type="password"
                   class="form-control"
                   name="password"
                   placeholder="Enter password"
            >
            <span v-if="errors.password" class="validation-errors">{{ errors.password }}</span>
        </div>

        <div class="mb-3 text-center">
            <button v-on:click.prevent="register" type="button" class="btn btn-dark w-50">Register</button>
        </div>
    </div>
</template>

<script>
import {required, email, minLength} from "vuelidate/lib/validators";
import AuthService from './../services/auth.service'
import RouteService from './../services/route.service';

export default {
    data() {
        return {
            form: {
                first_name: null,
                last_name: null,
                email: null,
                password: null,
            },
            errors: [],
        }
    },
    validations: {
        form: {
            first_name: {
                required,
            },
            last_name: {
                required,
            },
            email: {
                required,
                email,
            },
            password: {
                required,
                minLength: minLength(8)
            },
        },
    },
    methods: {
        async register() {
            try {
                this.$v.$touch()
                if (this.$v.$invalid) {
                    return toastr.error('Please fill the registration form.');
                }

                const requestOptions = {
                    method: 'POST',
                    headers: AuthService.guestHeader(),
                    body: JSON.stringify(this.form),
                };

                let response = await fetch(RouteService.getRegisterUrl(), requestOptions);
                const responseData = await response.json();

                if (response.status === 201) {
                    localStorage.setItem('user', JSON.stringify(responseData.data));
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
                this.errors[field] = `The ${field.replace('_', ' ')} must be at least 8 characters.`;
            }

            if (!this.$v.form.email.email && this.$v.form.email.$dirty) {
                 this.errors[field] = `The ${field.replace('_', ' ')} must be a valid email address.`;
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
