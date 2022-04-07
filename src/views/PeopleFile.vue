<script setup lang="ts">
import {useRoute} from 'vue-router'
import {useDataSourceStore} from '@/stores/dataSource'
import {ref} from "vue";
import type Person from "@/models/Person";

const route = useRoute()
const store = useDataSourceStore();
const getPersonFileCall = store.getPersonFile(route.params.id as string);
let person: Person;
const loading = "Loading...";

let name = ref(loading)
let birthYear = ref(loading)
let gender = ref(loading)
let homeworldName = ref(loading)
let homeworldTerrain = ref(loading)
let films = ref<string[] | string>(loading)
let species = ref<string[] | string>(loading)
let vehicles = ref<string[] | string>(loading)
let starships = ref<string[] | string>(loading)

getPersonFileCall.then(data => {
  const person: Person = data;
  name.value = person.name;
  birthYear.value = person.birth_year;
  gender.value = person.gender;
  homeworldName.value = person.homeworld.name;
  homeworldTerrain.value = person.homeworld.terrain;
  films.value = person.films.length ? person.films.map(film => film.title) : '-';
  species.value = person.species.length ? person.species.map(specie => specie.name) : '-';
  vehicles.value = person.vehicles.length ? person.vehicles.map(vehicle => vehicle.name) : '-';
  starships.value = person.starships.length ? person.starships.map(starship => starship.name) : '-';

  // For you my interviewer ;)
  console.log(person);
});
</script>

<template>
  <table>

    <tbody>

    <tr>
      <td>Name</td>
      <td>{{ name }}</td>
    </tr>

    <tr>
      <td>BirthYear</td>
      <td>{{ birthYear }}</td>
    </tr>

    <tr>
      <td>Gender</td>
      <td>{{ gender }}</td>
    </tr>

    <tr>
      <td>Home world</td>
      <td>{{ homeworldName }} (Terrain: {{ homeworldTerrain }})</td>
    </tr>

    <tr>
      <td>Films</td>
      <td>
        <ul v-if="Array.isArray(films)">
          <li v-for="film in films">{{ film }}</li>
        </ul>
        <template v-else>{{ films }}</template>
      </td>
    </tr>

    <tr>
      <td>Species</td>
      <td>
        <ul v-if="Array.isArray(species)">
          <li v-for="specie in species">{{ specie }}</li>
        </ul>
        <template v-else>{{ species }}</template>
      </td>
    </tr>

    <tr>
      <td>Vehicles</td>
      <td>
        <ul v-if="Array.isArray(vehicles)">
          <li v-for="vehicle in vehicles">{{ vehicle }}</li>
        </ul>
        <template v-else>{{ vehicles }}</template>
      </td>
    </tr>

    <tr>
      <td>Starships</td>
      <td>
        <ul v-if="Array.isArray(starships)">
          <li v-for="starship in starships">{{ starship }}</li>
        </ul>
        <template v-else>{{ starships }}</template>
      </td>
    </tr>

    </tbody>

  </table>
</template>
