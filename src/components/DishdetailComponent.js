
import React from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';



const DishDetails = (props)  => {

  console.log('==================DISH COMPONENT==================')
  console.log(props.dish.name);
  console.log('====================================');
      return (
        <>
          <Card>
            <CardImg top src={props.dish.image} alt={props.dish.name} />
            <CardBody>
              <CardTitle>{props.dish.name}</CardTitle>
              <CardText>{props.dish.description}</CardText>
            </CardBody>
          </Card>
        </>
      )
}

export default  DishDetails