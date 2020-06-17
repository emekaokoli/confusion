
import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';


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
               day: '2-digit',
             }).format(new Date(param.date))}
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
         <div className='container'>
           <div className='row'>
             <Breadcrumb>
               <BreadcrumbItem>
                 <Link to='/menu'>Menu</Link>
               </BreadcrumbItem>
               <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
             </Breadcrumb>
             <div className='col-12'>
               <h3>{props.dish.name}</h3>
               <hr />
             </div>
           </div>
           <div className='row'>
             <div className='col-12 col-md-5 m-1'>
               <RenderDish dish={props.dish} />
             </div>
             <div className='col-12 col-md-5 m-1'>
               <RenderComments comments={props.comments} />
             </div>
           </div>
         </div>
       )
  }

export default DishDetail