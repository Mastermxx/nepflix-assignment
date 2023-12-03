<script setup>
import MovieCard from "@/components/MovieCard.vue";
import { useRoute } from 'vue-router';

const route = useRoute();
const id = parseInt(route.params.id)
</script>

<template>
    <div class="movie-background">
        <div class="header">
            <div class="info">
                <router-link to="/">
                    <div class="logo">
                        <img src="../assets/nepflix.png" alt="">
                    </div>
                </router-link>
            </div>
        </div>
        <div class="detailed-page">
            <div class="movie-item">
                <MovieCard :id="id" />
            </div>
        </div>
    </div>

</template>

<style scoped>
    .detailed-page {
        display: flex;
        justify-content: center;
        margin-top: 50px;
    }
    .movie-item {
        position: relative;
        flex-direction: row;
        max-width: 700px;
        width: 100%;
    }
</style>