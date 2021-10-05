<template>
    <div class="container-fluid mb-5 mt-4">
        <div class="row">
            <div
                class="col-md-2 col-4 mb-3"
                v-for="category in categories"
                :key="category.id"
            >
                <router-link
                    :to="{
                        name: 'category_detail',
                        params: { slug: category.slug },
                    }"
                >
                    <div class="card h-100 border-0 rounded shadow">
                        <div class="card-body text-center">
                            <img :src="category.image" style="width: 100px;" />
                            <hr />
                            <label
                                class="font-weight-bold"
                                style="cursor: pointer;"
                            >
                                {{ category.name }}
                            </label>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
    setup() {
        const store = useStore();

        onMounted(() => {
            store.dispatch("category/getCategories");
        });

        const categories = computed(() => {
            return store.state.category.categories;
        });

        return {
            categories,
        };
    },
};
</script>
