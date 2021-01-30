import Register from "./register.controller";
const register = new Register();
const { express, cors, bodyParser, cookieparser, session } = require('../config');

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
    
    app.post('/api/register', register.createRecord);
    app.get('/api/register', register.findAll );
    app.get('/api/register/:wishlistID', register.getOneEntry);
    app.delete('/api/register/delete/:wishlistID', register.deleteEntry);
    app.put('/api/register/:wishlistID', register.updateEntry);

    // login
    app.use(cookieparser());
    app.use(
        session({
          key: "userId",
          secret: "ZBWa%EVks6h^WubN7NS+ZgYZBWa%EVks6h^WubN7NS+ZgY",
          resave: false,
          saveUninitialized: false,
          cookie: {
            expires: 60 * 60 * 24,
          },
        })
    );
    
    app.post('/api/login/', register.login);
    app.get('/api/login/', register.loginCheck);
    app.get('/api/logout/', register.logout);
}