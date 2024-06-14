
const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('income');
const moneyMinus = document.getElementById('expense');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');



console.log('Form:', form);  // Debugging line
console.log('Text:', text);  // Debugging line
console.log('Amount:', amount);  // Debugging line

const dummyTransactions = [
    {id:1, text: "Flower", amount: -10},
    {id:2, text: "Salary", amount: 200},
    {id:3, text: "Book", amount: -20},
    {id:4, text: "Camera", amount: 140},
];


let transactions = dummyTransactions;

function addTransactionDOM(transaction){
    //Get sign
    const sign = transaction.amount > 0 ? "+" : "-";

    const icon = transaction.amount > 0 ? "up" : "down";

    const item = document.createElement("li")
    item.classList.add(transaction.amount > 0 ? "plus": "minus");

    item.innerHTML = `<h4>${transaction.text}</h4><span>${sign}${Math.abs(transaction.amount)}
     <i class="fa-solid fa-caret-${icon}"></i>
     <i class="fa-solid fa-trash-alt"></i></span>`;

     list.appendChild(item);
     
}

function updateValue(params){
    const amount = transactions.map(item => item.amount);

    const total = amount
    .reduce((a,b) => (a +=b),0)
    .toFixed(2);


    const income = amount
    .filter(item => item > 0)
    .reduce((a,b) => (a +=b),0)
    .toFixed(2);


    const expense = amount
    .filter(item => item < 0)
    .reduce((a,b) => (a +=b),0)
    .toFixed(2);

     console.log(expense);
     console.log(income);
     console.log(total);
    
    balance.innerHTML = `$${total}`;

    moneyPlus.innerHTML = `$${income}
    <i class= "fas-fa-caret-up"></i>`;

    moneyMinus.innerHTML = `$${Math.abs(expense).toFixed(2)} 
    <i class = "fas-fa-caret-down"></i>`;
}

function randomId(){
    return Math.floor(Math.random() * 1000);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert("please fill your data first");
    } else {
        const transaction = {
        id: randomId(), 
        text:text.value, 
        amount:parseInt(amount.value),
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);
    updateValue();
    text.value = "";
    amount.value = "";


    console.log(transaction);
}
});

//init

function init(){
    list.innerHTML = '';

    dummyTransactions.forEach(addTransactionDOM);
    updateValue();
}


init();
