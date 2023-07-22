const Grocery = require("../models/grocery");

exports.getAllGroceries = async (req,res,next) => {
   try {
    const [allGroceries] = await Grocery.fetchAll();
    res.status(200).json(allGroceries);
   } catch(err) {
    if(!err.statusCode) {
        err.statusCode = 500;
    }
    next(err);
   }
}

exports.postGrocery = async (req,res,next) => {
    try {
        const postResponse= await Grocery.post(req.body.item);
        res.status(201).json(postResponse);
       } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 400;
        }
        next(err);
    }
}

exports.updateGrocery = async (req,res,next) => {
    try {
        const putResponse= await Grocery.update(req.body.id,req.body.item);
        res.status(201).json(putResponse);
       } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
exports.deleteGrocery = async (req,res,next) => {
    try {
        const deleteResponse= await Grocery.deleteById(req.params.id);
        res.status(201).json(deleteResponse);
       } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}