<template>
    <div class="login-form mx-auto">
        <div class="text-center pt-4 pb-2">
            <h2>Login</h2>
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" placeholder="Enter email">
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Enter password"/>
        </div>
        <div class="mb-3 text-center">
            <button type="button" class="btn btn-dark">Login</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            books: []
        }
    }
}
</script>
