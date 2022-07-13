const {storageModel} = require("../models");
const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;
const {handleHttpError} = require("../utils/handleError")
const { matchedData } = require("express-validator");
const fs = require("fs");

/**
 * obtener lista base de dato 
 * @param {*} req 
 * @param {*} res 
 */
 const getItems = async (req, res) => {
    try{
    const data = await storageModel.find({});
    res.send({data});
    }catch(e){
        handleHttpError(res, "ERROR_GET_ITEMS");
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try{
        const {id} = matchedData(req);
        const data = await storageModel.findById(id);
        res.send({data});
   }catch(e){
       handleHttpError(res, "ERROR_GET_ITEM");
   }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    try{
    const {file} = req;
    console.log(file);
    const fileData = {
        filname: file.filename,
        url: `${PUBLIC_URL}/${file.filename}`
    }
    const data = await storageModel.create(fileData);
    res.send({data});
}catch(e){
    console.log(e);
}
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try{
        const {id} = matchedData(req);
        const data = await storageModel.findById(id);
        await storageModel.delete({_id:id})
        const {filname} = data;
        const filePath = `${MEDIA_PATH}/${filname}`;
        fs.unlinkSync(filePath);
        const da = {
            filePath, 
            deleted:1
        }
        res.send({da});
   }catch(e){
       handleHttpError(res, "ERROR_DELETE_ITEM");
   }
};

module.exports = {getItems, getItem, createItem, updateItem, deleteItem}