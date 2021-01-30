import { string } from "joi";
import Model from "../db/dbmodel";
const { session } = require('../../config');
const bcrypt = require('bcrypt');

let userstatus: boolean = false;

const login = async function login(req: any, res: any){
    try{
        let dbquery = `SELECT * FROM account WHERE emailaddress = ?`;
        
        await Model.getBy( dbquery, req.body.username, (err: any, result: any[]) => {
            if(err){
                res.status(500).send("Error");
            }else{ 
                if (result.length > 0) {
                    // validate password 
                    bcrypt.compare(req.body.password, result[0].password, (err: string, result: string[]) => {
                        if(result){
                            res.send({ message: "200", status: true });
                            userstatus = true;
                        }else{
                            res.send({ message: "Incorrect password", status: false });
                        }  
                    });

                }else {
                    res.send({ message: "User doesn't exist", status: false  });
                }
            }
        });
    }
    catch(err){
        console.log('Error: ', err);
    }
} 

const logout = async function logout(req: any, res: any){
    try{
        req.session.destroy();
        userstatus = false;
        res.send({ message: "user logout", status: false });
    }
    catch(err){
        console.log('Error: ', err);
    }
}    

const authenticate = async function loginCheck(req: any, res: any){
    try{
        if (userstatus)
        res.send({ status: true });
        
        else
        res.send({ status: false });
    }
    catch(err){
        console.log('Error: ', err);
    }
}    

module.exports = {
    login: login,
    auth: authenticate,
    logout: logout
}