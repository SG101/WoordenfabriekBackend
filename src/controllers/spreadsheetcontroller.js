import { googleSheet } from '../models/spreadsheet';

/*
 * model notes:
 * 'columns[x].type' value is used to identify how to interpret the data in that column.
 *	e.g: when type == 'list' the data in that column should be interpreted as a comma-separated list.
 *		when type == 'options' the possible items should be limited to the values of another item 'options'.
 *		when type == 'number' the column should be interpreted as numbers.
 *		when type == 'undefined' the type 'string' is assumed.
*/

export const RadbSheet = new googleSheet("", {}, templateModel);

export const spreadsheetRange = (req, res) => {
	res.send(RadbSheet.getModelColumn(req.body.sheet, req.body.column));
}