import React from 'react'
import { Fade, FadeTransform, Stagger } from 'react-animation-components'
import { Control, Errors, Form } from 'react-redux-form'
import { Link } from 'react-router-dom'
import {
  Breadcrumb, BreadcrumbItem, Button, Card, CardBody, CardImg,
  CardText, CardTitle, Col, Label, Modal, ModalBody, ModalHeader, Row
} from 'reactstrap'
import { baseUrl } from '../shared/baseUrl'
import { Loading } from './LoadingComponent'



function RenderDish({ dish }) {
  if (dish !== null) {
    return (
      <>
        <FadeTransform
          in
          transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)',
          }}
        >
          <Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </FadeTransform>
      </>
    )
  } else {
    return <></>
  }
}
function RenderComments({comments, postComment, dishId}){
  if (comments !== null) {
    return (
      <>
        <Stagger in>
          {comments.map((param) => {
         
            return (
              <Fade in key={param.id}>
                <div>
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
              </Fade>
            )
          })}
          <CommentForm dishId={dishId} postComment={postComment}  />
        </Stagger>
      </>
    )
    
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
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
  }

  toggle() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    })
  }

  handleCommentSubmit(values) {

   console.log('comment posted: ' + JSON.stringify(values))
   alert('comment posted: ' + JSON.stringify(values))
    this.toggle()
    this.props.postComment(this.props.dishId, values.rating,
      values.author,values.message)
   
    // e.preventDefault()
    this.setState({
      rating: '',
      author: '',
      message: '',
      touched: {
        author: false,
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
            <Form
              model='userComment'
              onSubmit={(values) => this.handleCommentSubmit(values)}
            >
              <Row className='form-group'>
                <Col className='form-select'>
                  <Label
                    htmlFor='userComment.rating'
                    name='userComment.rating'
                    className='form-check-input'
                    md={{ size: 2, offset: 2 }}
                  >
                    Ratings
                  </Label>
                </Col>
                <Col md={{ size: 10, offset: 1 }}>
                  <Control.select
                    model='userComment.rating'
                    name='userComment.rating'
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
                <Label htmlFor='userComment.author' md={2}>
                  Your Name
                </Label>
                <Col md={10}>
                  <Control.text
                    model='userComment.author'
                    id='userComment.author'
                    name='userComment.author'
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
                    model='userComment.author'
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
                <Label htmlFor='userComment.message' md={2}>
                  Your Feedback
                </Label>
                <Col md={10}>
                  <Control.textarea
                    model='userComment.message'
                    id='userComment.message'
                    name='userComment.message'
                    rows='6'
                    className='form-control'
                  />
                </Col>
              </Row>
              <Button
                type='submit'
                // value='submit'
                color='primary'
                // onClick={(e) => this.handleSubmit(e)}
              >
                Submit
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </>
    )
  }
}

const DishDetail = (props) => {

  if (props.isLoading) {
    return (
      <div className='container'>
        <div className='row'>
          <Loading />
        </div>
      </div>
    )
  } else if (props.errMess) {
    return (
      <div className='container'>
        <div className='row'>
          <h4>{props.errMess}</h4>
        </div>
      </div> 
    )
  } else {
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
            <RenderComments
              comments={props.comments}
              postComment={props.postComment}
              dishId={props.dish.id}
            />
          </div>
        </div>
      </div>
    )
    }
}

export default DishDetail