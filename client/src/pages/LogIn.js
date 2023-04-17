import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import icon from '../images/googleIcon.png'


function LogIn() {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [errorUser, setErrorUser] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);


    async function signIn(e) {
        e.preventDefault();
        try {
           const userLogIn = await signInWithEmailAndPassword(auth, user, password)
            console.log(userLogIn, "entre")
            setErrorUser(false)
            setErrorPassword(false)
            window.location.href = '/';
        } catch (error) {
            console.log(error.message)
            if(error.message.includes("user")) { 
                setErrorUser(true); 
                setErrorPassword(false) }
            if(error.message.includes("password")) { 
                setErrorUser(false);
                setErrorPassword(true) }
        }
    }

    async function createUserGoogle() {
        try {
            await signInWithPopup(auth, googleProvider);
            window.location.href = '/';
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div class="px-6 py-6 lg:px-8 flex flex-col justify-center items-center h-screen">
                <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                <form class="space-y-6" action="#" onSubmit={(e) => signIn(e)}>
                    <div>
                        <label for="email" class=" mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input onChange={(e) => setUser(e.target.value)} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                        {errorUser ? <p class="mt-2 text-xs text-red-600 dark:text-red-400"><span class="font-medium">Oh!</span> The user doesn't exist.</p> : <div/>}
                    </div>
                    <div>
                        <label for="password" class=" mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        {errorPassword ? <p class="mt-2 text-xs text-red-600 dark:text-red-400"><span class="font-medium">Oh!</span> The password is incorrect.</p> : <div/>}
                    </div>
                    {/* <div class="flex justify-between">
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                            </div>
                            <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                        </div>
                        <a href="#" class="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                    </div> */}
                    <input type='submit' value='Login to your account' className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'></input>

                </form>
                <div className='my-5'>

                <div>
                        <button onClick={() => createUserGoogle()} className='type="button" class="gap-2 text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2'>
                            <img className='w-7 h-7' src={icon} alt='Google'></img>
                            Connect with Google
                        </button>
                    </div>
                    
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered? <a href="/signin" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                    </div>
                </div>
            </div>
  )
}

export default LogIn