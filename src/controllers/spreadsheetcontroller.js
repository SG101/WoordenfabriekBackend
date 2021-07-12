import { googleSheet } from '../models/spreadsheet';
import { radbTemplateModel } from '../models/radbTemplateModel';

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