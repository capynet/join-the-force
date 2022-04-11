<script setup lang="ts">
import {useDataSourceStore} from '@/stores/dataSource'

const store = useDataSourceStore();
let timer: number;
const waitTime = 500;

function search(e: KeyboardEvent) {
  const text: string = (e.target as HTMLInputElement).value;
  clearTimeout(timer);

  timer = setTimeout(() => {
    doSearch(text);
  }, waitTime);

}

function doSearch(text: string) {
  store.getPeople("1", text);
}

</script>

<template>
  <form action="#" id="people-filter-form">
    <label>
      <p>Filter by name</p>
      <input type="search" name="search-people" @input="search">
    </label>
  </form>
</template>

<style scoped>
form {
  border: 1px solid;
  padding: 10px;
  display: inline-block;
}

form input {
  border: 1px solid;
  padding: 5px;
}
</style>

