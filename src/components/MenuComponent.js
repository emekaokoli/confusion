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
    if (dish !== null) {
      return <DishDetails dish={dish}/>
      
    } else {
      return <></>
    }
  }

 renderComments(comment){
 
   if (comment !== null) {
     return comment.comments.map((param) => {
       return (
         <ul key={param.id} className='list-unstyled'>
           <li>{param.comment}</li>
           <li>
             --{param.author} ,{moment(param.date).format('M,Y')}
           </li>
         </ul>
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

    return (
      <div className='container'>
        <div className='row'>{menu}</div>
        <div className='row'>
          <div className='col-12 col-md-5 m-1'>{this.renderDish(this.state.selectedDish)}</div>
          <div className='col-12 col-md-5 m-1'>
            <h4>Comments</h4>
            {this.renderComments(this.state.selectedDish)}
          </div>
        </div>
      </div>
    )
  }
}
