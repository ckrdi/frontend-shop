import { createStore } from "vuex";
import auth from "./modules/auth";
import order from "./modules/order";

export default createStore({
    modules: {
        auth,
        order,
    },
});
