import { assert, assertNotEquals, assertEquals } from "https://deno.land/std@0.71.0/testing/asserts.ts";

import { shuffle } from "./lib.ts";

Deno.test("Test shuffle numbers", () => {
    const input = [1, 2, 3, 4, 1, 2, 3, 4];
    const result = shuffle(input);
    
    assertEquals(input.length, result.length,
        `Input and output list must have same length. got=${result} but expected list of length ${input.length}`);
    assertNotEquals(input, result,
        "You got lucky!. The shuffled and input list shouldnt be same.");

    input.sort();
    result.sort();
    assertEquals(input, result,
        'Input and result must have same elements.');
});

Deno.test("Test shuffle objects", () => {
    interface Track {
        artist: string
        track: number
    };

    const grouper = (element: Track) => element.artist;

    const input = new Array<Track>();
    const generateData = (input: Array<Track>, artist: string, countFn: (c: number) => number) => {
        for (let count = 0; count < 10; ++count) {
            input.push({
                artist: artist,
                track: countFn(count),
            })
        }
    }
    generateData(input, 'A', (c) => c);
    generateData(input, 'B', (c) => c * 2);
    generateData(input, 'C', (c) => c + 2);

    const result = shuffle(input, grouper);

    assertEquals(input.length, result.length,
        'Input and result must be of same length');
    assertNotEquals(input, result,
        "You got lucky!. The shuffled and input list shouldnt be same.");

    input.sort();
    result.sort((a, b) => {
        if (a.artist == b.artist) return a.track - b.track;
        return a.artist <= b.artist ? -1 : 1;
    });
    assertEquals(input, result,
        'Input and result must have same elements.');
});
