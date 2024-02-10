export type CreatedEvent = {
  id: string;
  name: string;
  isstrict: boolean | null;
  rollcalls: {
    id: string;
    location: string;
    timestart: string;
    timeend: string;
  }[];
};
