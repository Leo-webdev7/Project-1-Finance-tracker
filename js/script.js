// script.js

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('#nav_sidebar a');
    const pages = document.querySelectorAll('.page');
    const form = document.querySelector('section#home-page form');
    const dateInput = document.querySelector('#date');
    const sourceInput = document.querySelector('#income-source');
    const amountInput = document.querySelector('#amount');
    const optionSelect = document.querySelector('#option-select');
    const typeSelect = document.querySelector('#select');
    const toggleLink = document.getElementById('toggle-scheme');
    const header = document.querySelector('header');
    const navSidebar = document.querySelector('#nav_sidebar');
    const footer = document.querySelector('footer');

    let isOldScheme = false; // Initial scheme (false = light, true = dark)

    // Update the toggle button text based on the current scheme
    function updateToggleButtonText() {
        toggleLink.textContent = isOldScheme ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }

    // Call the function to set the initial button text
    updateToggleButtonText();

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetPage = link.getAttribute('data-page');

            // Hide all pages
            pages.forEach(page => page.style.display = 'none');

            // Show the selected page
            document.getElementById(`${targetPage}-page`).style.display = 'block';
        });
    });

    

    // Function to convert table to CSV format
    function tableToCSV(table) {
        const rows = Array.from(table.querySelectorAll('tr'));
        const csvContent = rows.map(row => {
            const cells = Array.from(row.querySelectorAll('th, td'));
            return cells.map(cell => `"${cell.innerText.replace(/"/g, '""')}"`).join(',');
        }).join('\n');
        return csvContent;
    }

    // Function to trigger a CSV download
    function downloadCSV(csvContent, filename) {
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.setAttribute('download', filename);
        a.click();
    }

    // Add event listeners for download buttons
    document.getElementById('download-income-csv').addEventListener('click', () => {
        const csv = tableToCSV(document.querySelector('#income-page .styled-table'));
        const filename = prompt('Enter filename for Income CSV:', 'income-data.csv');
        if (filename) {
            downloadCSV(csv, filename);
        }
    });

    document.getElementById('download-expense-csv').addEventListener('click', () => {
        const csv = tableToCSV(document.querySelector('#expense-page .styled-table'));
        const filename = prompt('Enter filename for Expense CSV:', 'expense-data.csv');
        if (filename) {
            downloadCSV(csv, filename);
        }
    });

    // Toggle between light and dark schemes
    toggleLink.addEventListener('click', () => {
        isOldScheme = !isOldScheme;

        // Smooth transition by adding/removing class
        document.body.classList.toggle('old-scheme', isOldScheme);
        header.classList.toggle('old-scheme', isOldScheme);
        navSidebar.classList.toggle('old-scheme', isOldScheme);
        footer.classList.toggle('old-scheme', isOldScheme);

        // Update table header rows
        document.querySelectorAll('.styled-table thead tr').forEach(row => {
            row.classList.toggle('old-scheme', isOldScheme);
        });

        // Update the toggle button text
        updateToggleButtonText();
    });
});


/* Store data from submit form income */
const income = document.getElementById('income');

income.addEventListener('click', function (event) {
    event.preventDefault();


    const incomeDate = document.getElementById('incomeDate');
    const incomeSource = document.getElementById('incomeSource');
    const incomeAmount = document.getElementById('incomeAmount');
    const optionselectIncome = document.getElementById('optionselectIncome');

    const incomeSubmission = {
        date: incomeDate.value,
        source: incomeSource.value,
        amount: incomeAmount.value,
        account: optionselectIncome.value,
    };

    let incomeTable = JSON.parse(localStorage.getItem('incomes')) //check if there any previous stored incomes

    if (!incomeTable) {

        incomeTable = []
    }

    incomeTable.push(incomeSubmission);

    /* Dialog function */

    if (!incomeSubmission.date) {
        dialog.showModal();
    } else if (!incomeSubmission.source) {
        dialog.showModal();
    } else if (!incomeSubmission.amount) {
        dialog.showModal();
    } else {
        localStorage.setItem('incomes', JSON.stringify(incomeTable));
        location.reload();
    }

});


/* Dialog function */


const cancelButton = document.getElementById("cancel");
const dialog = document.getElementById("incomeDialog");


cancelButton.addEventListener("click", () => {
    dialog.close("formNotSubmitted");
});







/* Store data from submit form expense */

const expense = document.getElementById('expense');


expense.addEventListener('click', function (event) {
    event.preventDefault();

    const expenseDate = document.getElementById('expenseDate');
    const expenseSource = document.getElementById('expenseSource');
    const expenseAmount = document.getElementById('expenseAmount');
    const optionselectExpense = document.getElementById('optionselectExpense');

    const expenseSubmission = {
        date: expenseDate.value,
        source: expenseSource.value,
        amount: expenseAmount.value,
        account: optionselectExpense.value,
    };

    let expenseTable = JSON.parse(localStorage.getItem('expenses')) //check if there any previous stored incomes

    if (!expenseTable) {

        expenseTable = []

    }

    expenseTable.push(expenseSubmission);

    /* Dialog function */

    if (!expenseSubmission.date) {
        dialog.showModal();
    } else if (!expenseSubmission.source) {
        dialog.showModal();
    } else if (!expenseSubmission.amount) {
        dialog.showModal();
    } else {
        localStorage.setItem('expenses', JSON.stringify(expenseTable));
        location.reload();
    }
});




/* take information from incomes array and send it to income table */


const incomePosts = document.querySelector('#income-elements');
const incomeSebmit = document.querySelector('#income');
const incomePage = document.querySelector('#iincome-elements');

function renderIncome() {
    let storedIncomes = JSON.parse(localStorage.getItem('incomes'));
    if (storedIncomes) {
        for (let i = 0; i < storedIncomes.length; i++) {
            let storedIncome = storedIncomes[i];
            let incomePostTable = document.createElement('tr');
            let incomePostDate = document.createElement('td');
            let incomePostSource = document.createElement('td');
            let incomePostAmount = document.createElement('td');
            let incomePostAccount = document.createElement('td');


            incomePostDate.innerHTML = storedIncome.date;
            incomePostSource.innerHTML = storedIncome.source;
            incomePostAmount.innerHTML = storedIncome.amount;
            incomePostAccount.innerHTML = storedIncome.account;


            incomePosts.appendChild(incomePostTable);
            incomePostTable.appendChild(incomePostDate);
            incomePostTable.appendChild(incomePostSource);
            incomePostTable.appendChild(incomePostAmount);
            incomePostTable.appendChild(incomePostAccount);
        }
    }
}

document.addEventListener('DOMContentLoaded', renderIncome);


/* take information from incomes array and send it to income table */


const expensePosts = document.querySelector('#expense-elements');
const expenseSebmit = document.querySelector('#expense');
const expensePage = document.querySelector('#expense-elements');

function renderExpense() {
    let storedExpenses = JSON.parse(localStorage.getItem('expenses'));
    if (storedExpenses) {
        for (let i = 0; i < storedExpenses.length; i++) {
            let storedExpense = storedExpenses[i];
            let expensePostTable = document.createElement('tr');
            let expensePostDate = document.createElement('td');
            let expensePostSource = document.createElement('td');
            let expensePostAmount = document.createElement('td');
            let expensePostAccount = document.createElement('td');


            expensePostDate.innerHTML = storedExpense.date;
            expensePostSource.innerHTML = storedExpense.source;
            expensePostAmount.innerHTML = storedExpense.amount;
            expensePostAccount.innerHTML = storedExpense.account;


            expensePosts.appendChild(expensePostTable);
            expensePostTable.appendChild(expensePostDate);
            expensePostTable.appendChild(expensePostSource);
            expensePostTable.appendChild(expensePostAmount);
            expensePostTable.appendChild(expensePostAccount);
        }
    }
}

document.addEventListener('DOMContentLoaded', renderExpense);


/* Math functions */

function totalMath() {
    var usb = JSON.parse(localStorage.getItem('incomes'));
    total = 0;
    i = 0;
    for (i = 0; i < usb.length; i++) {
        total += parseFloat(usb[i].amount);
    } console.log(`total income $: ${total}`);

};

totalMath();



/* Card total */

function bankTotal(accountName) {
    var usb = JSON.parse(localStorage.getItem('incomes')) ?? [];
    let usbTotal = 0;
    for (let i = 0; i < usb.length; i++) {
        if (usb[i].account === accountName) {
            usbTotal += parseFloat(usb[i].amount);
            console.log(`${accountName} total $: ${usbTotal}`);
        }
    } 
   

    var xp = JSON.parse(localStorage.getItem('expenses')) ?? [];
    let xpTotal = 0;
    for (let i = 0; i < xp.length; i++) {
        if (xp[i].account === accountName) {
            xpTotal += parseFloat(xp[i].amount);
            console.log(`${accountName} total $: ${xpTotal}`);
        }
    }
    return usbTotal - xpTotal;
}

let usbTotal = bankTotal('Us Bank');
document.getElementById('usBankAccountAmount').innerHTML = `${usbTotal} $`;

usbTotal = bankTotal('Wells Fargo');
document.getElementById('wfBankAccountAmount').innerHTML = `${usbTotal} $`;

usbTotal = bankTotal('Wife`s Account');
document.getElementById('wifesAccountAmount').innerHTML = `${usbTotal} $`;

usbTotal = bankTotal('Cash Account');
document.getElementById('cashAccountAmount').innerHTML = `${usbTotal} $`;

usbTotal = bankTotal('Savings Account');
document.getElementById('savingAccountAmount').innerHTML = `${usbTotal} $`;


