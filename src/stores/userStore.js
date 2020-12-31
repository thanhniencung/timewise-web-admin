import {
    toRefs,
    reactive
} from "vue";
import {
    timewiseAdminApi,
    timewiseApi
} from "../network/timewise_api";
import {
    validateEmail,
    validatePass
}
from "../helper/validate.js"

export const useUser = () => {
    const state = reactive({
        errEmail: null,
        errPass: null,
        userListResponse: null,
    });

    const doSignIn = async (email, pass) => {
        state.errEmail = null;
        state.errPass = null;

        let hasError = false;

        if (!validateEmail(email)) {
            state.errEmail = "Email không hợp lệ";
            hasError = true;
        }

        if (!validatePass(pass)) {
            state.errPass = "Mật khẩu tối thiểu 6 ký tự";
            hasError = true;
        }

        if (hasError) {
            console.log(state.errEmail)
            console.log(state.errPass)
            return;
        }

        const response = await timewiseAdminApi.post('/admin/sign-in', {
            email: email.trim(),
            password: pass.trim()
        }).catch((e) => {
            if (e.response) {
                console.log(e.response.status);
            } else {
                console.log(e);
            }
            return null;
        });

        if (response) {
            const user = response.data.data;
            localStorage.setItem("token", user.token);
            localStorage.setItem("user", user);
            return user;
        }
    };

    const doLogout = () => {
        localStorage.setItem("token", null);
        localStorage.setItem("user", null);
    };

    const getUserList = async () => {
        const response = await timewiseApi.get('/user/list').catch((e) => {
            if (e.response) {
                console.log(e.response.status);
            } else {
                console.log(e);
            }
            return null;
        });

        if (response) {
            state.userListResponse = response.data.data;
        }
    }

    return {
        ...toRefs(state),
        doSignIn,
        doLogout,
        getUserList
    };

}