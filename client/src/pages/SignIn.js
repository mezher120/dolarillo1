import React, { useState } from 'react'
import { auth, googleProvider } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import icon from '../images/googleIcon.png';


function SignIn() {

  const [newUser, setNewUser] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(false);
  const [error1, setError1] = useState(false);


  async function createNewUser(e) {
    e.preventDefault();
    try {
        await createUserWithEmailAndPassword(auth, newUser, newPassword);
        console.log(auth.currentUser.email)
        setError(false);
        window.location.href = '/login'
    } catch (error) {
        console.error(error.message)
        if (error.message.includes('already-in-use')) {
            setError(true);
            setError1(false);
        }
        if (error.message.includes('weak-password')) {
            setError1(true);
            setError(false);
        }
    }
  }

  async function createUserGoogle() {
    try {
        await signInWithPopup(auth, googleProvider);
        localStorage.setItem('user', auth.currentUser.email);
        console.log(auth.currentUser.email)     
        window.location.href = '/';
    } catch (error) {
        console.log(error)
    }
  }



  return (
      <div class="px-6 py-6 lg:px-8 flex flex-col justify-center items-center h-screen">
                <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign up to our platform</h3>
                <form class="space-y-6" action="#" onSubmit={(e) => createNewUser(e)}>
                    <div>
                        <label for="email" class=" mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input onChange={(e) => setNewUser(e.target.value)} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label for="password" class=" mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input onChange={(e) => setNewPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    {error ? <p className='text-red-500'> Email Already in use</p> : ""}
                    {error1 ? <p className='text-red-500'> Password must be at least 6 characters</p> : ""}
                    <input type='submit' value='Create Account' className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' ></input>
                    <br></br>
                    {/* <button onClick={() => createUserGoogle()} type="button" class="gap-2 text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2">
                    <img className='w-7 h-7' src={icon} alt='google'></img>
                    Connect with Google
                    </button> */}
                </form>
            </div>
  )
}

export default SignIn