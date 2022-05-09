<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {CircleStencil, Cropper} from 'vue-advanced-cropper';
// CropperType is just a workaround to avoid ESlint error.
import type {Cropper as CropperType} from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const emit = defineEmits<{
  (e: 'save', canvas: HTMLCanvasElement): void
}>()

const fileInput = ref();
const imgSample = ref();
const avatarCropper = ref<InstanceType<typeof CropperType>>();

onMounted(() => {
  fileInput.value.addEventListener("dragenter", dragenter, false);
  fileInput.value.addEventListener("dragover", dragover, false);
  fileInput.value.addEventListener("drop", drop, false)
});


function dragenter(e: Event) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e: Event) {
  e.stopPropagation();
  e.preventDefault();
}

function drop(e: DragEvent) {
  e.stopPropagation();
  e.preventDefault();

  const dt = e.dataTransfer;

  if (dt) {
    const file = dt.files[0];
    imgSample.value = URL.createObjectURL(file);
  }
}


function save() {
  if (avatarCropper.value) {
    const {canvas} = avatarCropper.value.getResult();
    canvas && emit('save', canvas);
  }
}

</script>

<template>

  <input type="file" id="file-inputa" ref="fileInput" accept="image/*">
  <label for="file-inputa">Select an iage</label>

  <cropper
      ref="avatarCropper"
      class="cropper"
      :src="imgSample"
      :stencil-props="{
        aspectRatio: 1
      }"
      :stencil-component="CircleStencil"
  />

  <button @click="save">save</button>

</template>

<style scoped>
.cropper {
  height: 600px;
  width: 600px;
  background: #DDD;
}

input#file-input {
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
}

/* Separate rule for compatibility, :focus-within is required on modern Firefox and Chrome */
input#file-input:focus + label {
  outline: thin dotted;
}

input#file-input:focus-within + label {
  outline: thin dotted;
}
</style>