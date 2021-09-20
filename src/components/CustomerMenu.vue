<template>
    <div class="card border-0 shadow">
        <div class="card-body">
            <h5 class="font-weight-bold">MAIN MENU</h5>
            <hr />
            <ul class="list-group">
                <router-link
                    :to="{ name: 'dashboard' }"
                    class="list-group-item text-decoration-none text-dark text-uppercase"
                >
                    <i class="fas fa-shopping-cart"></i> Dashboard
                </router-link>
                <router-link
                    :to="{ name: 'order' }"
                    class="list-group-item text-decoration-none text-dark text-uppercase"
                >
                    <i class="fas fa-shopping-cart"></i> My Order
                </router-link>
                <a
                    @click="logout"
                    class="list-group-item text-decoration-none text-dark text-uppercase"
                    style="cursor: pointer;"
                >
                    <i class="fas fa-sign-out-alt"></i> Log out
                </a>
            </ul>
        </div>
    </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
    setup() {
        const store = useStore();
        const router = useRouter();

        function logout() {
            store.dispatch("auth/logout").then(() => {
                router.push({ name: "login" });
            });
        }

        return {
            logout,
        };
    },
};
</script>

<style></style>
