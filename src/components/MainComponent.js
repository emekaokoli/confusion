import { Component, default as React } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { DISHES } from '../shared/dishes';
import DishDetails from './DishdetailComponent';
import MenuComponent from './MenuComponent';


export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dishes: DISHES,
      selectedDish:null
    }
  }

  onDishSelected(dishId){
    this.setState({selectedDish:dishId})
  }

  
  render() {
    return (
      <>
        <Navbar dark color='primary'>
          <div className='container'>
            <NavbarBrand href='/'>Ristorant Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <MenuComponent dishes={this.state.dishes} 
          onClick={(dishId) => this.onDishSelected(dishId)}
        />
        <DishDetails dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/>
      </>
    )
  }
}
