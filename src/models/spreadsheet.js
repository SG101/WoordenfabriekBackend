import { google } from 'googleapis';

/*/
 *	sheet model description:
 	*	[{sheet, columns:[{name, column, type?, options?, min?, max?, validateCell?}]}]
 *	single column:
 	*	{name, column, type?, options?, min?, max?, validateCell?}
 *	column guidelines:
 	*	min and max are used as clamp values when type = 'number' and as character limits when type = 'string'.
 	*	options should be an array of accepted values, this will only be used if type = 'options'.
 	*	validateCell should be a function returning a boolean, this function is called on every cell that is gotten via this colunn.
 	*	values with '?' are optional or only required in case of particular types.
/*/

/**
 * @property {google.sheets} sheets the google sheets api entry point.
 * @property {{name, column, type?, options?, min?, max?, validateCell?}} model an object describing the google sheets structure.
 * @property {string} ID the ID of the google sheet to access.
 */
export class googleSheet {

	/**
	 * @param {string} sheetsID google sheets id.
	 * @param {OAuth2} auth OAuth2 authentication object.
	 * @param {[{sheet,columns:[{name, column, type?, options?, min?, max?, validateCell?}]}]} modelDescription an array linking names to sheet columns and data validation rules.
	*/
	constructor(sheetsID, auth, modelDescription) {
		this.sheets = google.sheets({ version: 'v4', auth });
		this.ID = sheetsID;
		this.model = modelDescription;
	}

	/**
	 * gets a sheet column from model by sheet and name, returns column identifier.
	 * @param {string} sheet a string corresponding with a 'sheet' value of an element of the model array
	 * @param {string} column a string corresponding with a 'name' value of the sheet's 'columns' list
	 * @returns {[string]} all data in the given column
	*/
	getModelColumn(sheet, column) {
		for (let s = 0; s < this.model.length; s++)
			if (this.model[s].sheet === sheet)
				sheet = this.model[s];
				for (let c = 0; c < sheet.columns.length; c++)
					if (sheet.columns[c].name === column)
						return sheet.columns[c];
		return undefined;
	}

	/**
	 * validates cell according to default validation settings and a call to validateCell.
	 * @param {string} cellData the raw data from the cell.
	 * @param {{name, column, type?, options?, min?, max?}} columnDescription the column description object from the model.
	 * @returns {boolean} true if the given cell data passes all relevant validation tests.
	 */
	validateCell(cellData, columnDescription) {
		if (columnDescription.validateCell != undefined) {
			if(!columnDescription.validateCell(cellData)) return false;
		}

		switch (columnDescription.type) {
			case undefined: //falls through
			case 'string':
				return (typeof columnDescription.min == 'number'
						&& cellData.length >= parseInt(columnDescription.min))
					&& (typeof columnDescription.max == 'number'
						&& cellData.length <= parseInt(columnDescription.max));
			case 'number':
				return (parseInt(cellData) != NaN)
					&& (typeof columnDescription.maxNum == undefined
						|| parseInt(cellData) > maxNum)
					&& (typeof columnDescription.minNum == undefined
						|| parseInt(cellData) < minNum);
			case 'options':
				if (columnDescription.options != undefined) {
					let foundMatch = false;
					for (let i = 0; i < columnDescription.options; i++)
						if (cellData == columnDescription.options[i])
							foundMatch = true;
					return foundMatch;
				} else return true;
			default: // don't validate on uncertainty
				return true;
		}
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
		
		if (modelColumn == undefined)
			range += columnIdentifier + rowStart + ':' + columnIdentifier + rowEnd;
		else
			range += modelColumn.column + rowStart + ':' + modelColumn.column + rowEnd;

		this.sheets.spreadsheets.values.get({
			spreadsheetID: this.ID,
			range: range
		}, (err, res) => {
				if (err) {
					return console.log('Google sheets API returned error: ' + err);
				} else {
					if (modelColumn != undefined)
						for (let i = 0; i < res.data.values.length; i++)
							this.validate(res.data.values[i], modelColumn);
					return res.data.values;
				}
			}
		);
	}

	/**
	 * reads data from a given range.
	 * @param {string} sheet name of the targeted spreadsheet.
	 * @param {string} range spreadsheet range to get values from.
	 * @returns {[[string]]} sheet data as 2D array.
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