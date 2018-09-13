// The array of party members. Each has a name and initiative bonus.
var party = []
// The array of enemies. Each has a name and initiative bonus, as well as a quantity of the enemy to include in the encounter.
var enemies = []
// The array of characters in the current encounter, along with their total initiative.
var fighters = [];

// Grabbing the HTML entities so it does not have to be done each time
var partyTable = document.getElementById("party");
var enemyTable = document.getElementById("enemies")
var initiativeTable = document.getElementById("initiative");

// Adds a member and their initiative bonus to the list of party members
function addPartyMember() {
	// Save the member's name and initiative bonus
	var name = document.getElementById("partyNameBox").value;
	var initBonus = parseInt(document.getElementById("partyInitBox").value);
	var member = {name: name, initBonus: initBonus};
	party.push(member);
	// Adding the data to the table just before the text fields
	var newRow = partyTable.insertRow(party.length);
	newRow.insertCell().innerText = name;
	newRow.insertCell().innerText = initBonus;
	// Adding the button to remove the party member. The index needs to be worked out here to prevent scoping issues.
	var memberIndex = party.length - 1;
	var removeButtonCell = newRow.insertCell();
	removeButtonCell.innerHTML = "<input type=\"button\" value=\"X\">";
	removeButtonCell.getElementsByTagName("input")[0].onclick = function() {removeFromTable(partyTable, party, member);};
	// Go back to the first text box for easier adding
	document.getElementById("partyNameBox").focus();
}

function addEnemies() {
	// Save the input.
	var name = document.getElementById("enemyNameBox").value;
	var initBonus = parseInt(document.getElementById("enemyInitBox").value);
	var enemyQty = parseInt(document.getElementById("enemyQtyBox").value);
	var enemyType = {name: name, initBonus: initBonus, qty: enemyQty};
	enemies.push(enemyType);
	// Displaying the new data in the table.
	var newRow = enemyTable.insertRow(enemies.length);
	newRow.insertCell().innerText = name;
	newRow.insertCell().innerText = initBonus;
	newRow.insertCell().innerText = enemyQty;
	// Adding the button to remove the enemy. The index needs to be worked out here to prevent scoping issues.
	var enemyIndex = enemies.length - 1;
	var removeButtonCell = newRow.insertCell();
	removeButtonCell.innerHTML = "<input type=\"button\" value=\"X\">";
	removeButtonCell.getElementsByTagName("input")[0].onclick = function() {removeFromTable(enemyTable, enemies, enemyType);};
	// Go back to the first text box for easier addin
	document.getElementById("enemyNameBox").focus();
}

// Removes an element from one of the array-backed tables. It is an invariant of the add functions that the order of elements in the arrays matches the order of the rows in the table.
function removeFromTable(table, array, item) {
	// Find the item in the array
	var index = array.indexOf(item);
	array.splice(index, 1);
	// The header occupies a row in the table.
	table.deleteRow(index + 1);
}

// Returns a random integer between 1 and 20, inclusive.
function rollD20(){
	return Math.floor(Math.random() * 20) + 1;
}

// Generate the list of fighters and roll for initiative.
function rollInitiative(){
	fighters = [];
	// Roll for party members and add them to the array.
	for (var i = 0; i < party.length; i++) {
		var currMember = party[i];
		var currInitiative = rollD20() + currMember.initBonus;
		fighters.push({name: currMember.name, initiative: currInitiative});
	}
	// Roll for enemies and add them to the array.
	for (var i = 0; i < enemies.length; i++) {
		var enemyType = enemies[i];
		// j is used only for the names, which should not be 0-indexed.
		for (var j = 1; j <= enemyType.qty; j++) {
			var currEnemyName = enemyType.name + " #" + j;
			var currInitiative = rollD20() + enemyType.initBonus;
			fighters.push({name: currEnemyName, initiative: currInitiative})
		}
	}
	// Sort the array in order of decreasing initiative.
	fighters.sort(function(char1, char2) {return -(char1.initiative - char2.initiative);});
}

// Resets the initiative order table to allow generating a new order.
function resetInitiativeTable() {
	// Delete all rows except the header
	for (var i = initiativeTable.rows.length - 1; i > 0; i--) {
		initiativeTable.deleteRow(i);
	}
}

// Generates and displays the initiative order on the webpage.
function displayInitiativeOrder() {
	resetInitiativeTable();
	rollInitiative();
	for (var i = 0; i < fighters.length; i++) {
		var currFighter = fighters[i];
		var newInitTableRow = initiativeTable.insertRow();
		newInitTableRow.insertCell().innerText = currFighter.name;
		newInitTableRow.insertCell().innerText = currFighter.initiative;
	}
}
