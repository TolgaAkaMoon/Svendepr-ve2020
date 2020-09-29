var { createSingleAsset, getAllAssets, getSingleAsset } = require("../controllers/asset.controller");
var { isAuthorized } = require("../middleware/auth");

module.exports = function(router) {
	router.post("/api/v1/assets", isAuthorized, createSingleAsset);
	router.get("/api/v1/assets", getAllAssets);
	router.get("/api/v1/assets/:id", getSingleAsset);
};
