import type Person from "@/models/Person";

export default interface People {
    count: number,
    results: Person[]
    next: string
    previous: string
    nextId: string
    prevId: string
}
