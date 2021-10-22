var { customers } = require('./data_tier/customers');

let add = (n, m) => {
    return n + m;
}

let sub = (n, m) => {
    return n - m;
}

let addCustomer = (name, email, password) => {
    customers.push({id: customers.length + 1, name, email, password});
}

exports.addCustomer = addCustomer;
exports.add = add;
exports.sub = sub;