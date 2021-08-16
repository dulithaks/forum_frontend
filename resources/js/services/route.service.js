class RouteService {
    static baseUrl = "http://127.0.0.1:8000/api/";

    createCommentUrl(postId) {
        return RouteService.baseUrl + `posts/${postId}/comments`
    }

    getCommentsUrl(postId) {
        return RouteService.baseUrl + `posts/${postId}/comments`
    }

    getPostsUrl(form) {
        let url = RouteService.baseUrl + 'posts';
        if(form.term) {
            url +=  '?term=' + form.term.trim();
        }

        return url;
    }

    getCreatePostUrl() {
        return RouteService.baseUrl + `posts`
    }

    getRegisterUrl() {
        return RouteService.baseUrl + `register`
    }
}

export default new RouteService();
