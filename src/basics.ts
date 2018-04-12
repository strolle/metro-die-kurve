export function composeR<A, B, C>(f: (a: A) => B, g: (b: B) => C): (a: A) => C {
  return x => g(f(x));
}

interface Chain<A, B> {
  readonly f: (x: A) => B;
  readonly then: <C>(k: (x: B) => C) => Chain<A, C>;
}

export function first<A, B>(f: (x: A) => B): Chain<A, B> {
  return {
    f,
    then: k => first(composeR(f, k))
  };
}

export function chain<A, B>(chain: Chain<A, B>): (x: A) => B {
  return chain.f;
}

type Predicate<T> = (x: T) => boolean;

export function assert<T>(requirement: Predicate<T>, msg?: string): (x: T) => T {
  return (x: T) => {
    if (requirement(x)) { return x; }
    throw new Error([
      `ASSERTION FAILURE`,
      `Value: ${typeof x === "string" ? JSON.stringify(x) : x}`,
      `Requirement: ${requirement.name || requirement.toString()}`,
      `Info: ${msg || "N/A"}`,
    ].join("\n"));
  };
}
