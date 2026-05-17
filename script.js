function addExpense() {
    const amount = document.getElementById('amount');
    const bank = document.getElementById('bank');
    const date = document.getElementById('date');
    const reason = document.getElementById('reason');
    const amountError = document.getElementById('amountError');
    const bankError = document.getElementById('bankError');
    const dateError = document.getElementById('dateError');
    const reasonError = document.getElementById('reasonError');

    if (amount.value && bank.value && date.value && reason.value) {
        const expense = {
            id: Date.now(),
            amount: parseFloat(amount.value).toFixed(2),
            bank: bank.value,
            date: date.value,
            reason: reason.value
        };

        const expenses = getExpenses();
        expenses.push(expense);
        saveExpenses(expenses);

        document.getElementById('expenseForm').reset();
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Expense Added Successfully!</h2>
                <p>Your expense has been added successfully.</p>
            </div>
        `;
        document.body.appendChild(modal);
        setTimeout(() => {
            modal.remove();
        }, 10000);
        modal.addEventListener('click', () => {
            modal.remove();
        });
    } else {
        if (!amount.value) {
            amount.style.borderColor = 'red';
            amountError.textContent = 'Please enter amount';
        }

        if (!bank.value) {
            bank.style.borderColor = 'red';
            bankError.textContent = 'Please enter bank';
        }
        if (!date.value) {
            date.style.borderColor = 'red';
            dateError.textContent = 'Please enter date';
        }
        if (!reason.value) {
            reason.style.borderColor = 'red';
            reasonError.textContent = 'Please enter reason';
        }
        return;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const expenseTableBody = document.getElementById('expenseTableBody');
    if (expenseTableBody) {
        renderTable();
    }
});

function getExpenses() {
    const expenses = localStorage.getItem('expenses');
    return expenses ? JSON.parse(expenses) : [];
}

function saveExpenses(expenses) {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function renderTable() {
    const expenses = getExpenses();
    const tbody = document.getElementById('expenseTableBody');

    if (!tbody) return;
    tbody.innerHTML = '';

    if (expenses.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="empty-state">No expenses found.</td></tr>`;
        return;
    }


    expenses.forEach(expense => {
        const row = document.createElement('tr');

        const amt = parseFloat(expense.amount);
        if (amt <= 500) {
            row.classList.add('row-green');
        } else if (amt <= 1000) {
            row.classList.add('row-yellow');
        } else {
            row.classList.add('row-red');
        }

        row.innerHTML = `
            <td>${expense.date}</td>
            <td>${expense.reason}</td>
            <td>${expense.bank}</td>
            <td class="amount">${expense.amount}-ETB</td>
            <td><button class="btn-delete" onclick="deleteExpense(${expense.id})">Delete</button></td>
        `;
        tbody.appendChild(row);
    });
}

window.deleteExpense = function (id) {
    let expenses = getExpenses();
    expenses = expenses.filter(expense => expense.id !== id);
    saveExpenses(expenses);
    renderTable();
}

