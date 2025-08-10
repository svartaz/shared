export const chunks = <A>(things: A[], length: number): A[][] =>
  things.length <= length
    ? [things]
    : [things.slice(0, length), ...chunks(things.slice(length), length)];

export const chooseRandom = <A>(things: A[]): A =>
  things[Math.random() * things.length]!;

export const shuffle = <A>(things: A[]): A[] =>
  things
    .map((it) => ({ it, value: Math.random() }))
    .sort((a, b) => a.value - b.value)
    .map(({ it }) => it);
