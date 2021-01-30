const _express = require("express");
const _app = _express();
const _port = process.env.PORT || 8000;

const _bodyParser = require('body-parser');
const _fs = require("fs");
const _util = require("util");
const _multer = require("multer");
const _cors = require("cors");
const _joi = require('Joi'); // Validation
const _cookieparser = require("cookie-parser");
const _session = require("express-session");
const _sessioncont = require("express-session");

module.exports = {
    express: _express,
    app: _app,
    port: _port,
    bodyParser: _bodyParser,
    fs: _fs,
    util: _util,
    multer: _multer,
    cors: _cors,
    joi: _joi,
    cookieparser: _cookieparser,
    session : _session,
    sessioncont : _sessioncont
}