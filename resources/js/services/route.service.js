class RouteService {
    static baseUrl = "http://127.0.0.1:8000/api/";

    createCommentUrl(postId) {
        return RouteService.baseUrl + `posts/${postId}/comments/create`
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

}

export default new RouteService();
