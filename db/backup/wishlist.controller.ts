import Model from "./dbmodel";

export default class WishlistController{

    public createRecord(req: any, res: any){

        const wishlistData = {
            wishlistName: req.body.wishlistName,
            wishlistFileURL: req.body.wishlistFileURL,
            filename: req.body.filename,
            wishlistDate: req.body.wishlistDate,
            wishlistStatus: req.body.wishlistStatus
        };

        let dbquery = `INSERT INTO wishlist SET ? `;
        Model.create(dbquery, wishlistData,(err: any, data: any) => {
             if(err)
             res.send(500).send("Error");

             else 
             res.send(data);
         });
    }

    /**** Get all wishlist data */
    public findAll(req: any, res: any){
        let dbquery = `SELECT * FROM wishlist`;
    
        Model.getAll(dbquery, (err: any, data: any) => {
            if(err)
            res.status(500).send("Error");
            else 
            res.send("Success");
        });
    }

    /**** Get one wishlist data */
    public getOneEntry(req: any, res: any){
        let dbquery = `SELECT * FROM wishlist WHERE wishlistID = ${req.params.wishlistID}`;
        
        Model.getById(dbquery, (err: any, data: any) => {
            if(err)
            res.status(500).send('Error: ' + req.params.wishlistID);
            else 
            res.send(data);
        });
    } 
    
    /******* Delete *** */
    public deleteEntry(req: any, res: any){
        let dbquery = `DELETE FROM wishlist WHERE wishlistID = ${req.params.wishlistID}`;
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

        let dbquery = `UPDATE wishlist SET  wishlistName = '${req.body.wishlistName}', wishlistFileURL = '${req.body.wishlistFileURL}', filename = '${req.body.filename}', wishlistDate = '${req.body.wishlistDate}', wishlistStatus = ${req.body.wishlistStatus} WHERE wishlistID = ${req.params.wishlistID}`;

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
