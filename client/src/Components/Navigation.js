import React from 'react'

function Navigation({postPerPage, totalPosts, paginate, previousPage, nextPage}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts/postPerPage); i++) {
        pageNumbers.push(i);
        
    }


  return (
<nav aria-label="Page navigation example">
  <ul class="inline-flex -space-x-px gap-1 items-center">
    <li 
    onClick={() => previousPage()}
    className='cursor-pointer px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
       Previous 
    </li>
    {pageNumbers && pageNumbers.map((number) => (
            <li  key={number} onClick={() => paginate(number)}>
            <a href="#" class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{number}</a>
            </li>
    ))}
    <li 
    onClick={() => nextPage()}
    className='cursor-pointer px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
       Next 
    </li>

  </ul>
</nav>
  )
}

export default Navigation