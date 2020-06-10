import { Component, default as React } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import './App.css';



export class App extends Component {
     
         render() {
           return (
           <div className="App">
           <Navbar dark color="primary">
             <div className="container">
               <NavbarBrand href="/">Ristorant Con Fusion</NavbarBrand>
             </div>
           </Navbar>
           </div>
           )
         }
       }

export default App


