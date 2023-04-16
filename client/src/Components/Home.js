import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CoinsTarget from './CoinsTarget';
import {useFirebaseApp, useFirestoreCollection} from 'reactfire'


function Home() {

const [coins, setCoins] = useState([]);
const firesbaseApp = useFirebaseApp();
console.log(firesbaseApp)

useEffect(() => {
  fetchData();
}, [])

async function fetchData() {
  try {
    const response = await axios.get('/all');
    setCoins(response.data);
  } catch (error) {
    console.log(error.message)
  }
}

  return (
    <div className='bg-slate-200 py-3 overflow-x-auto'>
      <div className='flex gap-2 justify-center'>
      {coins && coins.map((coin) => (
        <CoinsTarget name={coin.casa.nombre} buy={coin.casa.compra} sell={coin.casa.venta} ></CoinsTarget>
      ))}
      </div>


    </div>
    
  )
}

export default Home