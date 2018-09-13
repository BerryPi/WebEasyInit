// The array of party members. Each has a name and initiative bonus.
var party = []
// The array of enemies
var enemies = []

// Grabbing the HTML entities so it does not have to be done each time
var partyTable = document.getElementById("party");
var enemyTable = document.getElementById("enemies")

// Adds a member and their initiative bonus to the list of party members
function addPartyMember() {
	// Save the member's name and initiative bonus
	var name = document.getElementById("partyNameBox").value;
	var initBonus = document.getElementById("partyInitBox").value;
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
	// Save the input
	var name = document.getElementById("enemyNameBox").value;
	var initBonus = document.getElementById("enemyInitBox").value;
	var enemyQty = document.getElementById("enemyQtyBox").value;
	var enemyType = {name: name, initBonus: initBonus, qty: enemyQty};
	enemies.push(enemyType);
	// Displaying the new data in the table
	var newRow = enemyTable.insertRow(enemies.length);
	newRow.insertCell().innerText = name;
	newRow.insertCell().innerText = initBonus;
	newRow.insertCell().innerText = enemyQty;
	// Adding the button to remove the enemy. The index needs to be worked out here to prevent scoping issues.
	var enemyIndex = enemies.length - 1;
	var removeButtonCell = newRow.insertCell();
	removeButtonCell.innerHTML = "<input type=\"button\" value=\"X\">";
	removeButtonCell.getElementsByTagName("input")[0].onclick = function() {removeFromTable(enemyTable, enemies, enemyType);};
	// Go back to the first text box for easier adding
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