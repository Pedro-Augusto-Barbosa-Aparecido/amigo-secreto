import { People } from "./types";

export function sorter (people: People[]): Array<People> {
    for (var i = people.length- 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = people[i];
        people[i] = people[j];
        people[j] = temp;

    }

    return people;

}
