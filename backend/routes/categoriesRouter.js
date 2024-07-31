const express=require('express');
const categoriesController = require('../controllers/categoriesCtrl');
const isAuthenticated = require('../middlewares/isAuthenticated');
const categoriesRouter= express.Router();
//!create
categoriesRouter.post("/api/v1/categories/create",isAuthenticated,categoriesController.create)
//!login
categoriesRouter.get("/api/v1/categories/list",isAuthenticated,categoriesController.list)
//!update
categoriesRouter.put("/api/v1/categories/update/:id",isAuthenticated,categoriesController.update)
//!delete
categoriesRouter.delete("/api/v1/categories/delete/:id",isAuthenticated,categoriesController.delete)
module.exports=categoriesRouter;