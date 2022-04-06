<script setup lang="ts">
import {useRoute} from 'vue-router'
import {useDataSourceStore} from '@/stores/dataSource'
import {ref} from "vue";

const route = useRoute()
const store = useDataSourceStore();
const getPersonFileCall = store.getPersonFile(route.params.id as string);

let data = ref("Loading...")

getPersonFileCall.then(d => data.value = d);
</script>

<template>
  <div>User {{ $route.params.id }}</div>
  <pre>{{ data }}</pre>
</template>

