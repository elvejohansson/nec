#!/usr/bin/env node

import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";

const sleep = (ms = 2000) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Function for checking the chosen entry and exiting the application if the user selected "Exit.".
 * @param {string} entry - The entry that the user selected.
 * @returns {bool} false if the user doesn't want to exit, otherwise expect the process to exit.
 */
async function checkExit(entry) {
	if (entry !== "Exit") {
		return false;
	}
	
	console.log("\nExiting...");
	sleep(250)
		.then(() => process.exit(1))
		.catch(err => console.error(err));
	return true;
}

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
				"Create project",
				"Modify existing project",
				"Exit"
			]
		})
		.then(answers => {
			checkExit(answers.entry);
		})
		.catch(err => {
			console.error(err);
		});
}

console.clear();
await header();