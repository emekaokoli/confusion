
import React from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';

 


 
  
   function RenderDish({dish}) {
    if (dish !== null) {
    return (
      <div>
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    )
    }  else {
       return <></>
     }
  }

 function RenderComments({comments}) {
   if (comments !== null) {
     return comments.map((param) => {
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

  const  DishDetail = (props) => {
     return (
       <>
         <RenderDish dish={props.dish} />
         <RenderComments comments={props.dish.comments} />
       </>
     )
  }

export default DishDetail