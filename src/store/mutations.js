import types from './mutation-types'

export default {
    [types.LOGIN] (state, user) {
        window.localStorage.setItem('macro_login_user', JSON.stringify(user));
        state.loginUser = user;
    },
    [types.LOGOUT] (state) {
        window.localStorage.removeItem('macro_login_user');
        state.loginUser = null;
    },
    [types.TITLE] (state, title) {
        window.document.title = title + ' - Macro博客';
        state.title = title;
    }
}