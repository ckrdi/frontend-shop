import Api from "@/api/Api";

const product = {
    namespaced: true,
    state: {
        products: [],
        product: {},
    },
    mutations: {
        GET_PRODUCTS(state, products) {
            state.products = products;
        },
        PRODUCT_DETAIL(state, product) {
            state.product = product;
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
        getProductDetail({ commit }, slug) {
            Api.get(`/product/${slug}`).then((response) => {
                commit("PRODUCT_DETAIL", response.data.product);
            });
        },
    },
    getters: {
        allProducts(state) {
            return state.products;
        },
        detailProduct(state) {
            return state.product;
        },
    },
};

export default product;
