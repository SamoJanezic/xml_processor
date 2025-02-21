export function createTable(tableName) {
	tableName
		.sync({ force: true })
		.then(() => {
			console.log(`Successfully created table ${tableName}`);
		})
		.catch((err) => {
			console.error(err);
		});
}

export function insertIntoTable(tableName, obj) {
	if (obj.length) {
		tableName
			.bulkCreate(obj)
			.then(() => {
				console.log(
					`Successfully inserted ${obj.length} entries into ${tableName}`
				);
			})
			.catch((err) => {
				console.error(err);
			});
	}
	tableName
		.create(obj)
		.then(() => {
			console.log(`Successfully inserted entry into ${tableName}`);
		})
		.catch((err) => {
			console.error(err);
		});
}

export function clearTable(tableName) {
	tableName.truncate();
}

export function selectAll(tableName, cols) {
	tableName
		.findAll({
			attributes: cols,
		})
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.error(err);
		});
}

export function updateItem(id, pairs) {
	izdelek
		.update(req.body.values, {
			where: { id: req.body.values.id },
		})
		.then(() => {
			res.status(200);
		})
		.catch((err) => {
			console.error(err);
		});
}

export function deleteItem(id) {
	izdelek.destroy({
		where: {
			firstName: "Jane",
		},
	});
}
