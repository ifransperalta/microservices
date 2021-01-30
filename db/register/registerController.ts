import Model from "../db/dbmodel";
const { session } = require('../../config');
const bcrypt = require('bcrypt');
const saltRound = 10;


const createRecord = async function createRecord(req: any, res: any){
    try{
        // hash password
        const hash = await bcrypt.hash(req.body.password, saltRound);

        const registerData = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            emailaddress: req.body.emailaddress,
            password: hash,
            accountstatus: 1
        };

        let dbquery = `INSERT INTO account SET ? `;
        await Model.create(dbquery, registerData,(err: any, data: any) => {
                if(err)
                res.send(500).send("Error");
                else 
                res.send('success');
        });
    }
    catch(err){
        console.log('Error: ', err);
    }
}

/**** Get all wishlist data */
const findAll = async function findAll(req: any, res: any){
    try{
        let dbquery = `SELECT * FROM account`;
        await Model.getAll(dbquery, (err: any, data: any) => {
            if(err)
            res.status(500).send("Error");
            else 
            res.send(data);
        });
    }
    catch(err){
        console.log('Error: ', err);
    }
}

/**** Get one wishlist data */
const getOneEntry = async function getOneEntry(req: any, res: any){
    try{
        let dbquery = `SELECT * FROM account WHERE userid = ${req.params.userId}`;
        await Model.getById(dbquery, (err: any, data: any) => {
            if(err)
            res.status(500).send('Error: ' + req.params.userId);
            else 
            res.send(data);
        });
    }
    catch(err){
        console.log('Error: ', err);
    }
} 

/******* Delete *** */
const deleteEntry = async function deleteEntry(req: any, res: any){
    try{
        let dbquery = `DELETE FROM account WHERE userid = ${req.params.userId}`;
        await Model.remove(dbquery, req.params.wistlistID, (err: any, data: any) => {
            if(err)
            res.status(500).send('Error: ' + req.params.userId);
            else 
            res.send(data);
        });
    }
    catch(err){
        console.log('Error: ', err);
    }
}

/******* Update *****/ 
const updateEntry = async function updateEntry(req: any, res: any ){
   try{
        if(!req.body)
        res.status(400).send({ message: "Empty data"});
        
        let dbquery = `UPDATE account SET  
                       firstname = '${req.body.firstname}', 
                       lastname = '${req.body.lastname}', 
                       password = '${req.body.password}', 
                       emailaddress = '${req.body.emailaddress}', 
                       accountstatus = 1 
                       WHERE userid = ${req.params.userId}`;

        await Model.updateById(req.params.userId, dbquery, (err: any, data: any) => {
            if(err)
            console.log(err);    
            else
            res.send(data);
        });
   }
   catch(err){
        console.log('Error: ', err);
   }
}

module.exports = {
    createRecord: createRecord,
    findAll: findAll,
    getOneEntry: getOneEntry,
    deleteEntry: deleteEntry,
    updateEntry: updateEntry
}
