import { Component, default as React } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { addComment } from '../redux/ActionCreators';
import About from './AboutComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Footer from './FooterComponent';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  }
}
 const mapDispatchToProps = (dispatch) => ({
   addComment: (dishId, rating, author, comment) =>
     dispatch(addComment(dishId, rating, author, comment)),
 })

class Main extends Component {
  
  
  render() {
    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.props.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10),
            )[0]
          }
          comments={this.props.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10),
          )}
          addComment={this.props.addComment}
        />
      )
    }
     const HomePage = () => {
       return (
         <Home
           dish={this.props.dishes.filter((dish) => dish.featured)[0]}
           promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
           leader={this.props.leaders.filter((leader) => leader.featured)[0]}
           
         />
       )
     }

    return (
      <>
        <Header />
        <Switch>
          <Route path='/home' component={HomePage} />
          <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />}
          />
          <Route exact path='/contactus' component={Contact} />
          <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders}/>}/>
          <Route path='/menu/:dishId' component={DishWithId} />
          <Redirect to='/home' />
        </Switch>
        <Footer />
      </>
    )
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))