<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/people">People</RouterLink>
        <!--        <SearchPrefetchedPersons />-->
        <!--        <SearchPersonsFromAPI />-->
      </nav>
    </div>
  </header>

  <RouterView/>

</template>