import type Homeworld from "@/models/Homeworld";
import type Films from "@/models/Films";
import type Vehicles from "@/models/Vehicles";
import type Starships from "@/models/Starships";
import type Species from "@/models/Species";

export default interface Person {
    id: string,
    name: string,
    url: string,
    homeworld: Homeworld | string,
    films: Films[] | string[],
    vehicles: Vehicles[] | string,
    starships: Starships[] | string,
    species: Species[] | string,
    birth_year: string,
    gender: string,

}