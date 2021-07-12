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
	}
];