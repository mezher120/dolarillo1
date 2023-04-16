const server = require('./src/app.js');




server.listen(process.env.PORT, () => {
    console.log('se inicio el server')
}); // create port