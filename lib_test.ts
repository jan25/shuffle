import { assert, assertNotEquals, assertEquals } from "https://deno.land/std@0.71.0/testing/asserts.ts";

import { shuffle } from "./lib.ts";

Deno.test("Test shuffle", () => {
    const input = [1, 2, 3, 4, 1, 2, 3, 4];
    const result = shuffle(input);
    console.log(result);
    
    assertEquals(input.length, result.length,
        `Input and output list must have same length. got=${result} expected list of length ${input.length}`);

    // TODO Check that all elements in input and present in result

    assertNotEquals(input, result,
        "You got lucky!. The shuffled and input list shouldnt be same.");
});
