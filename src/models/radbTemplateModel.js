export const radbTemplateModel = [
	{
		sheet: "Lessen",
		columns: [
			{ name: "Les ID", column: "A", type: "number" },
			{ name: "Titel", column: "B", type: "string" },
			{ name: "Subtitel", column: "C", type: "string" },
			{ name: "Status", column: "D", type: "options", options: ["Actief", "Inactief"] },
			{ name: "Vervaldatum", column: "E", type: "date" }
		]
	},
	{
		sheet: "Levels",
		columns: [
			{ name: "Level ID", column: "A", type: "number" },
			{ name: "Titel", column: "B", type: "string" },
			{ name: "Subtitel", column: "C", type: "string" },
			{ name: "Timer", column: "D", type: "bool" },
			{ name: "Evaluatie", column: "E", type: "bool" }
		]
	},
	{
		sheet: "Challenges",
		columns: [
			{ name: "Challenge ID", column: "A", type: "number", min: 0 },
			{ name: "Challenge Soort ID", column: "B", type: "options", options: ["C01", "K01", "K02", "I01", "V01"] },
			{ name: "Beschrijving", column: "C", type: "string" },
			{ name: "Titel", column: "D", type: "string" },
			{ name: "Subtitel", column: "E", type: "string" },
			{ name: "Minimum aantal vragen", column: "F", type: "number", min: 0 },
			{ name: "Toelichting", column: "G", type: "string"}
		]
	},
	{
		sheet: "Lessen-Levels Verbindingen",
		columns: [
			{ name: "Les ID", column: "A", type: "reference", referenceSheet: "Lessen", referenceColumn: "Les ID" },
			{ name: "Challenge ID", column: "B", type: "reference", referenceSheet: "Challenges", referenceColumn: "Challenge ID" }
		]
	},
	{
		sheet: "Level-Challenge Verbindingen",
		columns: [
			{ name: "Level ID", column: "A", type: "reference", referenceSheet: "Levels", referenceColumn: "Level ID" },
			{ name: "Challenge ID", column: "B", type: "reference", referenceSheet: "Challenges", referenceColumn: "Challenge ID" }
		]
	},
	{
		sheets: "Vragen-C01",
		columns: [
			{ name: "Challenge ID", column: "A", type: "reference", referenceSheet: "Challenges", referenceColumn: "Challenge ID" },
			{ name: "Level ID", column: "B", type: "reference", referenceSheet: "Levels", referenceColumn: "Level ID" },
			{ name: "Zin", column: "C", type: "string", min: 1, max: 400 },
			{ name: "Antwoord", column: "D", type: "options", options: [ "Waar", "Niet waar", "Deels waar" ] }
		]
	},
	{
		sheet: "Vragen-K01",
		columns: [
			{ name: "Challenge ID", column: "A", type: "reference", referenceSheet: "Challenges", referenceColumn: "Challenge ID" },
			{ name: "Level ID", column: "B", type: "reference", referenceSheet: "Levels", referenceColumn: "Level ID" },
			{
				name: "Woord", column: "C", type: "string", min: 1,
				validateCell = (cell) => {
					return (cell.includes('|'));
				}
			}
		]
	},
	{
		sheet: "Vragen-K02",
		columns: [
			{ name: "Challenge ID", column: "A", type: "reference", referenceSheet: "Challenges", referenceColumn: "Challenge ID" },
			{ name: "Level ID", column: "B", type: "reference", referenceSheet: "Levels", referenceColumn: "Level ID" },
			{ name: "Morfeem 1", column: "C", type: "string" },
			{ name: "Morfeem 2", column: "D", type: "string" },
			{ name: "Morfeem 3", column: "E", type: "string" },
			{ name: "Antwoord 1", column: "F", type: "list", max: 3 },
			{ name: "Antwoord 2", column: "G", type: "list", max: 3 },
			{ name: "Antwoord 3", column: "H", type: "list", max: 3 }
		]
	},
	{
		sheet: "Vragen-V01",
		columns: [
			{ name: "Challenge ID", column: "A", type: "reference", referenceSheet: "Challenges", referenceColumn: "Challenge ID" },
			{ name: "Level ID", column: "B", type: "reference", referenceSheet: "Levels", referenceColumn: "Level ID" },
			{ name: "Woord", column: "C", type: "string" },
			{ name: "Antwoorden", column: "D", type: "list", min: 0, max: 4 },
		]
	},
	{
		sheet: "Vragen-I01",
		columns: [
			{ name: "Challenge ID", column: "A", type: "reference", referenceSheet: "Challenges", referenceColumn: "Challenge ID" },
			{ name: "Level ID", column: "B", type: "reference", referenceSheet: "Levels", referenceColumn: "Level ID" },
			{ name: "Voorbeeldzin", column: "C", type: "string" },
			{
				name: "Opdrachtzin", column: "D", type: "string",
				validateCell = (cellData) => {
					return (cellData.includes("[") && cellData.includes("]"));
				}
			}
		]
	}
];