Node-Express-MySql-Typescript

    npm init 
    npm i typescript | check version tsc --v
    npm i express

Install Dev devependency

    nodemon
    npm i -D typescript ts-node nodemon @types/node/ @types/express

Create a typscript config file

    tsc --init

In tsconfig.json

    Change target to "es6"
    outDir: "./dist" --compiled js create the folder
    rootDir: "./src" --ts files create the folder
    enable moduleResulution

After this is set up you run "tsc"

    If it will return an error of there is no TS file is found

Change settings in package.json

"scripts": { "start": "node dist/app.js", "dev" : "nodemon src/app.ts", "build": "tsc -p ." },

Run the microservice

    npm run dev
