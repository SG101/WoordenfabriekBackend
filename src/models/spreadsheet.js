import { google } from 'googleapis';

export class googleSheet {
	/**
	* @param {string} sheetsID google sheets id
	* @param {google.auth.OAuth2} auth  authentication object
	* @param {Object} modelDescription an array linking names to sheet columns and data validation rules
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
	* @returns {[]}
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
	* @returns {[]}
	*/
	getModelColumn(sheet, column) {
		for (let s = 0; s < this.model.length; s++) {
			if (this.model[s].sheet === sheet) {
				sheet = this.model[s];
				for (let c = 0; c < sheet.columns.length; c++) {
					if (sheet.columns[c].name === column) {
						return sheet.columns[c];
					}
				}
			}
		}
		return undefined;
	}

	/**
	* @param {string} columnName the name of the column as described in the modelDescription or the direct column identifier
	* @param {number} rowStart the first row to get
	* @param {number} rowEnd the last row to get
	*/
	getColumn(sheet, column, rowStart, rowEnd) {
		let range = sheet + '!';
		let modelColumn = this.getModelColumn(sheet, column);
		
		if (modelColumn == undefined) {
			range += column + rowStart + ':' + column + rowEnd;
		} else {
			range += modelColumn.column + rowStart + ':' + modelColumn.column + rowEnd;
		}

		console.log(range);
		sheets.spreadsheets.values.get({ spreadsheetID: this.ID, range: range },
			(err, res) => {
				if (err) return console.log('Google sheets API returned error: ' + err);
				else return res.data.values;
				if (modelColumn != undefined) {
					modelColumn.
				}
			}
		);
	}
}