let loggedIn = false;
let balance = 0;
let initialBalance = 0;
let loggedInUser = null;

let users = [
    { username: 'as', password: '123', balance: 17.89, pin: 1111, pinEntered: false },
    { username: 'vartotojas2', password: 'slaptazodis2', balance: 0, pin: 0, pinEntered: false }
];

function generateRandomPin() {
    return Math.floor(1000 + Math.random() * 9000);
}

function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let user = users.find(u => u.username === username && u.password === password);

    if (user) {
        if (!user.pin) {
            user.pin = generateRandomPin();
        }

        loggedInUser = user;
        loggedIn = true;
        balance = user.balance;

        document.getElementById('login-container').classList.add('hidden');
        document.getElementById('pin-container').classList.remove('hidden');
        document.getElementById('operations').classList.remove('hidden');

        updateBalance();
        alert('Sveiki atvykę, ' + username);
    } else {
        alert('Neteisingas vartotojo vardas arba slaptažodis.');
    }
}

function enterPin() {
    let pinInput = document.getElementById('pin-input').value;

    if (loggedInUser && pinInput !== '' && !isNaN(pinInput) && pinInput.length === 4 && pinInput === loggedInUser.pin.toString()) {
        loggedInUser.pinEntered = true;
        document.getElementById('pin-container').classList.add('hidden');
        alert('PIN kodas patvirtintas. Dabar galite atlikti operacijas.');
    } else {
        alert('Neteisingas PIN kodas. Įveskite 4-skaitmenį PIN.');
    }
}

function logout() {
    loggedIn = false;
    loggedInUser.pinEntered = false;
    loggedInUser = null;
    document.getElementById('login-container').classList.remove('hidden');
    document.getElementById('pin-container').classList.add('hidden');
    document.getElementById('operations').classList.add('hidden');
    balance = initialBalance;
    updateBalance();
}

function transfer() {
    if (loggedIn) {
        if (loggedInUser.pinEntered) {
            let amount = parseFloat(document.getElementById('amount').value);
            if (!isNaN(amount) && amount > 0) {
                if (balance >= amount) {
                    balance -= amount;
                    loggedInUser.balance = balance;
                    updateBalance();
                    alert('Pervedimas atliktas: -' + amount.toFixed(2) + ' EUR');
                } else {
                    alert('Neužtenka lėšų.');
                }
            } else {
                alert('Neteisinga suma.');
            }
        } else {
            alert('Prieš atliekant pervedimą, įveskite PIN kodą.');
        }
    } else {
        alert('Prašome prisijungti prie bankomato.');
    }
}

function request() {
    if (loggedIn) {
        let amount = parseFloat(document.getElementById('amount').value);
        if (!isNaN(amount) && amount > 0) {
            balance += amount;
            loggedInUser.balance = balance;
            updateBalance();
            alert('Prašymas gautas: +' + amount.toFixed(2) + ' EUR');
        } else {
            alert('Neteisinga suma.');
        }
    } else {
        alert('Prašome prisijungti prie bankomato.');
    }
}

function updateBalance() {
    document.getElementById('balance').innerText = balance.toFixed(2);
}
