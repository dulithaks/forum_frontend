<template>
    <div class="login-form mx-auto">
        <div class="text-center pt-4 pb-2">
            <h2>Login</h2>
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input v-model="form.email" type="email" class="form-control" id="email" placeholder="Enter email">
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input v-model="form.password" type="password" class="form-control" id="password"
                   placeholder="Enter password"/>
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
                console.log(responseData.data);
                localStorage.setItem('user', JSON.stringify(responseData.data));
                await this.$router.push('Home');
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>
