const express=require('express');
const transactionController = require('../controllers/transactionsCtrl');
const isAuthenticated = require('../middlewares/isAuthenticated');
const transactionRouter= express.Router();
//!register
transactionRouter.post("/api/v1/transaction/create",isAuthenticated,transactionController.create)
//!filter
transactionRouter.get("/api/v1/transaction/list",isAuthenticated,transactionController.getFilteredTransaction)
//!update
transactionRouter.put("/api/v1/transaction/update/:id",isAuthenticated,transactionController.update)
//!delete
transactionRouter.delete("/api/v1/transaction/delete/:id",isAuthenticated,transactionController.delete)
module.exports=transactionRouter;