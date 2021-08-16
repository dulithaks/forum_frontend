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

    getMyPostsUrl(form, user) {
        let url = RouteService.baseUrl + 'posts?userId=' + user.id;
        url +=  form.term ? '&term=' + form.term.trim() : '';
        return url;
    }

    getPendingPostsUrl(form, filter) {
        let url = RouteService.baseUrl + 'posts?filter=' + filter;
        url +=  form.term ? '&term=' + form.term.trim() : '';
        return url;
    }

    getCreatePostUrl() {
        return RouteService.baseUrl + `posts`
    }

    getRegisterUrl() {
        return RouteService.baseUrl + `register`
    }

    getPostApproveUrl(postId) {
        return RouteService.baseUrl + `posts/${postId}/approve`
    }

    getPostRejectUrl(postId) {
        return RouteService.baseUrl + `posts/${postId}/reject`
    }

    getPostDeleteUrl(postId) {
        return RouteService.baseUrl + `posts/${postId}`
    }
}

export default new RouteService();
