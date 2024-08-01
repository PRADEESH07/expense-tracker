const express=require('express');
const categoriesController = require('../controllers/categoriesCtrl');
const isAuthenticated = require('../middlewares/isAuthenticated');
const categoriesRouter= express.Router();
//!create
categoriesRouter.post("/categories/create",isAuthenticated,categoriesController.create)
//!login
categoriesRouter.get("/categories/list",isAuthenticated,categoriesController.list)
//!update
categoriesRouter.put("/categories/update/:id",isAuthenticated,categoriesController.update)
//!delete
categoriesRouter.delete("/categories/delete/:id",isAuthenticated,categoriesController.delete)
module.exports=categoriesRouter;
