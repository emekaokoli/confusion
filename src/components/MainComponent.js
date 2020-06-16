import { Component, default as React } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { COMMENTS } from '../shared/comments';
import { DISHES } from '../shared/dishes';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import Contact from './ContactComponent';
import Footer from './FooterComponent';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';


export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }

  // onDishSelected(dishId){
  //   this.setState({selectedDish:dishId})
  // }
  
  render() {
     const HomePage = () => {
       return (
         <Home
           dish={this.state.dishes.filter((dish) => dish.featured)[0]}
           promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
           leader={this.state.leaders.filter((leader) => leader.featured)[0]}
         />
       )
     }
    return (
      <>
        <Header />
        <Switch>
          <Route path='/home' component={HomePage} />
          <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes}/>}/>
          <Route exact path='/contactus' component={Contact} />
          <Redirect to='/home' />
        </Switch>
        <Footer />
      </>
    )
  }
}
