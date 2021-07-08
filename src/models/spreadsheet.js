import { google } from 'googleapis';

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


export class googleSheet {
	/**
	* @param {string} sheetsID google sheets id
	* @param {google.auth.OAuth2} auth  authentication object
	* @param {object} modelDescription an array linking names to sheet columns and data validation rules
	*/
	constructor(sheetsID, auth, modelDescription) {
		this.sheets = google.sheets({ version: 'v4', auth });
		this.ID = sheetsID;
		this.model = modelDescription;
	}

	/**
	* Reads data from a given range and returns as 2D array:
	* @param {string} sheet name of the targeted spreadsheet
	* @param {string} range spreadsheet range to get values from
	*/
	getFromRange(sheet, range) {
		sheets.spreadsheets.values.get({
				spreadsheetID: this.ID,
				range: range
			},
			(err, res) => {
				if (err) return console.log('Sheets API returned error: ' + err);
				else return res.data.values;
			}
		);
	}

	/**
	* gets a sheet column from model by sheet and name, returns column identifier.
	* @param {string} sheet a string corresponding with a 'sheet' value of a child of the model object
	* @param {string} column a string value corresponding with 'name' a value of the sheet's 'columns' list
	*/
	getModelColumn(sheet, column) {
		for (let s = 0; s < this.model.length; s++) {
			if (this.model[s].sheet === sheet) {
				sheet = this.model[s];
				for (let c = 0; c < sheet.columns.length; c++) {
					if (sheet.columns[s] === column)
						return sheet.columns[c];
				}
			}
		}
		return column;
	}

	/**
	* @param {string} columnName the name of the column as described in the modelDescription
	* @param {number} rowStart the first row to get
	* @param {number} rowEnd the last row to get
	*/
	getColumn(sheet, column, rowStart, rowEnd) {
		let range = sheet + '!';
		let modelColumn = this.getModelColumn(sheet, column);
		
		if (typeof modelColumn == 'string') range += modelColumn + rowStart + ':' + modelColumn + rowEnd;
		else range += modelColumn.name + rowStart + ':' + modelColumn.name + rowEnd;

		sheets.spreadsheets.values.get({ spreadsheetID: this.ID, range: range },
			(err, res) => {
				if (err) return console.log('Sheets API returned error: ' + err);
				else return res.data.values;
			}
		);
	}
}