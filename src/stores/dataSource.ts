import {defineStore} from 'pinia'

const url = 'https://swapi.dev/api/';

interface Swapi {
    count: number,
    results: []
}

export const useDataSourceStore = defineStore({
    id: 'dataSource',
    state: () => ({
        people: {} as Swapi
    }),
    actions: {
        async getPeople() {
            // Prevent calling the API all the time caching the results.
            if (Object.keys(this.people).length === 0) {
                this.people = await (await fetch(`${url}/people`)).json()
            }

            return this.people
        },

        async getHomeWorld() {
            // Prevent calling the API all the time caching the results.
            if (Object.keys(this.people).length === 0) {
                this.people = await (await fetch(`${url}/world`)).json()
            }

            return this.people
        },
    }
})
