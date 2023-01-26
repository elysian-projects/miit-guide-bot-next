/** Given type is maybe promise or a value */
export type MaybePromise<T> = T | Promise<T>;

/** Type is either a value or a function that returns the given value */
export type ValueOrGetValue<T> = T | (() => T);

export type EventHandler = () => void;
