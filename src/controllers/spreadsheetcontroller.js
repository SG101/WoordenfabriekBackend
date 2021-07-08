import { googleSheet } from '../models/spreadsheet';

/*
* model notes:
* 'columns[x].type' value is used to identify how to interpret the data in that column.
	e.g: when type == 'list' the data in that column should be interpreted as a comma-separated list.
		when type == 'options' the possible items should be limited to the values of another item 'options'.
		when type == 'number' the column should be interpreted as numbers
		when type == 'undefined' the type 'string' is assumed
* 'columns[x].charLimit' value is only used when type == 'string' for limiting the number of characters in a cell
* 'columns[x].maxNum' and 'columns[x].minNum' are used to limit the value of a value of type 'number'
	both are inclusive limiters
* columns[x].validator is a function called with as argument the contents of a cell.
	This function should return a boolean showing wether or not the given input is valid.
	This function is in addition to the available validator variables.
*/

var templateModel = [
	{
		sheet: "Levels",
		columns: [
			{ name: "LevelID", column: "A", type: "number" },
			{ name: "Titel", column: "B", type: "string" },
			{ name: "Subtitel", column: "C", type: "string" },
			{ name: "Timer", column: "D", type: "bool" },
			{ name: "Evaluatie", column: "E", type: "bool" }
		]
	},
	{
		sheet: "Challenges",
		columns: [
			{ name: "ChallengeID", column: "A", type: "number" },
			{ name: "Challenge Soort ID", column: "B", type: "options", options: ["C01", "K01", "K02", "I01", "V01"] },
			{ name: "Beschrijving", column: "C", type: "string" },
			{ name: "Titel", column: "D", type: "string" },
			{ name: "Subtitel", column: "E", type: "string" },
			{ name: "Minimum aantal vragen", column: "F", type: "number", minNum: 0 }
		]
	}
];

export const RadbUploadModel = new googleSheet("", {}, templateModel);