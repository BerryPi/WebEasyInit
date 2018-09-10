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
	// Adding the button to remove the party member. The index needs to be worked out here to prevent scoping issues.
	var memberIndex = party.length - 1
	var removeButtonCell = newRow.insertCell();
	removeButtonCell.innerHTML = "<input type=\"button\" value=\"X\">";
	removeButtonCell.getElementsByTagName('input')[0].onclick = function() {removePartyMember(memberIndex);};
}

// Removes a member from the list of party members
function removePartyMember(index) {
	party.splice(index, 1);
	// The header occupies a row in the table.
	partyTable.deleteRow(index + 1);
	// Update the indices for the removal buttons. The final row has the text input boxes and has no removal button.
	for (var i = index + 1; i < partyTable.rows.length - 1 ; i++) {
		// The index of the row is 1 more than the index in the table due to the header row
		var listIndex = i - 1;
		var removeButton = partyTable.rows[i].cells[2].getElementsByTagName('input')[0];
		removeButton.onclick = function () {removePartyMember(listIndex);};
	}
}