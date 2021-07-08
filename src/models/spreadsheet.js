import { google } from 'googleapis';

/*/
 *	sheet model description:
 *		{ [{ sheet, columns: [{ name, column, type?, options?, minNum?, maxNum?}] }] }
 *	single column:
 *		{ name, column, type?, options?, minNum?, maxNum?}
/*/

export class googleSheet {
	/**
	* @param {string} sheetsID google sheets id.
	* @param {google.auth.OAuth2} auth OAuth2 authentication object.
	* @param {[{sheet, columns:[{name, column, type?, options?, minNum?, maxNum?}]}]} modelDescription an array linking names to sheet columns and data validation rules.
	*/
	constructor(sheetsID, auth, modelDescription) {
		this.sheets = google.sheets({ version: 'v4', auth });
		this.ID = sheetsID;
		this.model = modelDescription;
	}

	/**
	* gets a sheet column from model by sheet and name, returns column identifier.
	* @param {string} sheet a string corresponding with a 'sheet' value of a child of the model object
	* @param {string} column a string value corresponding with 'name' a value of the sheet's 'columns' list
	* @returns {[string]} all data in the given column
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
	 * validates cell according to default validation settings and a call to validateCell.
	 * @param {string} cellData the raw data from the cell.
	 * @param {{name, column, type?, options?, minNum?, maxNum?}} columnDescription the column description object from the model.
	 * @returns {boolean} true if the given cell data passes all validation tests
	 */
	validateCell(cellData, columnDescription) {
		if (columnDescription.validateCell != undefined) {
			if(!columnDescription.validateCell(cellData)) return false;
		}

		if (columnDescription.type == undefined) {
			return true;
		} else if (columnDescription.type === 'string') {
			if (typeof columnDescription.charLimit == 'number'
				&& cellData.length <= columnDescription.charLimit) {
				return false;
			}
		} else if (columnDescription.type === 'number') {
			if (parseInt(cellData) == NaN) {
				return false;
			} else if (typeof columnDescription.maxNum != undefined
				&& parseInt(cellData) > maxNum) {
				return false;
			} else if (typeof columnDescription.minNum != undefined
				&& parseInt(cellData) < minNum) {
				return false;
			}
		} else if (columnDescription.type === 'options') {
			if (columnDescription.options != undefined) {
				let foundMatch = false;
				for (let i = 0; i < columnDescription.options; i++)
					if (cellData == columnDescription.options[i])
						foundMatch = true;
				if (!foundMatch) return false;
			}
		}
		return true;
	}

	/**
	* gets a column from given sheet with data validation and sheet.
	* @param {string} sheetName the name of the sheet to get from.
	* @param {string} columnName the name of the column as described in the modelDescription or the direct column identifier.
	* @param {int} rowStart the first row to get.
	* @param {int} rowEnd the last row to get.
	*/
	getColumn(sheetName, columnIdentifier, rowStart, rowEnd) {
		let range = sheetName + '!';
		let modelColumn = this.getModelColumn(sheetName, columnIdentifier);
		
		if (modelColumn == undefined) {
			range += columnIdentifier + rowStart + ':' + columnIdentifier + rowEnd;
		} else {
			range += modelColumn.column + rowStart + ':' + modelColumn.column + rowEnd;
		}

		console.log(range);
		this.sheets.spreadsheets.values.get({ spreadsheetID: this.ID, range: range },
			(err, res) => {
				if (err) {
					return console.log('Google sheets API returned error: ' + err);
				}
				else {
					if (modelColumn != undefined)
						for (let i = 0; i < res.data.values.length; i++)
							this.validate(res.data.values[i], modelColumn);
					return res.data.values;
				}
			}
		);
	}

	/**
	* Reads data from a given range
	* @param {string} sheet name of the targeted spreadsheet.
	* @param {string} range spreadsheet range to get values from.
	* @returns {[[string]]} sheet data as 2D array
	*/
	getFromRange(sheetName, range) {
		let sheetRange = sheetName + '!' + range;
		sheets.spreadsheets.values.get({
				spreadsheetID: this.ID,
				range: sheetRange
			},
			(err, res) => {
				if (err) return console.log('Sheets API returned error: ' + err);
				else return res.data.values;
			}
		);
	}
}