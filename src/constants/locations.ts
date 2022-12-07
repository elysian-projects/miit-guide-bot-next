import { locations } from "@/env";

export const locationValues: string[] = Object.values(locations).map(location => location.value);
export const locationLabels: string[] = Object.values(locations).map(location => location.label);
