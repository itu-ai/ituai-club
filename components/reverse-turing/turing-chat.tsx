"use client";

import { useEffect, useState } from "react";

import { Message } from "@/interfaces/turing/message";
import { Agent } from "@/interfaces/turing/agent";
import { Character } from "@/interfaces/turing/character";
import { AgentGuess } from "@/interfaces/turing/agent-guess";
import { characters } from "@/app/turing/reverse/characters";

import { ApiService } from "@/services/api";

/*
This is the main component for the Reverse Turing Test.
There will be a chat and 2 AI models.
ChatGPT and Gemini.
In the start, everybody will get a random role. Like an person from history like Alan Turing.
Every turn there will be an question; and GPT, Gemini and the user will answer it according to their character.
This could be like, in which century and country you were born and lived.
After 5 turns, the AI models will guess who is the human, and human will guess which AI model is which.
If the AI models guess the human, the user looses.
Guessing the AI models correctly is not too much necessary, it's just for fun.
*/

interface Props  {
	human_character: Character;
	onTestFinished: (agent_guesses: AgentGuess[]) => void;
}

export const TuringChat: React.FC<Props> = ({ human_character, onTestFinished }) => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState("");
	const [agents, setAgents] = useState<Agent[]>([]);
	const [turn, setTurn] = useState(0);

	// Constants
	const MAX_TURNS = 10;

	const assignAgents = () => {
		const human_agent: Agent = {
			origin: "Human",
			name: human_character.name,
		};
		// select random characters for AI agents
		const randomAgents: Agent[] = [];
		const randomCharacters = characters.filter(character => character !== human_character);
		randomCharacters.sort(() => Math.random() - 0.5);
		randomAgents.push({
			origin: "ChatGPT",
			name: randomCharacters[0].name,
		});
		randomAgents.push({
			origin: "Gemini",
			name: randomCharacters[1].name,
		});
		randomAgents.push(human_agent);
		randomAgents.sort(() => Math.random() - 0.5);
		setAgents(randomAgents);
	}

	const handleTurn = async () => {
		if (turn >= MAX_TURNS) return;
		const currentAgent = agents[turn % agents.length];
		const otherAgents = agents.filter(agent => agent !== currentAgent);
		console.log(currentAgent);
		if (currentAgent.origin === "ChatGPT") {
			const response = await ApiService.sendGPTRequest(messages, currentAgent, otherAgents);
			console.log(response);
			setMessages(prevMessages => [...prevMessages, { agent: currentAgent, content: response.text, createdAt: new Date() }]);
		}
		else if (currentAgent.origin === "Gemini") {
			const response = await ApiService.sendGeminiRequest(messages, currentAgent, otherAgents);
			console.log(response);
			setMessages(prevMessages => [...prevMessages, { agent: currentAgent, content: response.text, createdAt: new Date() }]);
		}
		else if (currentAgent.origin === "Human") {
			return;
		}
		if (turn + 1 >= MAX_TURNS) {
			onFinished();
		}
		setTurn(prevTurn => prevTurn + 1);
	}

	const submitHumanMessage = () => {
		if (input === "") return;
		setMessages(prevMessages => [...prevMessages, { agent: agents[turn % agents.length], content: input, createdAt: new Date() }]);
		setInput("");
		if (turn + 1 >= MAX_TURNS) {

		}
		setTurn(prevTurn => prevTurn + 1);
	}

	const onFinished = async () => {
		const agent_guesses: AgentGuess[] = [];
		for (const agent of agents) {
			if (agent.origin !== "Human") {
				const other_agents = agents.filter(other_agent => other_agent !== agent);
				if (agent.origin === "ChatGPT") {
					const response = await ApiService.getGPTGuess(messages, agent, other_agents);
					agent_guesses.push({ agent, guess: response.text });
				}
				else if (agent.origin === "Gemini") {
					const response = await ApiService.getGeminiGuess(messages, agent, other_agents);
					agent_guesses.push({ agent, guess: response.text });
				}
			}
		}
		onTestFinished(agent_guesses);
	}

	useEffect(() => {
		assignAgents();
	}, []);

	useEffect(() => {
		if (agents.length > 0 && agents[turn % agents.length].origin !== "Human") {
				handleTurn();
		}
	}, [turn, agents]);


	return (
		<div className="flex flex-col items-center justify-center w-full h-full p-12">
			<div className="flex flex-col items-center justify-center w-full h-full">
				{/* Agents */}
				<div className="grid grid-cols-3 gap-x-4 mb-4">
					{agents.map((agent, index) => (
						<div key={index} className="flex flex-col items-center justify-center px-6 py-4 rounded-xl transition-all duration-400"
							style={{ backgroundColor: agents[turn % agents.length] === agent ? "rgb(40, 40, 40)" : "rgb(10, 10, 10)" }}
						>
							<p className="text-lg text-zinc-100">
								{agent.name === human_character.name ? `${agent.name} (You)` : agent.name}
							</p>
						</div>
					))}
				</div>
				{/* Chat */}
				<div className="flex flex-col items-start justify-start w-full h-[34rem] p-4 border-2 border-zinc-800 bg-zinc-900 rounded-xl overflow-y-auto mb-6">
					{messages.map((message, index) => (
						<div key={index} className="flex flex-col items-start justify-start mb-4">
							<p className="text-sm text-zinc-400 text-start font-bold">{message.agent.name}</p>
							<p className="text-lg text-zinc-200 text-start">{message.content}</p>
						</div>
					))}
				</div>
				{/* Human Input */}
				<div className="flex items-center justify-center w-full gap-x-2">
					<textarea
						className="w-full h-24 bg-zinc-900 text-zinc-100 rounded-xl p-4 border-2 border-zinc-800 outline-none focus:outline-none"
						style={{ resize: "none" }}
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<button
						className="h-24 bg-zinc-900 text-zinc-400 border-2 border-zinc-800 rounded-xl px-6"
						onClick={submitHumanMessage}
					>
						Send
					</button>
				</div>
				</div>
    </div>
	);
};
