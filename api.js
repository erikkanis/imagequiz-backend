var { customers } = require('./data_tier/customers');
var { flowers } = require('./data_tier/flowers');
var { quizzes } = require('./data_tier/data');
var { scores } = require('./data_tier/scores');

let add = (n, m) => {
    return n + m;
}

let sub = (n, m) => {
    return n - m;
}

let getFlowers = () => {
    let flowerName=[];
    for(let i = 0; i < flowers.length; i++){
        flowerName.push(flowers[i].name);
    }
    return flowerName;
}

let getQuizzes = () => {
    return quizzes;
}

let getQuizID = (id) => {
    return quizzes[id];
}

let addCustomer = (name, email, password) => {
    let alreadyExist = customers.find(x=> x.email.toLowerCase() === email.toLowerCase());
    if(alreadyExist){
        return true;
    }
    customers.push({id: customers.length + 1, name: name, email: email, password: password});
    return false;
}

let customerLogin = ( email, password) => {
    let isValid = customers.find(x => x.email.toLowerCase() === email.toLowerCase() && x.password == password);
    if(isValid){
        return true;
    }
    return false;
}

let addScore = (quizTaker, quizID, score) => {
    scores.push({quizTaker, quizID, score});
}

let checkUserScore = (quizTaker, quizID) => {
    for(let i = 0; i < scores.length; i++ ){
        if(scores[i] === quizTaker && scores[i].quizID === quizID) {
            return scores[i].score;
        }
    }
    return -1;
}

exports.checkUserScore = checkUserScore;
exports.addScore = addScore;
exports.getQuizID = getQuizID;
exports.getQuizzes = getQuizzes;
exports.getFlowers = getFlowers;
exports.customerLogin = customerLogin;
exports.addCustomer = addCustomer;
exports.add = add;
exports.sub = sub;