export class XorShift {
  static until: number = 4294967296;

  ns: Uint32Array;

  constructor(seed: number = 88675123) {
    this.ns = new Uint32Array(4);
    this.ns[0] = 123456789;
    this.ns[1] = 362436069;
    this.ns[2] = 521288629;
    this.ns[3] = seed;
  }

  // XorShift
  next() {
    const e = this.ns[0] ^ (this.ns[0] << 11);
    this.ns[0] = this.ns[1];
    this.ns[1] = this.ns[2];
    this.ns[2] = this.ns[3];
    this.ns[3] = this.ns[3] ^ (this.ns[3] >>> 19) ^ (e ^ (e >>> 8));
    return this.ns[3];
  }

  nextUnit() {
    return this.next() / XorShift.until;
  }

  nextBetween(since: number, until: number) {
    return this.nextUnit() * (until - since) + since;
  }

  lottery = <A>(they: A[]): A => they[this.nextUnit() * they.length]!;

  shuffle = <A>(they: A[]): A[] =>
    they
      .map((it) => ({ it, value: this.nextUnit() }))
      .sort((a, b) => a.value - b.value)
      .map(({ it }) => it);
}
