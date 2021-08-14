<template>

    <div class="container bg-light vh-100 px-0" style="max-width: 1000px">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Forum</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" href="#">Approve Posts</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div class="mt-2 w-100 px-2">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {}
</script>
