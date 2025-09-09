const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let transactions = [];

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.post('/api/transactions', (req, res) => {
    const { paidBy, paidFor, amount } = req.body;
    if (!paidBy || !Array.isArray(paidFor) || !amount || amount <= 0)
        return res.status(400).json({ error: 'Invalid input' });

    transactions.push({ paidBy, paidFor, amount });
    res.json({ message: "Transaction added" });
});

app.get('/api/settlement', (req, res) => {
    const balances = {};

    transactions.forEach(tx => {
        const split = tx.amount / tx.paidFor.length;
        tx.paidFor.forEach(user => {
            if (!balances[user]) balances[user] = 0;
            balances[user] -= split;
        });
        if (!balances[tx.paidBy]) balances[tx.paidBy] = 0;
        balances[tx.paidBy] += tx.amount;
    });

    const users = Object.keys(balances);
    const debtors = [];
    const creditors = [];

    users.forEach(user => {
        const bal = parseFloat(balances[user].toFixed(2));
        if (bal < 0) debtors.push({ user, amount: -bal });
        else if (bal > 0) creditors.push({ user, amount: bal });
    });

    const settlements = [];
    let i = 0, j = 0;

    while (i < debtors.length && j < creditors.length) {
        const debtor = debtors[i];
        const creditor = creditors[j];
        const settleAmount = Math.min(debtor.amount, creditor.amount);

        settlements.push({ from: debtor.user, to: creditor.user, amount: settleAmount });

        debtor.amount -= settleAmount;
        creditor.amount -= settleAmount;

        if (debtor.amount < 0.01) i++;
        if (creditor.amount < 0.01) j++;
    }

    res.json(settlements);
});

app.listen(3000, () => console.log('Server Running on port 3000'));