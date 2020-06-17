import { Component, default as React } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { COMMENTS } from '../shared/comments';
import { DISHES } from '../shared/dishes';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import About from './AboutComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
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
    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.state.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10),
            )[0]
          }
          comments={this.state.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10),
          )}
        />
      )
    }
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
          <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />}
          />
          <Route exact path='/contactus' component={Contact} />
          <Route exact path='/aboutus' component={() => <About leaders={this.state.leaders}/>}/>
          <Route path='/menu/:dishId' component={DishWithId} />
          <Redirect to='/home' />
        </Switch>
        <Footer />
      </>
    )
  }
}
