import { Component, default as React } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import './App.css';
import MenuComponent from './components/MenuComponent';
import { DISHES } from './shared/dishes';



export class App extends Component {
  constructor(props){
    super(props)
    this.state ={
      dishes:DISHES
    }
  }
    render() {
      return (
           <div>
           <Navbar dark color="primary">
             <div className="container">
               <NavbarBrand href="/">Ristorant Con Fusion</NavbarBrand>
             </div>
           </Navbar>
           <MenuComponent  dishes={this.state.dishes}/>
           </div>
           )
         }
       }

export default App


