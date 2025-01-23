import inquirer from "inquirer";

start();
function start() {
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "O que você deseja fazer?",
            choices: ["Criar conta", "Login", "Sair"],
          }
      ]).then((answers) => {
         const {action} = answers;
         if (action === "Criar conta") {
            createAccount();
         } else if (action === "Login") {
            login();
         } else if (action === "Sair") {
            console.log("Obrigado por usar nosso banco!");
         }
      }).catch((error) => {
        console.error(error);
      });
}

function login() {
    inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "Digite seu nome",
        },
      ]).then((answers) => {
        const {name} = answers;
        const accounts = JSON.parse(fs.readFileSync("data/accounts.json", "utf-8"));
        const account = accounts.accounts.find(account => account.name === name);
        if (account) {
            accountMenu(account);
        }
      });
}   

function accountMenu(account) {
    console.log(`Olá, ${account.name}!`);
    inquirer.prompt([
        {
          type: "list",
          name: "action",
          message: "O que você deseja fazer?",
          choices: ["Ver saldo", "Sacar", "Depositar", "Transferir", "Sair"],
        },
      ]).then((answers) => {
        const {action} = answers;
        if (action === "Ver saldo") {
            checkBalance(account);
        } else if (action === "Sacar") {
            withdraw(account);
        } else if (action === "Depositar") {
            deposit(account);
        } else if (action === "Transferir") {
            transfer(account);
        } else if (action === "Sair") {
            console.log("Obrigado por usar nosso banco!");
        }
      });
}

function checkBalance(account) {
    console.log(`Seu saldo é ${account.balance}`);
    accountMenu(account);
}

function withdraw(account) {
    inquirer.prompt([
        {
          type: "number",
          name: "amount",
          message: "Digite o valor que você deseja sacar",
        },
      ]).then((answers) => {
        const {amount} = answers;
        account.balance -= amount;
        console.log(`Sacou ${amount} da sua conta. Seu novo saldo é ${account.balance}`);
        accountMenu(account);
      });
}

function deposit(account) {
    inquirer.prompt([
        {
          type: "number",
          name: "amount",
          message: "Digite o valor que você deseja depositar",
        },
      ]).then((answers) => {
        const {amount} = answers;
        account.balance += amount;
        console.log(`Depositou ${amount} na sua conta. Seu novo saldo é ${account.balance}`);
        accountMenu(account);
      });
}

    function transfer(account) {
    inquirer.prompt([
        {
          type: "number",
          name: "amount",
          message: "Digite o valor que você deseja transferir",
        },
      ]).then((answers) => {
        const {amount} = answers;
        account.balance -= amount;
        console.log(`Transferiu ${amount} para sua conta. Seu novo saldo é ${account.balance}`);
        accountMenu(account);
      });
}

function createAccount() {
    inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "Digite seu nome",
        },
      ]).then((answers) => {
        const {name} = answers;
        const accounts = JSON.parse(fs.readFileSync("data/accounts.json", "utf-8"));
        const newAccount = {
            account: accounts.accounts.length + 1,
            name: name,
            password: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            balance: 0,
        };
        accounts.accounts.push(newAccount);
        fs.writeFileSync("data/accounts.json", JSON.stringify(accounts, null, 2));
        console.log(`Conta criada para ${name}`);
        start();
      });
}


