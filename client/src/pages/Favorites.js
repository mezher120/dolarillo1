import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase';

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
            const data = querySnapshot.docs.map((doc) => doc.data()).filter((doc) => doc.username == auth.currentUser.uid);
            console.log(data)
            setFavorites(data);
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
                {favorites && favorites.map((favorite) => (

                <tr class=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

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
                <td>
                    delete/find more...
                </td>
                </tr>
                ))}
                
            </tbody>

        </table>
    </div>
  )
}

export default Favorites;