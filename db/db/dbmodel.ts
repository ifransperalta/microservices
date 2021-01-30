const sql = require("./dbconnect");

export default class Model{
 
    public static create(dbquery: string, data: any, result: any){
        return new Promise( (resolve, reject) => {
            setTimeout(() => {
                sql.query(dbquery, data, (err: any, res: any) => {
                    if(err){
                        reject(err);
                    }else {
                        console.log("created customer: ", { id: res.insertId, ...data });
                        resolve ( result(null, { id: res.insertId, ...data }) );
                    }
                });    
            }, 1000);
        });
    }

    /** Get all data */
    public static getAll(dbquery: string, result: any){
        return new Promise( (resolve, reject) => {
            setTimeout(() => {
                sql.query(dbquery, (err: any, res: any) => {
                    if(err){
                        console.log("error: ", err);
                        reject(result(null, err));
                    }else {
                        console.log("customers: ", res);
                        resolve(result(null, res));
                    }
                });
            }, 1000);
        });
    }

    /** Get data by ID */
    public static getById(dbquery: string, result: any){
        return new Promise( (resolve, reject ) => {
            setTimeout( () => {
                sql.query(dbquery, (err: any, res: any)  => {
                    if(err) {
                        console.log(err);
                        reject(result(err, null));
                    }
                    else{
                        console.log("found" , res[0]);
                        resolve(result(null, res[0]));
                    }    
                });
            }, 1000);      
        });
    }

    /** Get data by any condition*/
    public static getBy(dbquery: string, username: string, result: any){
        return new Promise( (resolve, reject) => {
            setTimeout( () => {
                sql.query(dbquery, username, (err: any, res: any)  => {
                    if(err){
                        reject(console.log(err));
                    }else{
                        resolve(result(null, res));
                    }
                });
            }, 1000);
        });
    }

    /** Delete data by ID */
    public static remove(dbquery: string, id: number, result: any){
        return new Promise( (resolve, reject) => {
            setTimeout(() => {
                sql.query(dbquery, id,(err: any, res: any) => {
                            if(err){
                                console.log(err);
                                reject(err);
                            }
                            else{
                                console.log(`Deleted: ${res.affectedRows}`);
                                resolve(result(null, res));
                            }
                });
            }, 1000);    
        });
    }

    /** Update data by ID */
    public static updateById(id: number, dbquery: string, result: any){
        return new Promise( (resolve, reject) => {
            setTimeout(() => {
                sql.query(dbquery, (err: any, res: any) => {
                    if(err) {
                        console.log(err)
                        reject(result(err));
                    }else if(res.affectedRows == 0 ){
                        reject(result("not found"));
                    }else{
                        console.log("Updated ID: ",  id );
                        resolve(result(id));
                    }
                });    
            }, 1000);   
        });
    }    
}