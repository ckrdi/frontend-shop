import Api from "@/api/Api";

const category = {
    namespaced: true,

    state: {
        categories: [],
    },

    mutations: {
        GET_CATEGORIES(state, categories) {
            state.categories = categories;
        },
    },

    actions: {
        getCategories({ commit }) {
            Api.get("/categories")
                .then((response) => {
                    commit("GET_CATEGORIES", response.data.categories);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};

export default category;
