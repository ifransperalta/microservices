import Model from "./dbmodel";
const { session } = require('../config');

export default class RegisterController{
    //https://github.com/machadop1407/Authentication/blob/master/server/index.js

    public login(req: any, res: any){
       //let dbquery = `SELECT * FROM account WHERE emailaddress = '${req.body.username}' AND password = '${req.body.password}'`;
       let dbquery = `SELECT * FROM account WHERE emailaddress = ?`;
      
        Model.getBy( dbquery, req.body.username, (err: any, result: any[]) => {
            if(err){
                res.status(500).send("Error");
            }else{ 
                if (result.length > 0) {
                    console.log("Logged In");
                    res.send({ message: "", status: true });
                    session.user = result;
                }else {
                    session.user = 0;
                    res.send({ message: "user doesn't exist", status: false  });
                }
            }
       });
    }    

    public loginCheck(req: any, res: any){
        if (session.user != 0) {
           res.send({ loggedIn: true, user: req.session.user });
        }else {
           res.send({ loggedIn: false });
        }
    }    
    
    public logout(req: any, res: any){
        session.user = 0;
        res.send({ loggedIn: false });
    }    

    public createRecord(req: any, res: any){
        const registerData = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            emailaddress: req.body.emailaddress,
            password: req.body.password,
            accountstatus: 1
        };

        let dbquery = `INSERT INTO account SET ? `;
        Model.create(dbquery, registerData,(err: any, data: any) => {
             if(err)
             res.send(500).send("Error");

             else 
             res.send('success');
         });
    }

    /**** Get all wishlist data */
    public findAll(req: any, res: any){
        let dbquery = `SELECT * FROM account`;
    
        Model.getAll(dbquery, (err: any, data: any) => {
            if(err)
            res.status(500).send("Error");
            else 
            res.send(data);
        });
    }

    /**** Get one wishlist data */
    public getOneEntry(req: any, res: any){
        let dbquery = `SELECT * FROM account WHERE wishlistID = ${req.params.wishlistID}`;
        
        Model.getById(dbquery, (err: any, data: any) => {
            if(err)
            res.status(500).send('Error: ' + req.params.wishlistID);
            else 
            res.send(data);
        });
    } 
    
    /******* Delete *** */
    public deleteEntry(req: any, res: any){
        let dbquery = `DELETE FROM account WHERE wishlistID = ${req.params.wishlistID}`;
        Model.remove(dbquery, req.params.wistlistID, (err: any, data: any) => {
            if(err)
            res.status(500).send('Error: ' + req.params.wishlistID);
            else 
            res.send(data);
        });
    }

    /******* Update *** */
    public updateEntry(req: any, res: any ){
        if(!req.body){
            res.status(400).send({
                message: "Empty data"
            });
        }

        let dbquery = `UPDATE account SET  
                       wishlistName = '${req.body.wishlistName}', 
                       wishlistFileURL = '${req.body.wishlistFileURL}', 
                       filename = '${req.body.filename}', 
                       wishlistDate = '${req.body.wishlistDate}', 
                       wishlistStatus = ${req.body.wishlistStatus} 
                       WHERE wishlistID = ${req.params.wishlistID}`;

        Model.updateById(req.params.wishlistID, dbquery, (err: any, data: any) => {
                 if(err){
                    console.log(err);    
                 }
                 else{
                    res.send(data);
                 }
            } 
        );
    }
}
