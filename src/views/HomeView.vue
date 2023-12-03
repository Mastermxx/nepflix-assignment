<script setup>

import {defineAsyncComponent, inject, ref} from "vue";
const MovieForm = defineAsyncComponent(() =>
    import('@/components/MovieForm.vue')
)
import MovieCard from "@/components/MovieCard.vue";

const movies = inject('movies')
const errorMessage = ref("");

const averageRating = () => {
    const ratings = movies.value.map(movie => movie.rating);
    const totalRatings = ratings.reduce((sum, rating) => sum + rating, 0);
    const average = totalRatings / ratings.length;
    return average.toFixed(1);
}

function removeRatings() {
    movies.value.forEach(movie => {
        movie.rating = 0
    });
}

function handleAddMoviePopup() {
    show.value = true

}

const show = ref(false)
const closePopup = () => {
    show.value = false;
}
</script>

<template>
    <div class="app">
        <div class="header">
            <div class="info">
                <router-link to="/">
                    <div class="logo">
                        <img src="../assets/nepflix.png" alt="">
                    </div>
                </router-link>
                Total Movies: {{ movies.length }} /
                Average Rating: <font-awesome-icon icon="star" /> {{ averageRating() }}
            </div>
            <div class="buttons">
                <button class="button remove" @click="removeRatings()">Remove Ratings</button>
                <button class="button add" @click="handleAddMoviePopup()"><font-awesome-icon icon="plus" /> Add movie</button>
            </div>
        </div>
        <Transition name="modal">
            <MovieForm v-if="show" @close-popup="closePopup" title="Add movie" />
        </Transition>
        <div class="movie-list">
            <div class="movie-item"
                 v-for="(movie, movieIndex) in movies"
                 :key="movie.id"
            >
                <MovieCard :id="movie.id" />
            </div>
        </div>
    </div>
</template>

<style>
    .movie-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
    }
</style>