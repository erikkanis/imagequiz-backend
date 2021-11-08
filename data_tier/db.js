const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const connectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_DATABASE}`;

const connection = {
    connectionString: connectionString,
    ssl: {rejectUnauthorized: false }
}

const pool = new Pool(connection);

let getCustomers = () => {
    return pool.query(`select * from imagequiz.customer`)
    .then(x => x.rows);
}

let addCustomer = (name, email, password) =>  {
    const salt = bcrypt.genSaltSync(9);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return pool.query('insert into imagequiz.customer(name, email, password) values ($1, $2, $3)', [name, email.toLowerCase(), hashedPassword]);
}

let addQuestion = (picture, choices, answer) => {
    return pool.query('insert into imagequiz.question(picture, choices, answer) values ($1, $2, $3)', [picture, choices, answer]);
}

let addCategory = (name) => {
    return pool.query('insert into imagequiz.category(name) values ($1)', [name]);
} 

let addQuiz = (name, category_id) => {
    return pool.query('insert into imagequiz.quiz_quiz(name, category_id) values ($1, $2)', [name, category_id]);

}

let addQuestionToQuiz = (quiz_id, question_id) => {
    return pool.query('insert into imagequiz.quiz_question(quiz_id, question_id) values ($1, $2)', [quiz_id, question_id]);
}

exports.getCustomers = getCustomers;
exports.addQuestion = addQuestion; 
exports.addCustomer = addCustomer;
exports.addCategory = addCategory;
exports.addQuestionToQuiz = addQuestionToQuiz;
exports.addQuiz = addQuiz;