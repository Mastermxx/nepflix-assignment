<script setup>
import {defineEmits} from "vue";
const emit = defineEmits(['close-popup'])

const close = () => {
    emit('close-popup')
}
</script>

<template>
  <div class="add-movie-popup active">
    <div class="form-wrapper">
        <div class="close-popup">
            <button class="button close" @click="close"><font-awesome-icon icon="xmark" /></button>
        </div>
        <slot name="title"></slot>
        <slot></slot>
    </div>
  </div>
</template>

<style>
  .form-wrapper {
      background: #111d2b;
      color: #fff;
      display: flex;
      flex-direction: column;
      padding: 20px;
      width: 300px;
      border-radius: 10px;
      position: relative;
      top: 0;
  }
  .add-movie-popup {
      display: none;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 10;
      opacity: 1;
      background: rgba(0,0,0,0.6);
      transition: opacity 0.3s ease;
  }

  .button.close {
      background: #435468;
      color: #fff;
  }
</style>