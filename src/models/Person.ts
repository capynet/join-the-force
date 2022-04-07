export default interface Person {
    id: string,
    name: string,
    url: string,
    homeworld: { name: string, terrain: string },
    films: { title: string }[],
    vehicles: { name: string }[],
    starships: { name: string }[],
    species: { name: string }[],
    birth_year: string,
    gender: string,

}