const server = require('./api/server');

const port = 5000;

// START YOUR SERVER HERE


server.listen(port, `0.0.0.0`, () => {
    console.log(`server running on port: ${port}`)

})