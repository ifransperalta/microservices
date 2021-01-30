const {app, port} = require('./config');

app.get("/", (req: any, res: any) => {
    res.send("Working");
});

// database routes
//require("./db/wishlistroutes")(app);
require("./db/register/reg_login_routes")(app);

app.listen(port, () => console.log('Listening to port ${port} ...'));