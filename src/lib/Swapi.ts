export default class Swapi {
    private url = 'https://swapi.dev/api';

    static endpoints = {
        'films': 'films',
        'people': 'people',
        'planets': 'planets',
        'species': 'species',
        'starships': 'starships',
        'vehicles': 'vehicles',
    };


    async get<T>(endpoint: string, params: { key: string; value: string }[] = []): Promise<T> {
        const UrlApi = new URL(`${this.url}/${endpoint}`);

        for (const param of params) {
            UrlApi.searchParams.append(param.key, param.value);
        }

        return await (await fetch(UrlApi.toString())).json();
    }
}

