import {defineStore} from 'pinia'
import type People from "@/models/People";
import type Person from "@/models/Person";
import {hydrateMany, hydrateOne} from "@/lib/Helpers";
import Swapi from "@/lib/Swapi";
import type Homeworld from "@/models/Homeworld";
import type Films from "@/models/Films";
import type Vehicles from "@/models/Vehicles";
import type Starships from "@/models/Starships";
import type Species from "@/models/Species";

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
            const api = new Swapi();
            const params = [];

            page = page.length ? page : this.currentPage;
            this.currentPage = page;
            params.push({key: 'page', value: page});

            searchString.length && params.push({key: 'search', value: searchString});
            this.currSearchString = searchString;

            this.people = await api.get<People>(Swapi.endpoints.people, params);

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

            const api = new Swapi();
            const personFile = await api.get<Person>(`${Swapi.endpoints.people}/${id}`);

            // We need an ID for referring it in the future or just for cache purposes.
            const urlChunks = personFile.url.split('/');
            personFile.id = urlChunks[urlChunks.length - 2];

            personFile.homeworld = await hydrateOne<Homeworld>(personFile.homeworld as string);
            personFile.films = await hydrateMany<Films>(personFile.films as []);
            personFile.vehicles = await hydrateMany<Vehicles>(personFile.vehicles as []);
            personFile.starships = await hydrateMany<Starships>(personFile.starships as []);
            personFile.species = await hydrateMany<Species>(personFile.species as []);

            this.personFiles.push(personFile)
            return personFile;
        },

    }
})
