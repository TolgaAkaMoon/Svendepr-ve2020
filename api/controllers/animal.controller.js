var { Animal, Asset } = require("../models/models");

async function getSingleAnimal(req, res, next) {
	try {
		let animal = await Animal.findByPk(parseInt(req.params.id), { include: [ Asset ] });
		res.json(animal);
	} catch (error) {
		console.log(error);
		res.status(500).end();
	}
}

async function getAllAnimals(req, res, next) {
	try {
		let animals = await Animal.findAll({ include: [ Asset ] });
		res.json(animals);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function createSingleAnimal(req, res, next) {
	try {
		let animal = await Animal.create({
			name: req.fields.name,
			description: req.fields.description,
			age: req.fields.age,
			assetId: parseInt(req.fields.assetId)
		});
		res.json(animal);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function updateSingleAnimal(req, res, next) {
	try {
		let animal = await Animal.findByPk(parseInt(req.params.id), { include: [ Asset ] });

		if (animal) {
			animal.name = req.fields.name;
			animal.description = req.fields.description;
			animal.assetId = parseInt(req.fields.assetId);
			animal.save();
			res.json(animal);
		} else {
			res.status(404).end();
		}
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function deleteSingleAnimal(req, res, next) {
	try {
		await Animal.destroy({
			where: {
				id: parseInt(req.params.id)
			}
		});
		res.end();
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

module.exports = {
	createSingleAnimal,
	getSingleAnimal,
	getAllAnimals,
	updateSingleAnimal,
	deleteSingleAnimal
};
