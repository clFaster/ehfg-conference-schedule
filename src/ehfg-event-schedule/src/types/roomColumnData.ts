import { Session } from "./session";

export interface RoomColumnData {
  location: string;
  current: Session | null;
  upcoming: Session | null;
  sortTime: number; // earliest current start or upcoming start
}
