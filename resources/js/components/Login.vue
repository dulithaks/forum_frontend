<template>
    <div class="login-form mx-auto">
        <div class="text-center pt-4 pb-2">
            <h2>Login</h2>
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input v-model="form.email"
                   v-on:keydown="validate"
                   v-on:change="formValidator('email')"
                   type="email"
                   name="email"
                   class="form-control"
                   placeholder="Enter email"
                   autocomplete="off"
            >
            <span v-if="errors.email" class="validation-errors">{{ errors.email[0] }}</span>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input v-model="form.password"
                   v-on:keydown="validate"
                   v-on:change="formValidator('password')"
                   type="password"
                   class="form-control"
                   name="password"
                   placeholder="Enter password"
            >
            <span v-if="errors.password" class="validation-errors">{{ errors.password[0] }}</span>
        </div>
        <div class="mb-3 text-center">
            <button v-on:click.prevent="login" type="button" class="btn btn-dark">Login</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
            errors: [],
        }
    },
    methods: {
        async login() {
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.form),
                };

                let response = await fetch('http://127.0.0.1:8000/api/login', requestOptions);
                const responseData = await response.json();

                if (response.status === 200) {
                    localStorage.setItem('user', JSON.stringify(responseData.data));
                    await this.$router.push('Home');
                }

                if (response.status === 422) {
                    this.errors = responseData.errors || [];
                    console.log(responseData.errors)
                }
            } catch (error) {
                toastr.error('Something went wrong. Please try again.', 'Oops!')
            }
        },
        validate(event) {
            console.log(event);
            setTimeout(() => {
                this.formValidator(event.target.name)
            }, 300);
        },
        formValidator(name) {
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

            if (name == 'email') {
                if(value) {
                    console.log('email')
                    this.errors[name] = this.validEmail(value) ? null : ['The email must be a valid email address.'];
                }
                else {
                    this.errors[name] = [`The ${name} field is required.`];
                }
            }
        },
        validEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }
}
</script>
