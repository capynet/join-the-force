import {defineStore} from 'pinia'
import type People from "@/models/People";
import type Person from "@/models/Person";

const url = 'https://swapi.dev/api/';

export const useDataSourceStore = defineStore({
    id: 'dataSource',
    state: () => ({
        people: {} as People,
        personFiles: [] as Person[],
        currentPage: 1
    }),
    actions: {
        async getPeople(page: number): Promise<People> {
            this.people = await (await fetch(`${url}/people/?page=${page}`)).json()

            // Some hydration.
            for (const item of this.people.results) {
                const chunks = item.url.split('/');
                item.id = chunks[chunks.length - 2];
            }

            // And some manipulation
            if (this.people.next !== null) {
                this.people.nextId = parseInt(this.people.next[this.people.next.length - 1], 10);
            }

            if (this.people.previous !== null) {
                this.people.prevId = parseInt(this.people.previous[this.people.previous.length - 1], 10);
            }

            this.currentPage = page;

            return this.people
        },

        /**
         * Get all details from a person.
         * @param id
         */
        async getPersonFile(id: string) {
            // Check if this person data was previously stored to avoid calling the API.
            const found = this.personFiles.find(file => file.id === id)

            if (found) {
                return Promise.resolve(found);
            }

            const personFile = await (await fetch(`${url}/people/${id}`)).json()

            console.log(personFile);
            // Some hydration.
            for (const prop in personFile) {
                const chunks = personFile['url'].split('/');
                personFile['id'] = chunks[chunks.length - 2];
            }

            this.personFiles.push(personFile)
            return personFile;
        },
    }
})
