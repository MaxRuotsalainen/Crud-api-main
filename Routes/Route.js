
const express = require("express")
const router = express.Router();
const fs = require('fs');
const accountRoutes = require('./account.js') // Importera account.js filen
router.use(accountRoutes) // använda account route
module.exports = router;