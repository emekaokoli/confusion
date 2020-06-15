
import React from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';

 

export default class App extends React.Component{
   renderDish(dish){
    if (dish !== null) {
      return 
      
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
             --{param.author} ,
             {new Intl.DateTimeFormat('en-US', {
               year: 'numeric',
               month: 'short',
               day: '2-digits',
             }).format(new Date().parse(param.date))}
           </li>
         </ul>
       )
     })
   } else {
     return <></>
   }
  }
  render() {
    console.log('====================================');
    console.log(this.props);
    console.log('====================================');
      return (
        <>
          <Card>
            <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
            <CardBody>
              <CardTitle>{this.props.dish.name}</CardTitle>
              <CardText>{this.props.dish.description}</CardText>
            </CardBody>
          </Card>
        </>
      )
}
}