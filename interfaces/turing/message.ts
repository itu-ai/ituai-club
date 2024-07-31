import { Agent } from "./agent";

export interface Message {
  agent: Agent;
  content: string;
  createdAt: Date;
}
