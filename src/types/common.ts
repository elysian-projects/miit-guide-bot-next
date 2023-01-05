export type LocationValueProp = string;
export type LocationLabelProp = string;

export interface Imaginable<L extends string = string> {
  label: L;
}

export interface Image<V extends string = string, L extends string = string> extends Imaginable<L> {
  value: V;
}

export type Representable<K extends string | number | symbol, V> = {
  [key in K]: V
}
