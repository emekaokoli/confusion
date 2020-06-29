import React from 'react'
import { Control, Errors, LocalForm } from 'react-redux-form'
import {
  Button,
  Col,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row
} from 'reactstrap'

export default class CommentForm extends React.Component {
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

  handleSubmit(values) {
    this.toggle()
    this.props.addComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment,
    )
    // e.preventDefault()
    this.setState({
      author: '',
      rating: '',
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
                    htmlFor='rating'
                    name='rating'
                    className='form-check-input'
                    md={{ size: 2, offset: 2 }}
                  >
                    Ratings
                  </Label>
                </Col>
                <Col md={{ size: 10, offset: 1 }}>
                  <Control.select
                    model='.rating'
                    name='rating'
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
                // onClick={(e) => this.handleSubmit(e)}
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
