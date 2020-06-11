import React from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';


const DishDetails = ({dish})  => {
      return (
        <div>
          <Card>
            <CardImg top src={dish.dish.image} alt={dish.dish.name} />
            <CardBody>
              <CardTitle>{dish.dish.name}</CardTitle>
              <CardText>{dish.dish.description}</CardText>
            </CardBody>
          </Card>
        </div>
      )
}

export default  DishDetails