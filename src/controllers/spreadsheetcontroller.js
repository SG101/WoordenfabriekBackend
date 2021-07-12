import { googleSheet } from '../models/spreadsheet';
import { radbTemplateModel } from '../models/radbTemplateModel';

/*
 * model notes:
 * 'columns[x].type' value is used to identify how to interpret the data in that column.
 *	e.g: when type == 'list' the data in that column should be interpreted as a comma-separated list.
 *		when type == 'options' the possible items should be limited to the values of another item 'options'.
 *		when type == 'number' the column should be interpreted as numbers.
 *		when type == 'undefined' the type 'string' is assumed.
*/

export const RadbSheet = undefined;

export const getSpreadsheetRange = (req, res) => {
	if (RadbSheet == undefined) {
		// authorize OAuth2
		RadbSheet = new googleSheet("", {}, radbTemplateModel);
		// confirm model accuracy
	} else {
		res.send(RadbSheet.getModelColumn(req.body.sheet, req.body.column));
	}
}