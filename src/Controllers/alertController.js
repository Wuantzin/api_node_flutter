const express = require('express');
const pool = require('../config/configdb.js');
const Usuario = require('../Models/userModel.js');
const Validacoes = require('../Utils/validators.js');
const userService = require('../Services/userService.js');
const app = express();
const cors = require('cors');
const e = require('express');
app.use(cors()); 

const alertController = {

    postarAlerta: async (req, res) => {
        console.log('testando')
    }
}

module.exports = alertController;