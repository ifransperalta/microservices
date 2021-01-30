const sql = require("./dbconnect");

export default class Model{
 
    constructor(){
        // just empty ....
    }

    public static create(dbquery: string, data: any, result: any){
        sql.query(dbquery, data, (err: any, res: any) => {
             if(err)
             console.log(err);
             
             console.log("created customer: ", { id: res.insertId, ...data });
             result(null, { id: res.insertId, ...data });
        });
    }

    /** Get all data */
    public static getAll(dbquery: string, result: any){
        sql.query(dbquery, (err: any, res: any) =>{
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }      
            console.log("customers: ", res);
            return result(null, res);
        });
    }

    /** Get data by ID */
    public static getById(dbquery: string, result: any){
        sql.query(dbquery, (err: any, res: any)  => {
            if(err) {
                console.log(err);
                result(err, null);
                return;
            }

            if(res.length){
                console.log("found" , res[0]);
                result(null, res[0]);
                return;
            }
            return result({kind: "not_found"}, null);
        });
    }

    /** Get data by any condition*/
    public static getBy(dbquery: string, username: string, result: any){
        sql.query(dbquery, username, (err: any, res: any)  => {
            if(err)
            console.log(err);
            
            //console.log("Account res: ", res);
            return result(null, res);
       });
    }

    /** Delete data by ID */
    public static remove(dbquery: string, id: number, result: any){
        sql.query(dbquery, id,(err: any, res: any) => {
            if(err)
            console.log(err);
            
            else
            console.log(`Deleted: ${res.affectedRows}`);
            result(null, res);
        });
    }

    /** Update data by ID */
    public static updateById(id: number, dbquery: string, result: any){
        sql.query(dbquery, (err: any, res: any) => {
            if(err) {
                console.log(err)
                return result(err);
            }
    
            if(res.affectedRows == 0 ){
               return result("not found");
            }
    
            console.log("Updated ID: ",  id );
            return(id);
        });
    }

}