import { createStore } from "vuex";
import auth from "./modules/auth";
import order from "./modules/order";
import category from "./modules/category";
import slider from "./modules/slider";
import product from "./modules/product";

export default createStore({
    modules: {
        auth,
        order,
        category,
        slider,
        product,
    },
});
