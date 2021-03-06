import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);

app.mixin({
    methods: {
        moneyFormat(number) {
            let reverse = number
                .toString()
                .split("")
                .reverse()
                .join("");
            let thousands = reverse.match(/\d{1,3}/g);
            thousands = thousands
                .join(".")
                .split("")
                .reverse()
                .join("");

            return thousands;
        },

        calculateDiscount(product) {
            return product.price - product.price * (product.discount / 100);
        },
    },
});
app.use(router);
app.use(store);
app.mount("#app");
