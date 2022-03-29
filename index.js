#!/usr/bin/env node

import fs from "node:fs";
import { execSync } from "node:child_process";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";


/**
 * Function for sleeping the application for a certain amount of time (in milliseconds).
 * Default is 2000 milliseconds.
 * @param {number} milliseconds - The number of milliseconds to sleep. 
 * @returns {Promise} A promise that resolves after the specified number of milliseconds.
 */
function sleep(ms = 2000) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Function for checking the chosen entry and exiting the application if the user selected "Exit.".
 * @param {string} entry - The entry that the user selected.
 * @returns {bool} false if the user doesn't want to exit, otherwise expect the process to exit.
 */
function checkExit(entry) {
	if (entry !== "Exit") {
		return false;
	}
	process.exit(1);
}

/**
 * Function for creating a new project.
 * @param {string} projectName - The name of the project.
 * @param {bool} useGit - Whether or not to use Git.
 * @param {bool} useNode - Whether or not to use Node.
 */
function createProject(projectName, useGit, useNode) {
	console.log("\nCreating project " + chalk.blue(projectName ) + "...");
	fs.mkdirSync(projectName);
	process.chdir(projectName);

	if (useGit) {
		execSync("git init");
	}
	if (useNode) {
		execSync("npm init -y");
	}

	sleep(500);
}

/**
 * Function for displaying the header.
 * @returns {Promise} A promise that resolves after the header is displayed.
 */
async function header() {
	const title = chalkAnimation.rainbow("\nWelcome to NEC - the Node Ecosystem CLI!\n");

	await sleep();
	title.stop();
	console.clear();
}

/**
 * Main function for the application.
 * @returns {Promise} A promise that resolves after the application is finished.
 */
async function main() {
	await header();

	const questions = [
		{
			type: "list",
			name: "entry",
			message: "What do you want to do?",
			choices: [
				"Create a new project",
				"Exit"
			]
		},
		{
			type: "input",
			name: "projectName",
			message: "What is the name of your project?",
			when: answers => answers.entry === "Create a new project",
			validate: projectName => {
				if (!projectName.length) {
					return "Please enter a project name.";
				}

				if (fs.existsSync(projectName)) {
					return "A project with that name already exists.";
				}

				return true;
			}
		},
		{
			type: "confirm",
			name: "useGit",
			message: "Do you want to use Git?",
			when: answers => answers.entry === "Create a new project",
			default: true
		},
		{
			type: "confirm",
			name: "useNode",
			message: "Do you want to use Node?",
			when: answers => answers.entry === "Create a new project",
			default: true
		},
	];

	const answers = await inquirer.prompt(questions);
	checkExit(answers.entry);

	createProject(answers.projectName, answers.useGit, answers.useNode);
}

console.clear();
await main();