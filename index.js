#!/usr/bin/env node

import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";

const sleep = (ms = 2000) => new Promise(resolve => setTimeout(resolve, ms));

async function header() {
	const title = chalkAnimation.rainbow("\nWelcome to NEC - the Node Ecosystem CLI!\n");

	await sleep();
	title.stop();
	console.clear();

	inquirer
		.prompt({
			type: "list",
			name: "entry",
			message: "What do you want to do?",
			choices: [
				"Create project.",
				"Modify existing project.",
				"Exit."
			]
		})
		.then(answers => {
			console.log(answers);
		})
		.catch(err => {
			console.error(err);
		});
}

console.clear();
await header();