import chalkAnimation from "chalk-animation";

export {
	sleep,
	checkExit
};


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

	chalkAnimation.rainbow("\nExiting...\n");
	await sleep(1000);
	console.clear();
	process.exit(1);
}