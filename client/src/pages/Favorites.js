import { collection, deleteDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useMemo, useState } from 'react'
import { auth, db } from '../firebase';
import { XMarkIcon, Bars4Icon } from '@heroicons/react/24/solid'

function Favorites() {

    const [favorites, setFavorites] = useState();

    useEffect(() => {
        // try {
        //     const fetchData = async () => {
        //         const q = query(collection(db, 'favorites'), where('username' == auth.currentUser.uid))
        //         const querySnapshot = await getDoc(db, 'favorites', '66BmT9xpG05zc6zm4ku1');
                
        //         console.log(querySnapshot)
        //     } 
            
        // } catch (error) {
        //     console.log(error.message)
        // }

        fetchData();
    },[])

   async function fetchData(params) {
        try {
            
            const querySnapshot = await getDocs(collection(db, 'favorites'));
            console.log(querySnapshot)
            const data = querySnapshot.docs.map((doc) => ({...doc.data(),   id: doc.id})).filter((doc) => doc.username == auth.currentUser.uid);
            console.log(data)
            setFavorites(data);
        } catch (error) {
            console.log(error)
        }
    }

    function goTo(params) {
        const idName = params.toLowerCase();
        return window.location.href = `https://www.coingecko.com/es/monedas/${idName}`
    }
    
    
    async function deleteFavorite(id, index) {
        try {
            console.log(id)
            const newFavorites = [...favorites]
            newFavorites.splice(index, 1);

            setFavorites(newFavorites);
            await deleteDoc(doc(db, 'favorites', id));

        } catch (error) {
            console.log(error)
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
                        More...
                    </th>
                </tr>
            </thead>
            <tbody>
                {favorites && favorites.map((favorite, index) => (

                <tr key={favorite.id} class=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {favorite.name}
                </th>
                <td class="px-6 py-4">
                    {favorite.symbol}
                </td>
                <td class="px-6 py-4">
                    {favorite.price}
                </td>
                <td class="px-6 py-4">
                    {favorite.percentage}
                </td>
                <td className='flex flex-row items-center gap-4 py-4'>
                    <XMarkIcon onClick={() => deleteFavorite(favorite.id, index)} className='w-6 h-6 cursor-pointer hover:text-red-500 '></XMarkIcon>
                    <Bars4Icon onClick={() => goTo(favorite.name)} className='w-6 h-6 cursor-pointer hover:text-blue-700'></Bars4Icon>
                </td>
                </tr>
                ))}
                
            </tbody>

        </table>
    </div>
  )
}

export default Favorites;