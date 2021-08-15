class AuthService {
    isAuthUser() {
        let user = JSON.parse(localStorage.getItem('user'));
        console.log(user)
        if (user && user.api_token) {
            return user.api_token ? true : false;
        } else {
            return false;
        }
    }

    logout() {
        console.log('logout')
        //localStorage.removeItem('user');
    }

    header() {
        let user = JSON.parse(localStorage.getItem('user'));

        if (user && user.api_token) {
            console.log(user.api_token)
            return { Authorization: 'Bearer ' + user.api_token };
        } else {
            return {};
        }
    }
}

export default new AuthService();
