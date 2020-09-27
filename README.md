# Shuffle

Simple library that implements a shuffling algorithm based on [Spotify's blog post](https://engineering.atspotify.com/2014/02/28/how-to-shuffle-songs/).

It solves shuffling problem when there is no need for 'real' randomised shuffling. Imagine sorting a list of music tracks when we don't want tracks from same artist or same genre next to each other. This algorithm tries to logically group list items and distribute each group's items as uniformly as possible throughout the list.

## Make changes

Make sure to setup [Deno](https://deno.land/manual/introduction). Run changes against tests:

```bash
> deno test
```