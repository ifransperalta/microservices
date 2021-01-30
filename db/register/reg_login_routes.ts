const { createRecord, findAll, getOneEntry, deleteEntry, updateEntry } = require("./registerController");
const { login, loginCheck, logout, auth } = require("./loginController");
const { express, cors, bodyParser, cookieparser, session } = require('../../config');

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
    
    // register
    app.post('/api/register', createRecord);
    app.get('/api/register', findAll );
    app.get('/api/register/:userId', getOneEntry);
    app.delete('/api/register/delete/:userId', deleteEntry);
    app.put('/api/register/:userId', updateEntry);

    // login
    app.use(cookieparser());
    app.use(
        session({
          key: "secret-key",
          secret: "ZBWa%EVks6h^Wub",
          resave: false,
          saveUninitialized: false,
          cookie: {
            expires: 60 * 60 * 24,
          },
        })
    );    
    app.post('/api/login/', login);
    app.get('/api/login-auth/', auth);
    app.get('/api/logout/', logout);

    // session authentication
    //app.get('/api/auth/', auth)
}