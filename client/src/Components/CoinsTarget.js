import React from 'react'
import { CurrencyDollarIcon } from '@heroicons/react/24/solid'

function CoinsTarget({name, buy, sell}) {
  return (
    <div className='flex'>
    <a href="#" class="w-48 h-48 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <div className='flex justify-center'>
    <CurrencyDollarIcon class='h-10 w-10 text-green-700'></CurrencyDollarIcon> 
    </div>
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {(name === "Dolar Contado con Liqui") ? "Dolar CCL" : name }</h5>
    <p class="font-semibold text-gray-700 dark:text-gray-400">Buy: {buy}</p>
    <p class="font-semibold text-gray-700 dark:text-gray-400">Sell: {sell}</p>
    </a>
  </div>
  )
}

export default CoinsTarget