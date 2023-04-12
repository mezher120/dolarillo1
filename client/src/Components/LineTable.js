import React from 'react'
import { StarIcon, Bars4Icon } from '@heroicons/react/24/solid'
import { Box, Button, Typography, Modal } from '@mui/material'
import Navigation from './Navigation';
import {auth, db} from '../firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

function LineTable({num, icon, name, symbol, price, percentage}) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const docAddRef = collection(db, 'favorites'); // for addDoc


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  function handleOnClick() {
    const lowerName = name.toLowerCase();
    window.location.href = `https://www.coingecko.com/es/monedas/${lowerName}`
  }

  async function addToFavorites(params) {
    const newFavorite = await addDoc(docAddRef, {
      name: name,
      symbol: symbol,
      price: price,
      percentage: percentage,
      username: auth.currentUser.uid
    })
  }

  return (
    <tr class=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div className='flex gap-2 items-center'>
                    {num}
                    <img src={icon} alt={name} className='w-7 h-7'></img>
                    {name}
                    </div>
                </th>
                <td class="px-6 py-4">
                {symbol}
                </td>
                <td class="px-6 py-4">
                    {price && price.toFixed(2)}
                </td>
                <td class="px-6 py-4">
                  {percentage && percentage < 0 
                  ? <span className="text-red-400">{percentage && percentage.toFixed(2)}%</span>
                  : <span className="text-green-400">{percentage && percentage.toFixed(2)}%</span> }

                </td>
                <td class="py-4 text-right flex gap-4">
                    <StarIcon onClick={() => addToFavorites()} className='w-6 h-6 cursor-pointer hover:text-yellow-500 '></StarIcon>
                    <Bars4Icon onClick={handleOpen} className='w-6 h-6 cursor-pointer hover:text-blue-700' ></Bars4Icon>
                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                  <div className='flex flex-col gap-1'>
                  <img className='h-10 w-10' src={icon}></img>

                  <div className='border-b-2 border-gray-200 '></div>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    {name}
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Price right now: {price}
                  </Typography>
                  <button className='text-right hover:text-blue-600 hover:underline' onClick={() => handleOnClick()}>Find more...</button>
                  </div>
                </Box>
                </Modal>
                </td>
        </tr>

  )
}

export default LineTable