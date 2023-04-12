import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios';

function Converter() {

    const [dollars, setDollars] = useState([]);
    const [numDollar, setNumDollar] = useState('');
    const [numPesos, setNumPesos] = useState('');
    const [option, setOption] = useState("Dolar Oficial")

    useMemo(() => {
        let numUpdate = 0;
        const optionSelected = dollars.find((dollar) => dollar.casa.nombre == option)
        console.log(optionSelected)
        console.log(option)
        if (optionSelected) {
            numUpdate = numDollar * parseInt(optionSelected.casa.venta);
            console.log(numUpdate)
            setNumPesos(numUpdate)
        }  
    }, [numDollar])

    useMemo(() => {
        let numUpdate = 0;
        const optionSelected = dollars.find((dollar) => dollar.casa.nombre == option)
        console.log(optionSelected)
        console.log(option)
        if (optionSelected) {
            numUpdate = numPesos / parseInt(optionSelected.casa.venta);
            console.log(numUpdate)
            setNumDollar(numUpdate)
        }  
    }, [numPesos])
    
    function handleSelect(e) {
        e.preventDefault();
        console.log(e.target.id)
        setOption(e.target.value)
    }
    
    useEffect(() => {
        const fetchDataDollars = async () => {
            try {
                const res = await axios.get('http://localhost:3001/all');
                setDollars(res.data);
                console.log(dollars);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchDataDollars();
    },[]);



  return (
    <div className='flex flex-col justify-center items-center mt-20'>
        <h1 className='font-bold text-xl'>Converter Calculator</h1>
        <br></br>
        <div className="flex flex-row w-auto relative">
        <input type='number'
        name='dollar'
        value={numDollar}
        onChange={(e) => setNumDollar(e.target.value)}
        className="z-0 w-[600px] h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></input>
        <div className='flex flex-row absolute left-[60%] z-10 gap-2 items-center'>
            <div className='border border-gray-300 h-7'></div>
        <select onChange={(e) => handleSelect(e)} name='dolars' className='h-11 bg-transparent w-56' >
            {dollars && dollars.map((dollar, index) => (
                <option key={index} value={dollar.casa.nombre}> {dollar.casa.nombre}</option> 
            ))}        
       </select>
        </div>

        </div>
        <br></br>
        <div className="flex flex-row w-auto relative">
        <input type='number'
        name='pesos'
        value={numPesos}
        onChange={(e) => setNumPesos(e.target.value)}
        className="z-0 w-[600px] h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></input>
        <div className='flex flex-row absolute left-[60%] z-10 gap-2 items-center'>
            <div className='border border-gray-300 h-7'></div>
        <select id='pesos' name='pesos' className='h-11 bg-transparent w-56' >
            <option value='pesos'> Peso Argentino</option>
        </select>
        </div>

        </div>
    </div>
  )
}

export default Converter;