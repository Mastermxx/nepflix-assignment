<script setup>
import {defineProps, defineEmits, inject, ref, defineAsyncComponent} from "vue";
import * as yup from "yup";

const AppModal = defineAsyncComponent(() =>
    import('@/components/AppModal.vue')
)

const errorMessage = ref("");
const props = defineProps(['id', 'title'])
const movies = inject('movies')
const movie = movies.value.find(m => m.id === props.id)
//
const emit = defineEmits(['close-popup'])
const close = () => {
    emit('close-popup')
}

const vFocus = {
  mounted: (el) => el.focus()
}

function handleErrorMessages() {
    // make a function that will trigger on input and removes the error message about the form
}

function addOrEditMovie(event) {
    const formData = new FormData(event.target)
    const movieId = (movies.value.length ? Math.max(...movies.value.map(m => m.id)) : 0) + 1;
    const movieName = formData.get('movie-name');
    const movieDescription = formData.get('description');
    const movieImage = formData.get('image');
    const movieRating = parseFloat(formData.get('rating') || 0);
    const movieGenre = formData.getAll('genre');
    const movieInTheaters = !!formData.get('theaters');

    const newMovie = {
        "name": movieName,
        "description": movieDescription,
        "image": movieImage,
        "rating": movieRating,
        "genres": movieGenre,
        "inTheaters": movieInTheaters
    }

    if (props.id) {
        movies.value = movies.value.map(movie => {
            const schema = yup.object({
                name: yup.string().min(1).required(),
                // finish validation add more shit
            })
            if ( movie.id === props.id ) {
                movie.name = newMovie.name
                movie.description = newMovie.description
                movie.image = newMovie.image
                movie.rating = newMovie.rating
                movie.genres = newMovie.genres
                movie.inTheaters = newMovie.inTheaters
            }
            return movie
        })
        close()
    } else {
        const schema = yup.object({
            name: yup.string().min(1).required(),
            // finish validation add more shit
        })
        try {
            schema.validateSync(newMovie)
            movies.value = [...movies.value, {...newMovie, id : props.id || movieId }]
            event.target.reset()
            close() // maybe think of something else
        } catch (e) {
            errorMessage.value = e.message
        }
    }
}
</script>

<template>
    <AppModal @close-popup="close">
      <template v-slot:title><h2>{{ props.title }}</h2></template>
      <form class="form" @submit.prevent="addOrEditMovie">
          Name
          <input :value="movie?.name" name="movie-name" type="text" placeholder="Name of the movie" required v-focus />
          Description
          <textarea :value="movie?.description" name="description" type="text" placeholder="Description" />
          Image
          <input :value="movie?.image" name="image" type="text" placeholder="Image URL" />
          Rating
          <input :value="movie?.rating" name="rating" type="number" step="0.5" maxlength="1" min="0" max="5" placeholder="Rating" />
          Genre
          <select name="genre" required multiple>
              <option :selected="movie?.genres.some(g => g === 'Thriller')" name="thriller" value="Thriller">Thriller</option>
              <option :selected="movie?.genres.some(g => g === 'Action')" name="action" value="Action">Action</option>
              <option :selected="movie?.genres.some(g => g === 'Fantasy')" name="fantasy" value="Fantasy">Fantasy</option>
              <option :selected="movie?.genres.some(g => g === 'Crime')" name="crime" value="Crime">Crime</option>
              <option :selected="movie?.genres.some(g => g === 'Drama')" name="drama" value="Drama">Drama</option>
              <option :selected="movie?.genres.some(g => g === 'Adventure')" name="adventure" value="Adventure">Adventure</option>
              <option :selected="movie?.genres.some(g => g === 'Horror')" name="horror" value="Horror">Horror</option>
          </select>
          <div>
              in Theaters
              <input :checked="movie?.inTheaters" type="checkbox" name="theaters" id="theaters">
          </div>

          <div class="error"> {{ errorMessage }}  </div>

          <div class="buttons-wrapper">
              <button class="button cancel" type="reset" @click="close">Cancel</button>
              <button class="button" type="submit">Submit</button>
          </div>

      </form>
    </AppModal>
</template>
<style scoped>

/* Input and Textarea styles */
textarea, input, select {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    font-size: 14px;
    padding: 10px;
}

.form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
}

.buttons-wrapper {
    display: flex;
    justify-content: space-between;
}

.button.cancel {
    background: #435468;
    color: #fff;
}

/* Error message styles */
.error {
    color: red;
    font-size: 14px;
}
</style>
