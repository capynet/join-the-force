<script setup lang="ts">
import {useDataSourceStore} from '@/stores/dataSource'
import {ref} from "vue";
import type Person from "@/models/Person";
import type Homeworld from "@/models/Homeworld";
import type Films from "@/models/Films";
import type Species from "@/models/Species";
import type Starships from "@/models/Starships";
import type Vehicles from "@/models/Vehicles";

const props = defineProps<{
  personId: string
}>()

const store = useDataSourceStore();
const getPersonFileCall = store.getPersonFile(props.personId);
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
  const homeworld = person.homeworld as Homeworld;
  const filmsObj = person.films as Films[];
  const speciesObj = person.species as Species[];
  const vehiclesObj = person.vehicles as Vehicles[];
  const starchipsObj = person.starships as Starships[];

  name.value = person.name;
  birthYear.value = person.birth_year;
  gender.value = person.gender;
  homeworldName.value = homeworld.name;
  homeworldTerrain.value = homeworld.terrain;
  films.value = filmsObj.length ? filmsObj.map(film => film.title) : '-';
  species.value = speciesObj.length ? speciesObj.map(specie => specie.name) : '-';
  vehicles.value = vehiclesObj.length ? vehiclesObj.map(vehicle => vehicle.name) : '-';
  starships.value = starchipsObj.length ? starchipsObj.map(starship => starship.name) : '-';

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
          <li v-for="film in films" :key="film">{{ film }}</li>
        </ul>
        <template v-else>{{ films }}</template>
      </td>
    </tr>

    <tr>
      <td>Species</td>
      <td>
        <ul v-if="Array.isArray(species)">
          <li v-for="specie in species" :key="specie">{{ specie }}</li>
        </ul>
        <template v-else>{{ species }}</template>
      </td>
    </tr>

    <tr>
      <td>Vehicles</td>
      <td>
        <ul v-if="Array.isArray(vehicles)">
          <li v-for="vehicle in vehicles" :key="vehicle">{{ vehicle }}</li>
        </ul>
        <template v-else>{{ vehicles }}</template>
      </td>
    </tr>

    <tr>
      <td>Starships</td>
      <td>
        <ul v-if="Array.isArray(starships)">
          <li v-for="starship in starships" :key="starship">{{ starship }}</li>
        </ul>
        <template v-else>{{ starships }}</template>
      </td>
    </tr>

    </tbody>

  </table>
</template>