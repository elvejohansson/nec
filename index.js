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

/**
 * Function for creating a new project.
 * @param {string} projectName - The name of the project.
 * @param {bool} useGit - Whether or not to use git.
 */
function createProject(projectName, useGit) {
	console.log("\nCreating project " + chalk.blue(projectName ) + "...");
	fs.mkdirSync(projectName);

	if (useGit) {
		process.chdir(projectName);
		execSync("git init");
	}

	sleep(500);
}

async function header() {
	const title = chalkAnimation.rainbow("\nWelcome to NEC - the Node Ecosystem CLI!\n");

	await sleep();
	title.stop();
	console.clear();

	inquirer
		.prompt([{
			type: "list",
			name: "entry",
			message: "What do you want to do?",
			choices: [
				"Create project",
				"Exit"
			]
		}, {
			type: "input",
			name: "projectName",
			message: "What is the name of your project?",
			when: answers => answers.entry === "Create project",
			validate: projectName => {
				if (projectName.length < 1) {
					return "Please enter a valid project name.";
				}
				if (fs.existsSync(projectName)) {
					return "A project with that name already exists.";
				}

				return true;
			}
		}, {
			type: "confirm",
			name: "useGit",
			message: "Do you want to use git?",
			default: "yes",
			when: answers => answers.entry === "Create project"
		}])
		.then(answers => {
			checkExit(answers.entry);

			if (answers.entry === "Create project") {
				createProject(answers.projectName, answers.useGit);
			}
		})
		.catch(err => {
			console.error(err);
		});
}

console.clear();
await header();