import { Speaker } from "./speaker";

export interface Session {
  eventname: string;
  subtitle?: string;
  eventshortid: string;
  date: string; // YYYY-MM-DD
  start: string; // HH:MM
  end: string; // HH:MM
  location: string;
  headline?: string;
  description: string;
  eventcategory: string;
  speakers?: Speaker[];
}
