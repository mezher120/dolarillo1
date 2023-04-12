import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Table from './Components/Table';
import Footer from './Components/Footer';
import { Router, Route } from 'react-router-dom';
import LogIn from './pages/LogIn';
import SignIn from './pages/SignIn';
import Converter from './pages/Converter';
import Favorites from './pages/Favorites';


function App() {
  return (
    <div className="App">
        <Route exact  path={"/"}>
        <Navbar></Navbar>
        <Home></Home>
        <Table></Table>
        <Footer></Footer>
        </Route>
        <Route path={"/signin"}>
          <SignIn></SignIn>
        </Route>
        <Route path={"/login"}>
          <LogIn></LogIn>
        </Route>
        <Route path={"/converter"}>
          <Navbar></Navbar>
          <Converter></Converter>
        </Route>
        <Route path={"/favorites"}>
        <Navbar></Navbar>
        <Favorites></Favorites>
        </Route>
    </div>
  );
}

export default App;
