<script setup>
import {defineAsyncComponent, inject, ref} from "vue";
import {StarIcon} from "@heroicons/vue/24/solid";

const MovieForm = defineAsyncComponent(() =>
    import('@/components/MovieForm.vue')
)
const props = defineProps(['id'])
const movies = inject('movies')
const movie = movies.value.find(m => m.id === props.id)
const show = ref(false)

const closePopup = () => {
    show.value = false;
}

function editMovie() {
    show.value = true;
}

function removeMovie(movieId) {
    movies.value = movies.value.filter(item => item.id !== movieId);
}
function updateRating(movieId, rating) {
    movies.value.map(m => {
        if (m.id === movieId) {
            m.rating = rating
        }
        return m
    })
}

</script>

<template>
    <Transition name="modal">
        <MovieForm v-if="show" :id="props.id" title="Edit Movie" @close-popup="closePopup" />
    </Transition>

    <router-link :to="{ name: 'movie', params: { id: movie.id } }">
        <div class="movie-item-image-wrapper">
            <div class="movie-item-star-wrapper">
                <StarIcon
                        id="rating"
                        :class="[movie.rating ? 'text-yellow-500' : 'text-gray-500']"
                        class="movie-item-star-rating-icon"
                />
                <div class="movie-item-star-content-wrapper">
        <span
                v-if="movie.rating"
                id="rating-stars"
                class="movie-item-star-content-rating-rated"
        >
          {{ movie.rating }}
        </span>
                    <span v-else class="movie-item-star-content-rating-not-rated">
          -
        </span>
                </div>
            </div>
            <img :src="movie.image" alt="" class="movie-item-image" />
        </div>
    </router-link>

    <div class="movie-item-content-wrapper">
        <div class="movie-item-title-wrapper">
            <h3 class="movie-item-title">{{ movie.name }}</h3>
            <div class="movie-item-genres-wrapper">
        <span
                v-for="genre in movie.genres"
                :key="`${movie.id}-${genre}`"
                :class="`movie-item-genre-tag genre-${genre}`"
        >{{ genre }}</span
        >
            </div>
        </div>
        <div class="movie-item-description-wrapper">
            <p class="movie-item-description">{{ movie.description }}</p>
        </div>

    </div>

    <div class="edit-wrapper">
        <div class="movie-item-rating-wrapper">
        <span class="movie-item-rating-text">
          Rating: ({{ movie.rating }}/5)
        </span>

            <div class="movie-item-star-icon-wrapper">
                <button
                        v-for="star in 5"
                        :key="star"
                        :class="[
                    star <= movie.rating ? 'text-yellow-500' : 'text-gray-500',
            ]"
                        :disabled="star === movie.rating"
                        class="movie-item-star-icon-button"
                        @click="updateRating(movie.id, star)"
                >
                    <font-awesome-icon icon="star" />
                </button>
            </div>
        </div>
        <div class="movie-item-buttons-wrapper">
            <button class="button edit-movie-item" @click="editMovie()">
                <font-awesome-icon icon="pen-to-square" />
            </button>
            <button class="button remove-movie-item" content="" @click="removeMovie(movie.id)">
                <font-awesome-icon icon="trash-can" />
            </button>
        </div>
    </div>
</template>


<style scoped>
.movie-item-image-wrapper {
    height: 425px;
}
.movie-item-star-wrapper {
    position: relative;
}
.movie-item-star-rating-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 10px;
    top: 10px;
    height: 40px;
    width: 40px;
}

.movie-item-star-icon-button {
    background: none;
    padding: 0;
    margin: 0;
    border: 0;
    cursor: pointer;
}

.movie-item-star-content-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 10px;
    top: 10px;
    height: 40px;
    width: 40px;
}
.movie-item-genres-wrapper {
    display: flex;
    gap: 4px;
    align-items: center;
    margin-top: 10px;
    flex-wrap: wrap;
}

.edit-wrapper {
    display: flex;
    flex-direction: row;
    padding: 0 20px 20px 20px;
    justify-content: space-between;
    bottom: 0;
}
.detailed-page .edit-wrapper {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    gap: 20px;
    color: #fff;
}

.movie-item-buttons-wrapper {
    display: flex;
    align-items: flex-end;
    gap: 5px;
}

.edit-movie-item,
.remove-movie-item {
    background: #dfdcdc;
    border-radius: 50%;
    width: 30px;
    height: 30px;
}

.edit-movie-item:hover,
.remove-movie-item:hover {
    background: #c0c0c0;
}

.detailed-page .remove-movie-item {
    display: none;
}

.movie-item-image-wrapper {
    height: 425px;
}
.movie-item-image {
    width: 300px;
    height: 425px;
    border-radius: 10px 10px 0 0;
}
.detailed-page .movie-item-image {
    max-width: 300px;
    border-radius: 10px 0 0 10px;
}
.movie-item-content-wrapper {
    height: 100%;
    padding: 20px;
}
.detailed-page .movie-item-content-wrapper {
    height: unset;
}

.movie-item-star-rating-icon {
    color: orange;
    height: 40px;
    width: 40px;
}

/* Rating stars styling */
.text-yellow-500 .fa-star { color: orange; }
.text-gray-500 .fa-star { color: #ffe1a1; }
.text-gray-500 .fa-star:hover { color: orange; }

/* Genre bubble styling */
.movie-item-genre-tag {
    background: #2f588a;
    color: #fff;
    font-size: 12px;
    padding: 4px 10px;
    border-radius: 25px;
}
.genre-Action { background: #485dd0; }
.genre-Adventure { background: #409a39; }
.genre-Crime { background: #df313f; }
.genre-Drama { background: #ff9328; }
.genre-Thriller { background: #186c86; }
.genre-Fantasy { background: #801d72; }
.genre-Horror { background: #5e0707; }

</style>
