<script setup lang="ts">
import SplashSelectSide from '@/components/SplashSelectSide.vue'
import MainScreen from '@/components/MainScreen.vue'
import {useGeneralPreferencesStore} from '@/stores/generalPreferences'
import AvatarCropAndUpload from '@/components/AvatarCropAndUpload.vue'
import {publicURL, upload} from '@/composables/FirebaseCloudStorage';
import {v4 as uuidv4} from 'uuid';

const store = useGeneralPreferencesStore();

function avatarSave(canvas: HTMLCanvasElement) {
  canvas.toBlob(async blob => {
    // Here instead handling the submission maybe we should emit an event with the raw canvas and let parent decide what to do with it.
    if (blob) {
      const ref = await upload(blob, `${uuidv4()}.jpg`, 'avatar');
      const url = await publicURL(ref);

      console.log(url);
      console.log(ref.name);
      console.log(ref.bucket);
      console.log(ref.fullPath);
    }else{
      throw new Error('Is not possible to get tbe canvas blob.');
    }

  }, 'image/jpeg');
}
</script>

<template>
  <AvatarCropAndUpload
      @save="avatarSave"
  />
</template>

<style>
@import './assets/base.css';
@import './assets/dark-side.css';
@import './assets/light-side.css';

</style>
