import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import { FirebaseAppProvider } from 'reactfire'; // firebase in react requires envolve all the app wuith this provider
import { firebaseConfig } from './firebase'; // importing the config for FirebaseAppProvider
import { Suspense } from 'react'; // to show a text waiting data from firebase before rendering


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Suspense fallback={<p>Loading...</p>}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
    </Suspense>
  </FirebaseAppProvider>
);

