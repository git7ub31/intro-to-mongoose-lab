/*------------------------------- Starter Code -------------------------------*/
const prompt = require('prompt-sync')();
// const username = prompt('What is your name? ');
// console.log(`Your name is ${username}`);

const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Customer = require('./models/customers')

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // await runQueries()

    const startPoint = async () => {
        await connect();
        console.log('Welcome to the CRM. What would you like to do?');
        console.log('1. Create a customer');
        console.log('2.View all customers');
        console.log('3. Update a customer');
        console.log('4. Delete a customer');
        console.log('5. Quit');
        const userChoice = prompt('Number of action to run:');

        if(userChoice === '1'){
            await createCustomer();
        } else if (userChoice === '2'){
            await viewCustomer();
        } else if(userChoice === '3'){
            await updateCustomer();
        } else if(userChoice === '4'){
            await deleteCustomer();
        } else if(userChoice === '5'){
            console.log('Exiting... Goodbye');
            await mongoose.disconnect();
            process.exit(); 
        }else{
            console.log('Number is not a part of options. Select again');
        }
    }
    startPoint()
}
  

// const runQueries = async () => {
//     console.log('Queries running.')
  
// };

const createCustomer = async () => {
    const name = prompt('what is the customers name?');
    const age = prompt('what is the customer age?');
    const customer = await Customer.create({name, age});
    console.log(`New customer= Name: ${name}, Age: ${age}`);
};

const viewCustomers = async ()=> {
    const customers = await Customer.find({});
    console.log("Here are the customers found:");
    customers.forEach(customer => {
        console.log(`Name: ${customer.name}, Age: ${customer.age}`);
    });
};

const updateCustomer = async () => {
    const customers = await Customer.find({});
    console.log("Here are all the existing customers:")
    customers.forEach(customer => {
        console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`);
    });
    const id = prompt('Which customer id would you like to update?');
    const updatedName = prompt('What is the updated Name?');
    const updatedAge = prompt('What is the new Age?');

    await Customer.findByIdAndUpdate(id, {name: updatedName, age: updatedAge});
    console.log("Customer has ben updated. Click on view all to see new list.")
}

const deleteCustomer = async () => {
    const customers = await Customer.find({});
    console.log("Here are all the existing customers:")
    customers.forEach(customer => {
        console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`);
    });

    const id = prompt('Enter the id of the customer you would like to delete:');
    await Customer.findByIdAndDelete(id);
    console.log("Customer has been deleted.");
};

connect();