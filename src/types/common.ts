export interface Imaginable<L extends string = string> {
  label: L;
}

export interface Image<V extends string = string, L extends string = string> extends Imaginable<L> {
  value: V;
}

export type StepInformation = {
  currentStep: number,
  maxSteps: number
}

/**
 * This function must be used as a decorator to be able to add interfaces to the static classes
 */
export function StaticImplements<T>() {
  return <U extends T>(constructor: U) => {constructor;};
}

export type EventHandler = () => void;
