import Api from "@/api/Api";

const product = {
    namespaced: true,
    state: {
        products: [],
    },
    mutations: {
        GET_PRODUCTS(state, products) {
            state.products = products;
        },
    },
    actions: {
        getProducts({ commit }) {
            Api.get("/products")
                .then((response) => {
                    commit("GET_PRODUCTS", response.data.products);
                })
                .catch((error) => console.log(error));
        },
    },
    getters: {},
};

export default product;
