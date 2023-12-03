<script setup>
import { RouterView } from 'vue-router'
import { provide, ref} from "vue";
import { items } from "../database/movies.json";

const movies = ref(items);
provide('movies', movies)

</script>


<template>
    <RouterView />
</template>
