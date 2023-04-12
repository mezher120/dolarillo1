const { Router } = require('express');
const axios = require('axios');
const API_KEY = process.env.CMC_PRO_API_KEY

const router = Router();

router.get('/all', async (req, res) => {
    try {
        const response = await axios.get('https://www.dolarsi.com/api/api.php?type=valoresprincipales');
        const responseFiltered = response.data.filter(elem => elem.casa.nombre.includes("Dolar"));
        responseFiltered.pop();
        res.json(responseFiltered);
    } catch (error) {
        return res.status(400).send(error.message);
    }
})

router.get('/cryptos', async (req, res) => {
    //`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=cd53bbe6-0cc5-4f98-9ab0-c3c729fcf09f`
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
        const resFiltered = response.data.slice(0,100);
        res.json(resFiltered);
    } catch (error) {
        return console.log(error.message);
    }
})

router.get('/cryptosSearch', async (req, res) => {
    //`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=cd53bbe6-0cc5-4f98-9ab0-c3c729fcf09f`
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
        
        const resFiltered = response.data.map((each) =>  ( {label: each.name, id: 1} ));
        res.json(resFiltered);
    } catch (error) {
        return console.log(error.message);
    }
})

module.exports = router; 