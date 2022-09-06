const fs = require("fs");
const CSVToJSON = require('csvtojson');

const baseDir = "ads-display-api-documents/reports/v8/";
const files = fs.readdirSync(baseDir);

(async () => {
	const output = {};

	await Promise.all(files.map(async file => {
		const jsons = await CSVToJSON().fromFile(baseDir + file.toString());

		jsons.forEach(json => {
			const key = json["フィールド名/Field Name"];
			const value = json["英語返却値/English Display Values"];
			if (key != null && value != null && value.length > 0) {
				output[key] = value.split(',');
			}
		});
	}));

	fs.writeFileSync("yda.json", JSON.stringify(output));
})();
