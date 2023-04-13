import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import axios from 'axios';
import LineTable from './LineTable';
import Navigation from './Navigation';



function Table() {

    const [cryptoCoins, setcryptoCoins] = useState([
        {id: 1, name: 'Bitcoin', symbol: 'BTC', image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579", current_price: 27734, price_change_percentage_24h: -0.1028},
        {id: 2, name: 'Ethereum', symbol: 'BTC', image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880", current_price: 1812.77, price_change_percentage_24h: -0.1028},
        {id: 3, name: 'Tether', symbol: 'BTC', image: "https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663", current_price: 27734, price_change_percentage_24h: 0.1028},
        {id: 4, name: 'BNB', symbol: 'BTC', image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850", current_price: 27734, price_change_percentage_24h: 0.1028},
        {id: 5, name: 'BNB', symbol: 'BTC', image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850", current_price: 27734, price_change_percentage_24h: 0.1028},
        {id: 6, name: 'Bitcoin', symbol: 'BTC', image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579", current_price: 27734, price_change_percentage_24h: -0.1028},
        {id: 7, name: 'Ethereum', symbol: 'BTC', image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880", current_price: 1812.77, price_change_percentage_24h: -0.1028},
        {id: 8, name: 'Tether', symbol: 'BTC', image: "https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663", current_price: 27734, price_change_percentage_24h: 0.1028},
        {id: 9, name: 'BNB', symbol: 'BTC', image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850", current_price: 27734, price_change_percentage_24h: 0.1028},
        {id: 10, name: 'BNB', symbol: 'BTC', image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850", current_price: 27734, price_change_percentage_24h: 0.1028}]);
    const [rerender, setrerender] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(10);

  
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = cryptoCoins.slice(indexOfFirstPost, indexOfLastPost);

    function paginate(pageNumber) {
        setCurrentPage(pageNumber);
    }

    function previousPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function nextPage() {
        if (currentPage < Math.ceil(cryptoCoins.length/postPerPage)) {
            setCurrentPage(currentPage + 1);
        }   
    }



    useLayoutEffect(() => {
        fetchData();
    }, []);
    
async function fetchData() {
    try {
        const apiResCrypto = await axios.get('http://localhost:3001/cryptos')
        console.log(apiResCrypto.data)
        setcryptoCoins(apiResCrypto.data);
        console.log(cryptoCoins)
    } catch (error) {
        console.log(error.message);
    }
    
}


  return (

<div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Symbol
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
                <th scope="col" class="px-6 py-3">
                    Average 24hs
                </th>
                <th scope="col" class="px-6 py-3">
                    <span class="sr-only">More...</span>
                </th>
            </tr>
        </thead>
        <tbody>
            {currentPosts && currentPosts?.map((crypto, index) => (
                <LineTable key={index} num={index+1} icon={crypto.image} name={crypto.name} symbol={crypto.symbol} price={crypto.current_price} percentage={crypto.price_change_percentage_24h}></LineTable>


            ))}
            </tbody>
    </table>
    <br></br>
    <Navigation postPerPage={postPerPage} totalPosts={cryptoCoins.length} paginate={paginate} previousPage={previousPage} nextPage={nextPage}></Navigation>
</div>

  )
}

export default Table