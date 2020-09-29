var { Volunteer, Asset } = require("../models/models");

async function getSingleVolunteer(req, res, next) {
	try {
		let volunteer = await Volunteer.findByPk(parseInt(req.params.id), { include: [ Asset ] });
		res.json(volunteer);
	} catch (error) {
		console.log(error);
		res.status(500).end();
	}
}

async function getAllVolunteers(req, res, next) {
	try {
		let volunteers = await Volunteer.findAll({ include: [ Asset ] });
		res.json(volunteers);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function createSingleVolunteer(req, res, next) {
	try {
		let volunteer = await Volunteer.create({
			title: req.fields.title,
			content: req.fields.content,
			extra: req.fields.extra,
			assetId: parseInt(req.fields.assetId)
		});
		res.json(volunteer);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function updateSingleVolunteer(req, res, next) {
	try {
		let volunteer = await Volunteer.findByPk(parseInt(req.params.id), { include: [ Asset ] });

		if (volunteer) {
			volunteer.title = req.fields.title;
			volunteer.content = req.fields.content;
			volunteer.extra = req.fields.extra;
			volunteer.assetId = parseInt(req.fields.assetId);
			volunteer.save();
			res.json(volunteer);
		} else {
			res.status(404).end();
		}
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function deleteSingleVolunteer(req, res, next) {
	try {
		await Volunteer.destroy({
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
	createSingleVolunteer,
	getSingleVolunteer,
	getAllVolunteers,
	updateSingleVolunteer,
	deleteSingleVolunteer
};
