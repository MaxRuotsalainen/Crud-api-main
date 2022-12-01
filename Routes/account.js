const express = require("express")
const accountRoutes = express.Router();
const fs = require('fs');

const dataPath = './Details/useraccount.json' 



const sparaKontoData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}

const getKontoData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)    
}
//sparaKontoData

// läsa all data
accountRoutes.get('/account', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });


  accountRoutes.post('/account/addaccount', (req, res) => {
   
    var existAccounts = getKontoData()
    const newAccountId = Math.floor(100000 + Math.random() * 900000)
   
    existAccounts[newAccountId] = req.body
     
    console.log(existAccounts);

    sparaKontoData(existAccounts);
    res.send({success: true, msg: 'Kontot las till!'})
})

//Visa all data från json filen
accountRoutes.get('/account/list', (req, res) => {
  const accounts = getKontoData()
  res.send(accounts)
})

// Uppdatera data i json filen med (Put metoden)
accountRoutes.put('/account/:id', (req, res) => {
   var existAccounts = getKontoData()
   fs.readFile(dataPath, 'utf8', (err, data) => {
    const accountId = req.params['id'];
    existAccounts[accountId] = req.body;

    sparaKontoData(existAccounts);
    res.send(`Kontot med Id: ${accountId} har blivit uppdaterat`)
  }, true);
});

//Ta bor data från json filen med (Delete metoden)
accountRoutes.delete('/account/delete/:id', (req, res) => {
   fs.readFile(dataPath, 'utf8', (err, data) => {
    var existAccounts = getKontoData()

    const userId = req.params['id'];

    delete existAccounts[userId];  
    sparaKontoData(existAccounts);
    res.send(`Kontot med Id: ${userId} har blivit raderat`)
  }, true);
})
module.exports = accountRoutes