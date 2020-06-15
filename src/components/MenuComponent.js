import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';



export default class componentName extends React.Component {
  constructor(props){
    super(props)
      
  }

  



  render() {
    const menu = this.props.dishes.map((dish) => {
      return (
        <div key={dish.id} className='col-12 col-md-5 mt-5'>
          <Card key={dish.id} onClick={()=>this.props.onClick(dish.id)}>
            <CardImg width='100%' src={dish.image} alt={dish.name} />
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
          <div className='col-12 col-md-5 m-1'>
          {this.renderDish(this.state.selectedDish)}
          </div>
          <div className='col-12 col-md-5 m-1'>
            <h4>Comments</h4>
            {this.renderComments(this.state.selectedDish)}
          </div>
        </div>
      </div>
    )
  }
}
