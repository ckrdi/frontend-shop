import Api from "../../api/Api";

const auth = {
    namespaced: true,

    state: {
        // token state from JWT saved in localstorage
        token: localStorage.getItem("token") || "",

        // user state to save authenticated user
        user: localStorage.getItem("user") || {},
    },

    mutations: {
        // update state from response
        AUTH_SUCCESS(state, token, user) {
            state.token = token;
            state.user = user;
        },
        // update user state from register/login response
        GET_USER(state, user) {
            state.user = user;
        },
        // logout
        AUTH_LOGOUT(state) {
            state.token = ""; // set to empty string
            state.user = {}; // set to empty object
        },
    },

    actions: {
        // register
        register({ commit }, user) {
            return new Promise((resolve, reject) => {
                Api.post("/register", {
                    // request data to backend
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    password_confirmation: user.password_confirmation,
                })
                    .then((response) => {
                        const token = response.data.token;
                        const user = response.data.user;

                        // set localstorage to save
                        localStorage.setItem("token", token);
                        localStorage.setItem("user", user);

                        // set axios default header with token
                        Api.defaults.headers.common["Authorization"] =
                            "Bearer " + token;

                        commit("AUTH_SUCCESS", token, user);

                        resolve(response);
                    })
                    .catch((error) => {
                        localStorage.removeItem("token");
                        reject(error.response.data);
                    });
            });
        },

        getUser({ commit }) {
            const token = localStorage.getItem("token");

            Api.defaults.headers.common["Authorization"] = "Bearer " + token;
            Api.get("/user").then((response) => {
                commit("GET_USER", response.data.user);
            });
        },

        logout({ commit }) {
            return new Promise((resolve) => {
                commit("AUTH_LOGOUT");
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                delete Api.defaults.headers.common["Authorization"];

                resolve();
            });
        },

        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                Api.post("/login", {
                    email: user.email,
                    password: user.password,
                })
                    .then((response) => {
                        const token = response.data.token;
                        const user = response.data.user;

                        localStorage.setItem("token", token);
                        localStorage.setItem("user", user);

                        Api.defaults.headers.common["Authorization"] =
                            "Bearer " + token;

                        commit("AUTH_SUCCESS", token, user);
                        commit("GET_USER", user);

                        resolve(response);
                    })
                    .catch((error) => {
                        localStorage.removeItem("token");
                        reject(error.response.data);
                    });
            });
        },
    },

    getters: {
        currentUser(state) {
            return state.user;
        },
        isLoggedIn(state) {
            return state.token;
        },
    },
};

export default auth;
