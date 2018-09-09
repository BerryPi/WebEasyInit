// The array of party members. Each has a name and initiative bonus.
var party = []
// The array of enemies

// Grabbing the HTML entities so it does not have to be done each time
var partyTable = document.getElementById('party');

// Adds a member and their initiative bonus to the list of party members
function addPartyMember() {
	// Save the member's name and initiative bonus
	var name = document.getElementById('partyNameBox').value;
	var initBonus = document.getElementById('partyInitBox').value;
	party.push({name: name, initBonus: initBonus})
	// Adding the data to the table just before the text fields
	var newRow = partyTable.insertRow(party.length);
	newRow.insertCell().innerText = name;
	newRow.insertCell().innerText = initBonus;
}