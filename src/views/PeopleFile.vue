<script setup lang="ts">
import PersonFile from "@/components/PersonFile.vue";
</script>

<template>
  <PersonFile :personId="$route.params.id.toString()"/>
</template>
