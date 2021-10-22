const express = require('express');

const application = express();
const port = process.env.PORT || 4005;

application.get('/add', (request, response) => {
    response.send('Your add request recieved.');
});

application.listen(port, () => console.log('Listening on port ' + port));