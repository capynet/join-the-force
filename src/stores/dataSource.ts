import {defineStore} from 'pinia'
import type People from "@/models/People";
import type Person from "@/models/Person";
import {hydrateMany, hydrateOne} from "@/lib/Helpers";

const url = 'https://swapi.dev/api';

export const useDataSourceStore = defineStore({
    id: 'dataSource',
    state: () => ({
        people: {} as People,
        personFiles: [] as Person[],
        currentPage: '1',
        currSearchString: ''
    }),
    actions: {
        /**
         * Get people list.
         */
        async getPeople(page: string, searchString: string): Promise<People> {
            const personUrl = new URL(`${url}/people`);

            page = page.length ? page : this.currentPage;
            this.currentPage = page;
            personUrl.searchParams.append('page', page);

            searchString.length && personUrl.searchParams.append('search', searchString);
            this.currSearchString = searchString;

            this.people = await (await fetch(personUrl.toString())).json()

            // Some hydration.
            for (const item of this.people.results) {
                const chunks = item.url.split('/');
                item.id = chunks[chunks.length - 2];
            }

            // And some manipulation
            if (this.people.next !== null) {
                const nextUrl = new URL(this.people.next);
                this.people.nextId = nextUrl.searchParams.get('page') as string;
            }

            if (this.people.previous !== null) {
                const prevUrl = new URL(this.people.previous);
                this.people.prevId = prevUrl.searchParams.get('page') as string;
            }

            return this.people
        },

        /**
         * Get all details from a person.
         */
        async getPersonFile(id: string): Promise<Person> {
            // Check if this person data was previously stored to avoid calling the API.
            const found = this.personFiles.find(file => file.id === id)

            if (found) {
                return Promise.resolve(found);
            }

            const personFile = await (await fetch(`${url}/people/${id}`)).json()

            // We need an ID for referring it in the future or just for cache purposes.
            const urlChunks = personFile.url.split('/');
            personFile.id = urlChunks[urlChunks.length - 2];

            personFile.homeworld = await hydrateOne(personFile.homeworld);
            personFile.films = await hydrateMany(personFile.films);
            personFile.vehicles = await hydrateMany(personFile.vehicles);
            personFile.starships = await hydrateMany(personFile.starships);
            personFile.species = await hydrateMany(personFile.species);

            this.personFiles.push(personFile)
            return personFile;
        },

    }
})
