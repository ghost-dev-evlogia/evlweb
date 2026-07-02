/* Day-cycle sky colors — single source for the SkyCycle client layer AND the
   build-time OG compositor (which must flatten the dawn sky behind the
   transparent scene rows). All colors from the Sprout Lands palette ramps. */

export type SkyStop = { top: [number, number, number]; bottom: [number, number, number] };

const hex = (h: string): [number, number, number] => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
];

/* dawn → morning → noon → afternoon → golden hour → dusk → night */
export const SKY_STOPS: SkyStop[] = [
  { top: hex("#cbe0de"), bottom: hex("#f3d8c5") }, // dawn
  { top: hex("#9bd4c3"), bottom: hex("#d6f1cd") }, // morning
  { top: hex("#8cbfc2"), bottom: hex("#cbe0de") }, // noon
  { top: hex("#9bd4c3"), bottom: hex("#e8eeaa") }, // afternoon
  { top: hex("#d79e61"), bottom: hex("#f3d8c5") }, // golden hour
  { top: hex("#766daa"), bottom: hex("#e8b5ac") }, // dusk
  { top: hex("#353738"), bottom: hex("#504086") }, // night
];
