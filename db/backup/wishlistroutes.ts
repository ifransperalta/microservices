import WishlistController from "./wishlist.controller";
const wishlist = new WishlistController();
const { express, cors, bodyParser }= require('../config');

module.exports = (app: any) => {
    app.use(cors());
    app.use(bodyParser.json());  
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.json());
    app.use( (req: any, res: any, next: any) =>{
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
    });
        
    app.post('/api/wishlist', wishlist.createRecord);
    app.get('/api/wishlist', wishlist.findAll );
    app.get('/api/wishlist/:wishlistID', wishlist.getOneEntry);
    app.delete('/api/delete/:wishlistID', wishlist.deleteEntry);
    app.put('/api/wishlist/:wishlistID', wishlist.updateEntry);
}