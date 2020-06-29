import React from 'react'
import { Control, Errors, LocalForm } from 'react-redux-form'
import { Link } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row
} from 'reactstrap'

function RenderDish({ dish }) {
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
  } else {
    return <></>
  }
}

function RenderComments({ comments }) {
  if (comments !== null) {
    return comments.map((param) => {
      return (
        <div key={param.id}>
          <ul className='list-unstyled'>
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
        </div>
      )
    })
  } else {
    return <></>
  }
}

class CommentForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isModalOpen: false,
    }

    this.toggle = this.toggle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  toggle() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    })
  }

  handleSubmit(e) {
    this.toggle()
    console.log('Current State is: ' + JSON.stringify(e))
    alert('Current State is: ' + JSON.stringify(e))

    e.preventDefault()
    this.setState({
      author: '',
      ratings: '',
      message: '',
      touched: {
        author: false,
        ratings: false,
        message: false,
      },
    })
  }
  render() {
    const required = (val) => val && val.length
    const maxLength = (len) => (val) => !val || val.length <= len
    const minLength = (len) => (val) => val && val.length >= len
    return (
      <>
        <Button outline onClick={this.toggle}>
          <span className='fa fa-pen fa-lg'></span>Write Comment
        </Button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Comments form</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className='form-group'>
                <Col className='form-select'>
                  <Label
                    htmlFor='ratings'
                    name='ratings'
                    className='form-check-input'
                    md={{ size: 2, offset: 2 }}
                  >
                    Ratings
                  </Label>
                </Col>
                <Col md={{ size: 10, offset: 1 }}>
                  <Control.select
                    model='.ratings'
                    name='ratings'
                    className='form-control'
                  >
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className='form-group'>
                <Label htmlFor='author' md={2}>
                  Your Name
                </Label>
                <Col md={10}>
                  <Control.text
                    model='.author'
                    id='author'
                    name='author'
                    placeholder='Your Name'
                    className='form-control'
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className='text-danger'
                    model='.author'
                    show='touched'
                    messages={{
                      required: 'Required ',
                      minLength: ' Must be greater than 2 characters',
                      maxLength: ' Must be 15 characters or less',
                    }}
                  />
                </Col>
              </Row>
              <Row className='form-group'>
                <Label htmlFor='message' md={2}>
                  Your Feedback
                </Label>
                <Col md={10}>
                  <Control.textarea
                    model='.message'
                    id='message'
                    name='message'
                    rows='6'
                    className='form-control'
                  />
                </Col>
              </Row>
              <Button
                type='submit'
                // value='submit'
                color='primary'
                onClick={(e) => this.handleSubmit(e)}
              >
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    )
  }
}

const DishDetail = (props) => {
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
          <CommentForm />
        </div>
      </div>
    </div>
  )
}

export default DishDetail
