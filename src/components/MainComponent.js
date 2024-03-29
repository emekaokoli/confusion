import { Component, default as React } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { fetchComments, fetchDishes, fetchLeaders, fetchPromos, postComment, postFeedback } from '../redux/ActionCreators';
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
   
   postFeedback: (firstname,lastname,telnum,email,agree,contactType,message)=>
   dispatch(postFeedback(firstname,lastname,telnum,email,agree,contactType,message)),

   postComment: (dishId, rating, author, comment) =>
     dispatch(postComment(dishId, rating, author, comment)),
   fetchDishes: () => {
     dispatch(fetchDishes())
   },
   
   resetFeedbackForm: () => {
     dispatch(actions.reset('feedback'))
   },
  //  resetCommentForm: () => {
  //    dispatch(actions.reset('userComment'))
  //  },
   fetchComments: () => dispatch(fetchComments()),
   fetchPromos: () => dispatch(fetchPromos()),
   fetchLeaders: () => dispatch(fetchLeaders()),
 })

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes()
    this.props.fetchComments()
    this.props.fetchPromos()
    this.props.fetchLeaders()
  
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}

          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promoLoading={this.props.promotions.isLoading}
          promoErrMess={this.props.promotions.errMess}

          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
          leaderLoading={this.props.leaders.isLoading}
          leaderErrMess={this.props.leaders.errMess}
        />
      )
    }
    
    const DishWithId = ({ match }) => {
    
      return (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10),
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10),
          )}
          resetCommentForm={this.props.resetCommentForm}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
        />
      )
    }

    return (
      <>
        <Header />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames='page'
            timeout={300}
          >
            <Switch location={this.props.location}>
              <Route path='/home' component={HomePage} />
              <Route
                exact
                path='/menu'
                component={() => <Menu dishes={this.props.dishes} />}
              />
              <Route
                exact
                path='/contactus'
                component={() => {
                  
                  return (
                    <Contact
                      resetFeedbackForm={this.props.resetFeedbackForm}
                      postFeedback={this.props.postFeedback}
                    />
                  )
                }}
              />
              <Route
                exact
                path='/aboutus'
                component={() => <About leaders={this.props.leaders} />}
              />
              <Route path='/menu/:dishId' component={DishWithId} />
              <Redirect to='/home' />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </>
    )
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))