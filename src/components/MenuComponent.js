import moment from 'moment';
import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import DishDetails from '../components/DishdetailComponent';


export default class componentName extends Component {
  constructor(props){
    super(props)
      this.state = {
        selectedDish: null
      }
  }

  onDishSelected(dish){
    this.setState({
      selectedDish:dish
    })
  }

  renderDish(dish){
    if (dish != null) {
      return <DishDetails dish={{ dish }} />
    } else {
      return <></>
    }
  }

  renderComents(dish){
    if (dish != null && dish.comments != null) {
      return dish.comments.map((comment) => {
        return (
          <div key={comment.id}>
            <div>
              <div>  
                <p>{comment.comment}</p>
                <p>--{comment.author} ,{moment(comment.date).format('M,Y')}</p>
              </div>
            </div>
          </div>
        )
      })
    } else {
      return <></>
    }
  }

  render() {
  
   
    const menu = this.props.dishes.map((dish) => {
      
      return (
        <div key={dish.id} className='col-12 col-md-5 mt-5'>
          <Card key={dish.id} onClick={() => this.onDishSelected(dish)}>
            <CardImg width='30%' src={dish.image} alt={dish.name} />
            <CardImgOverlay className='ml-5'>
              <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      )
    })
    const dish = this.renderDish(this.state.selectedDish)
    const comments = this.renderComents(this.state.selectedDish)

    return (
      <div className='container'>
        <div className='row'>{menu}</div>
        <div className='row'>
          <div className='col-12 col-md-5 m-1'>{dish}</div>
          <div className='col-12 col-md-5 m-1'>
            <h4>Comments</h4>
            {comments}
          </div>
        </div>
      </div>
    )
  }
}
