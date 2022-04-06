import {defineStore} from 'pinia'
import type People from "@/models/People";
import type Person from "@/models/Person";

const url = 'https://swapi.dev/api/';

export const useDataSourceStore = defineStore({
    id: 'dataSource',
    state: () => ({
        people: {} as People,
        personFiles: [] as Person[],
    }),
    actions: {
        async getPeople(): Promise<People> {
            // Prevent calling the API all the time caching the results.
            if (Object.keys(this.people).length === 0) {
                this.people = await (await fetch(`${url}/people`)).json()
            }

            // Some hydration.
            for (const item of this.people.results) {
                const chunks = item.url.split('/');
                item.id = chunks[chunks.length - 2];
            }

            return this.people
        },

        /**
         * Get all details from a person.
         * @param id
         */
        async getPersonFile(id: string) {
            // Check if this person data was previously stored to avoid calling the API
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
