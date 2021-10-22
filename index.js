const express = require('express');
const api = require('./api');
const { scores } = require('./data_tier/scores');

const application = express();
const port = process.env.PORT || 4002;

application.use(express.json());

//add test function
application.get('/add/:n/:m', (request, response) => {
    let n = Number(request.params.n);
    let m = Number(request.params.m);
    let sum = api.add(n, m);
    response.send(`${n} + ${m} = ${sum}`);
});

application.get('/sub/:n/:m', (request, response) => {
    let n = Number(request.params.n);
    let m = Number(request.params.m);
    let sum = api.sub(n, m);
    response.send(`${n} - ${m} = ${sum}`);
});

application.post('/register', (request, response) => {
    let name = request.body.name;
    let email = request.body.email;
    let password = request.body.password;
    let alreadyExists = api.addCustomer(name, email, password);
    if(alreadyExists) {
        response.status(403).json({message: 'A customer with the same email already exists'});
    } else {
        response.json({message: 'The customer was added.'});
    }
});

application.post('/login', (request, response) => {
    let email = request.body.email;
    let password = request.body.password;
    let isValid = api.customerLogin(email, password);
    if(isValid) {
        response.json({message: 'Login successful'});
    } else {
        response.status(404).json({message: 'User not found'});
    }
});

application.get('/flowers', (request, response) => {
    let flowerName = api.getFlowers();
    response.send(JSON. stringify(flowerName));
});

application.get('/quizzes', (request, response) => {
    let quizQuestions = api.getQuizzes();
    response.send(JSON. stringify(quizQuestions));
});

application.get('/quiz/:id', (request, response) => {
    let quizID = api.getQuizID(request.params.id);
    response.send(JSON. stringify(quizID));
});

application.post('/score', (request, response) => {
    api.addScore(request.body.quizTaker, request.body.quizID, request.body.score);
    response.send(JSON. stringify({message: "Score was added"}));
});

application.get('/scores/:quiztaker/:quizid', (request, response) => {
    let quizScore = api.checkUserScore(request.body.quizTaker, request.body.quizID);
    if(quizScore == -1) {
        response.status(404).json({message: 'User not found'});
    } else {
        response.send(JSON. stringify(quizScore));
    }
});

application.listen(port, () => console.log('Listening on port ' + port));