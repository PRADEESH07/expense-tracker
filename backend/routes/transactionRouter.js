const express=require('express');
const transactionController = require('../controllers/transactionsCtrl');
const isAuthenticated = require('../middlewares/isAuthenticated');
const transactionRouter= express.Router();
//!register
transactionRouter.post("/transaction/create",isAuthenticated,transactionController.create)
//!filter
transactionRouter.get("/transaction/list",isAuthenticated,transactionController.getFilteredTransaction)
//!update
transactionRouter.put("/transaction/update/:id",isAuthenticated,transactionController.update)
//!delete
transactionRouter.delete("/transaction/delete/:id",isAuthenticated,transactionController.delete)
module.exports=transactionRouter;
