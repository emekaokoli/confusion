import { Component, default as React } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { DISHES } from '../shared/dishes';
import Footer from './FooterComponent';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';


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
    const HomePage = () => {
      return <Home />
    }
    return (
      <>
      <Header/>

        <Switch>
          <Route path='/home' component={HomePage} />
          <Route
            exact
            path='/menu'
            component={() => <Menu dishes={this.state.dishes} />}
          />
          <Redirect to='/home' />
        </Switch>
        <Footer/>
      </>
    )
  }
}
