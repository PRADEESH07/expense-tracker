const asyncHandler=require('express-async-handler')
const Transaction=require("../model/Transaction")
const transactionController={
    //! create
    create: asyncHandler(async(req,res)=>{
        const {type,category,amount,date,description}=req.body;
        if(!amount||!type||!date)
        {
            throw new Error("Name , Amount and types required")
        }
        //!create
        const transaction=await Transaction.create({
            user: req.user,type,amount,date,description,category
        })
        res.json(transaction)
    }),
    //! list
    getFilteredTransaction: asyncHandler(async(req,res)=>{
        const {startDate,endDate,type,category}=req.query;
        // console.log(category);
        let filters = { user: req.user };
        if (startDate) {
        filters.date = { ...filters.date, $gte: new Date(startDate) };
        }
        if (endDate) {
        filters.date = { ...filters.date, $lte: new Date(endDate) };
        }
        if (type) {
        filters.type = type;
        }
        if(category) {
        if(category ==='All'){
            //nothing
        }else if(category==="Uncategorized"){
            filters.category="Uncategorized"
        } else{
            filters.category=category;
        }
    }
    const transaction=await Transaction.find(filters).sort({date:-1})
    res.json(transaction)
    }),
  //!update
update: asyncHandler(async (req, res) => {
    //! Find the transaction
    const transaction=await Transaction.findById(req.params.id);
    if (transaction && transaction.user.toString() === req.user.toString()) {
    (transaction.type = req.body.type || transaction.type),
    (transaction.category = req.body.category || transaction.category),
    (transaction.amount = req.body.amount || transaction.amount),
    (transaction.date = req.body.date || transaction.date),
    (transaction.description =
    req.body.description || transaction.description);
    //update
    const updatedTransaction = await transaction.save();
    res.json(updatedTransaction);
    } I
    }),
  //! delete
delete: asyncHandler(async (req, res) => {
    //! Find the transaction
    const transaction = await Transaction.findById(req.params.id);
    if (transaction && transaction.user.toString() === req.user.toString()) {
    await Transaction.findByIdAndDelete (req.params.id);
    res.json({ message: "Transaction removed" });
    }
    }),
 
}
module.exports=transactionController;