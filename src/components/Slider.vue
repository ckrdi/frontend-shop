<template>
    <div id="carousel" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
            <div
                class="carousel-item"
                v-for="(slider, id) in sliders"
                :class="{ active: id == 0 }"
                :key="slider.id"
            >
                <img
                    :src="slider.image"
                    class="d-block rounded-lg"
                    style="height: 517px; width: 918px;"
                />
            </div>
        </div>
        <a
            class="carousel-control-prev"
            href="#carousel"
            role="button"
            data-slide="prev"
        >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a
            class="carousel-control-next"
            href="#carousel"
            role="button"
            data-slide="next"
        >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
    setup() {
        const store = useStore();

        onMounted(() => {
            store.dispatch("slider/getSliders");
        });

        const sliders = computed(() => {
            return store.state.slider.sliders;
        });

        return {
            sliders,
        };
    },
};
</script>

<style></style>
