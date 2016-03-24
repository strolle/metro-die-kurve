"use strict";

function GUIController(cfg) {

const CLASS_ACTIVE = "active";
const CLASS_HIDDEN = "hidden";

const config = cfg;
const lobby = byID("lobby");
const controls = byID("controls");
const scoreboard = byID("scoreboard");
const results = byID("results");
const konecHry = byID("KONEC_HRY");



// PRIVATE FUNCTIONS

function hideLobby() {
    log("Hiding lobby.");
    lobby.classList.add(CLASS_HIDDEN);
}

function showScoreOfPlayer(id) {
    var index = id - 1;
    if (scoreboard instanceof HTMLElement) {
        var scoreboardEntry = scoreboard.children[index];
        if (scoreboardEntry instanceof HTMLElement) {
            scoreboardEntry.classList.add("active");
        }
    }
    if (results instanceof HTMLElement) {
        var resultsEntry = results.children[index];
        if (resultsEntry instanceof HTMLElement) {
            resultsEntry.classList.add("active");
        }
    }
}


// PUBLIC API

function playerReady(id) {
	var index = id - 1;
	try {
		controls.children[index].children[1].classList.add(CLASS_ACTIVE);
	} catch (e) {
		console.error(e);
	}
}

function playerUnready(id) {
	var index = id - 1;
	try {
		controls.children[index].children[1].classList.remove(CLASS_ACTIVE);
	} catch (e) {
		console.error(e);
	}
}

function gameStarted() {
	hideLobby();
}

function initScoreOfPlayer(id) {
	updateScoreOfPlayer(id, 0);
	showScoreOfPlayer(id);
}

function updateScoreOfPlayer(id, newScore) {
    if (!(scoreboard instanceof HTMLElement)) {
        logError("Scoreboard HTML element could not be found.");
    } else if (!(results instanceof HTMLElement)) {
        logError("Results HTML element could not be found.");
    } else {
        let scoreboardItem = scoreboard.children[id-1];      // minus 1 necessary since player IDs are 1-indexed
        let resultsItem = results.children[id-1];            // minus 1 necessary since player IDs are 1-indexed
        let onesDigit = newScore % 10;                       // digit at the ones position (4 in 14)
        let tensDigit = (newScore - (newScore % 10)) / 10;   // digit at the tens position (1 in 14)

        // Scoreboard:
        if (scoreboardItem instanceof HTMLElement && scoreboardItem.children[0] instanceof HTMLElement && scoreboardItem.children[1] instanceof HTMLElement) {
            // The digit elements are ordered such that children[0] is ones, children[1] is tens, and so on.
            // First, we have to remove all digit classes:
            scoreboardItem.children[0].classList.remove("d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9");
            scoreboardItem.children[1].classList.remove("d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9");
            // Add appropriate classes to tens and ones position, respectively:
            scoreboardItem.children[0].classList.add("d"+tensDigit);
            scoreboardItem.children[1].classList.add("d"+onesDigit);
        } else {
            logError("Could not find HTML scoreboard entry for player "+id+".");
        }

        // Results:
        if (resultsItem instanceof HTMLElement && resultsItem.children[0] instanceof HTMLElement && resultsItem.children[1] instanceof HTMLElement) {
            resultsItem.children[0].classList.remove("d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9");
            resultsItem.children[1].classList.remove("d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9");
            resultsItem.children[0].classList.add("d"+tensDigit);
            resultsItem.children[1].classList.add("d"+onesDigit);
        } else {
            logError("Could not find HTML results entry for player "+id+".");
        }
    }
}

return {
	playerReady: playerReady,
	playerUnready: playerUnready,
	gameStarted: gameStarted,
	initScoreOfPlayer: initScoreOfPlayer,
	updateScoreOfPlayer: updateScoreOfPlayer
};

}