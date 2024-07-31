const asyncHandler=require('express-async-handler')
const Category=require("../model/Category")
const Transaction=require("../model/Transaction")
const categoriesController={
    //! create
    create: asyncHandler(async(req,res)=>{
        const {name,type}=req.body;
        if(!name||!type)
        {
            throw new Error("Name and types required")
        }
        const normalizedName=name.toLowerCase();
        const validTypes=['income','expense'];
        if(!validTypes.includes(type.toLowerCase()))
        {
            throw new Error("Invalid category type")
        }
        const categoryExists = await Category.findOne({
            name: normalizedName,
            user: req.user,
            });
            if(categoryExists)
            {
                throw new Error(`category ${categoryExists.name} already exists`)
            }
            const category = await Category.create({
                user: req.user,
                name: normalizedName,
                type,
                });
                res.status(201).json (category);
    }),
    //! list
    list: asyncHandler(async(req,res)=>{
        const categories = await Category.find({ user: req.user });
        res.status(200).json(categories);
    }),
    //! update
    update: asyncHandler(async(req,res)=>{
        // const categoryId = req.params;
        const { type, name } = req.body;
        // const normalizedName = name.toLowerCase();
        const category = await Category.findById(req.params.id);
        if (!category && category.user.toString() !== req.user.toString()) {
        throw new Error("Category not found or user not authorized");
        }
        const oldName = category.name;
        //! Update category properties
        category.name = name
        category.type = type
        const updatedCategory = await category.save()
        if (oldName!==updatedCategory.name)
            {
        await Transaction.updateMany(
            {
                user: req.user,
                category: oldName,
            },
            { $set: { category: updatedCategory.name } }
        )
        }
        res.json(updatedCategory);
    }),
    //! delete
    delete: asyncHandler(async(req,res)=>{
        const category = await Category.findById(req.params.id);
        if (category && category.user.toString()==req.user.toString()) 
            {
        //! Update transactions that have this category
        const defaultCategory = "Uncategorized";
        await Transaction.updateMany (
        { user: req.user, category: category._id },
        { $set: { category: defaultCategory } }
        );
        //! Remove category
        await Category.findByIdAndDelete(req.params.id);
        res.json({message:"category deleted successfully and the transaction updated "})
        }
        else{
            res.json({message: "category not found"})
        }
    }),
 
}
module.exports=categoriesController;