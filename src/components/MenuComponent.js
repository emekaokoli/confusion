import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardImgOverlay, CardText, CardTitle } from 'reactstrap';


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
      return(
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      )
      
    } else{
      return(
        <></>
      )
    }
  }
    
  render() {
    const menu = this.props.dishes.map((dish) => {
      return (
        <div key={dish.id} className='col-12 col-md-5 mt-5'>
          <Card key={dish.id} onClick={() => this.onDishSelected(dish)}>
            <CardImg width='30%' src={dish.image} alt={dish.name} />
            <CardImgOverlay  className='ml-5'>
              <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      )
    })
    return (
    <div className="container">
      <div className="row">
        {menu}
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          {this.renderDish(this.state.selectedDish)}
        </div>
      </div>
    </div>
    )
  }
}
