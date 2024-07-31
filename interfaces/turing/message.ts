import { Agent } from "./agent";

export interface Message {
  id?: number;
  agent: Agent;
  content: string;
  createdAt: Date;
}
