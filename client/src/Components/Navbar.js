import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import axios from 'axios';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { signOut } from 'firebase/auth'; 
import iconAvatar from '../images/avatar.png'


function Navbar() {

  const [typing, setTyping] = useState();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([{label: "bitcoin", year: "1"}, {label: "ethereum", year: "1"} ]);
  console.log(options.length)
  const [user, setUser] = useState();
  const newUser = auth.currentUser;
  console.log(newUser, 'en nav');

  useEffect(() => {
    setUser(localStorage.getItem('user'));
    console.log(user, 'en nav')
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          username: user.displayName || user.email,
          image: user.photoURL || iconAvatar,
          email: user.email,
        })
      } else {
        console.log('iam not here');
      }
    } )
  },[])

  function handleOnClick() {
    const element = document.getElementById('autocomplete');
    console.log(element.value)
    const elementLow = element.value.toLowerCase();
    window.location.href = `https://www.coingecko.com/es/monedas/${elementLow}`

  }

  async function logOut() {
    try {
      await signOut(auth)
      window.location.href = '/'
      localStorage.removeItem('user')
    } catch (error) {
      
    }
  }

  async function coinsSearch() {
    const res = await axios.get('/cryptosSearch');
    setOptions(res.data);
    console.log(options)
  }

useLayoutEffect(() => {
  coinsSearch();
},[])


function changeView() {
  let view = document.getElementById('navbar-default');
   
    view.style.display = 'inline';

}


  return (

<nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 mb-5">
  <div class="   flex flex-wrap items-center justify-between mx-auto">
    <div className='flex w-auto'>
    <a href="/" class="flex items-center">
        <img src="https://img2.freepng.es/20180301/hvw/kisspng-dollar-sign-currency-symbol-coin-symbol-5a97f0afec34b4.5174808515199069919675.jpg" class="h-6 mr-3 sm:h-9" alt="Dolarillo Logo" />
        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Dolarillo</span>
    </a>
    <button onClick={() => changeView()} data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
      <span class="sr-only">Open main menu</span>
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
    </button>

    </div>
  
    {/* search */}
    <div className='flex'>
    <Autocomplete
    disablePortal
    id="autocomplete"
    options={options}
    sx={{ width: 300 }}
    renderInput={(params) => <TextField {...params} label="Search for Coins..." />}
  />
  <button className='h-10 self-center ml-2 border border-blue-500 text-white font-semibold bg-blue-400 hover:bg-blue-600  rounded-md p-1' onClick={() => handleOnClick()}>Search</button>

    </div>

    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="flex flex-col justify-center items-center p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a href="/" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</a>
        </li>
        <li>
          <a href="/converter" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Converter</a>
        </li>
        <li>
          <a href="/favorites" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Favorities</a>
        </li>

        { user ? 
        <li className='flex flex-row items-center gap-1'>
          <img className='w-10 h-10 rounded-full' src={user.image} alt=" "></img>
          <a onClick={() => logOut()} href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">  {user.username}</a>
        </li> :         
        <li>
          <a href="/login" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Sign In</a>
        </li> }
      </ul>
    </div>
  </div>
</nav>

  )
}

export default Navbar