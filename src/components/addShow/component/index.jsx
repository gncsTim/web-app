import React, { Component } from 'react'
import Container from "react-bootstrap/Container"
import { Form, Button } from 'react-bootstrap'
import Datetime from 'react-datetime'
// import { WithContext as ReactTags } from 'react-tag-input';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import uuidv1 from 'uuid/v1'
import { Col, Row } from 'react-bootstrap'

// interface IAddShowForm {
//     name: string
// }

// type AddEventProps = {
//     addEvent: any
//   }

// const initialAddShowData = {
//     name: '',
//     date: null,
//     headliner: ''
// }

const genres = [
    { id: 'genre:punk', text: 'Punk' },
    { id: 'genre:metal', text: 'Metal' },
    { id: 'genre:death_metal', text: 'Death Metal' },
    { id: 'genre:stoner', text: 'Stoner' }
 ]

 const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class AddShow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            headliner: '',
            headlinerGenre: [],
            date: null,
            support: {
                [uuidv1()]: {
                    name: '',
                    geners: []
                }
            }
        }
        this.handleDeleteHeadlinerGenre = this.handleDeleteHeadlinerGenre.bind(this)
        this.handleDeleteSupportGenre = this.handleDeleteSupportGenre.bind(this)
        this.handleAddition = this.handleAddition.bind(this)
        this.handleChangeTextInput = this.handleChangeTextInput.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeSupport = this.handleChangeSupport.bind(this)
        this.addSupport = this.addSupport.bind(this)
        this.deletSupport = this.deletSupport.bind(this)
        this.handleAddShow = this.handleAddShow.bind(this)
    }

    handleAddShow(e) {
        console.log(this.state)
        const {name, headliner, date} = this.state
        const event = {
            name,
            headliner,
            date: date.format()
        }
        this.props.addEvent(event)
    }

    handleDeleteHeadlinerGenre = i => {
        const {headlinerGenre} = this.state
        this.setState({
            headlinerGenre: headlinerGenre.filter((tag, index) => index !== i)
        })
    }

    handleDeleteSupportGenre = key => i => {
        let support = Object.assign(this.state.support, {})
        support[key].geners = support[key].geners.filter((tag, index) => index !== i)
    }

    handleAddition = key => tag => {
        if (!key) {
            return this.setState({headlinerGenre: this.state.headlinerGenre.concat([tag])});
        }
        let support = Object.assign(this.state.support, {})
        support[key].geners = support[key].geners.concat([tag])
        this.setState({support})
    }

    handleChangeTextInput(event) {
        const {currentTarget} = event
        this.setState({
            [currentTarget.name]: currentTarget.value
        })
    }

    handleChangeDate (date) {
        this.setState({date})
    }

    handleChangeSupport = key => event => {
        const support = Object.assign(this.state.support, {})
        support[key].name = event.currentTarget.value
        this.setState({support})
    }

    addSupport() {
        const support = Object.assign(this.state.support, {})
        support[uuidv1()] = {
            name: '',
            geners: []
        }
        this.setState({support})
    }

    deletSupport = key => event => {
        let support = Object.assign(this.state.support, {})
        delete support[key]
        this.setState({support})
    }

    handleSubmit(event) {
        event.preventDefault()
        const {name, date, headliner, headlinerGenre, support } = this.state
        const artist_details = [
            {
                name: headliner,
                genres: headlinerGenre,
                links: []
            }
        ]
        Object.keys(support).forEach(key => {
            artist_details.push(support[key])
        })
        const data = {
            name,
            date,
            artist_details
        }
        if (support && Object.keys(support).length > 0) {
            data.support = Object.keys(support).map(key => support[key].name)
        }
    }

    render() {
        const {name, date, headliner, headlinerGenre, support} = this.state
        return (
            <Container>
              <h1>Good Night Couch Side | Add Show</h1>
              {/* TODO:  show only if not editor */}
              <p>That is the place where you can add your show. It will send to our database and will checked by one of our editor</p>

                  <Form onSubmit={this.handleSubmit}>
                  <Row>
                    <Col xs={12} md={8}>
                      <Form.Group id='name'>
                          <Form.Label>Show name</Form.Label>
                          <Form.Control
                              type="text"
                              value={name}
                              name='name'
                              onChange={this.handleChangeTextInput}
                          />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>

                      <Form.Group id='date'>
                          <Form.Label>Date</Form.Label>
                          <Datetime
                              value={date}
                              onChange={this.handleChangeDate} />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={8}>
                      <Form.Group id='headliner'>
                          <Form.Label>Headliner</Form.Label>
                          <Form.Control
                              type="text"
                              value={headliner}
                              name='headliner'
                              onChange={this.handleChangeTextInput}
                          />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Group>
                        <Form.Label>Headliner Genre</Form.Label>
                        <Autocomplete
                            multiple
                            id="size-small-filled-multi"
                            size="small"
                            options={genres}
                            getOptionLabel={option => option.title}
                            renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip
                                variant="outlined"
                                label={option.title}
                                size="small"
                                {...getTagProps({ index })}
                                />
                            ))
                            }
                            renderInput={params => (
                            <TextField
                                {...params}
                                variant="filled"
                                label="Size small"
                                placeholder="Favorites"
                                fullWidth
                            />
                            )}
                        />
                      </Form.Group>
                      </Col>
                      <Col>
                        <hr />
                      </Col>
                    {Object.keys(support).map(key => {
                        const item = support[key]
                        return (
                          <Col md={12} key={key}>
                                <Row>
                                  <Col xs={12} md={6}>
                                    <Form.Group id={key}>
                                        <Form.Label>Support</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={item.name}
                                            onChange={this.handleChangeSupport(key)}
                                        />
                                    </Form.Group>
                                  </Col>
                                  <Col xs={12} md={6}>
                                    <Form.Group>
                                      <Form.Label>Supprt Genre</Form.Label>
                                      <Row>
                                      <Col md={6} xs={6}>
                                      {/* <ReactTags tags={item.geners}
                                          suggestions={genres}
                                          handleDelete={this.handleDeleteSupportGenre(key)}
                                          handleAddition={this.handleAddition(key)}
                                          delimiters={delimiters} /> */}
                                      </Col>
                                      <Col md={2} xs={3}>
                                          <Button className="btn-block"
                                              variant='danger'
                                              onClick={this.deletSupport(key)}
                                              disabled={support.length <= 1}>
                                              X
                                          </Button>
                                          </Col>
                                          <Col md={4}  xs={3}>
                                          <Button className="btn-block"
                                            variant='primary' onClick={this.addSupport}>
                                            +
                                          </Button>
                                          </Col>
                                          </Row>
                                    </Form.Group>
                                  </Col>
                                </Row>
                            <hr />
                          </Col>
                    )})}
                      <Col>
                        <Button variant='primary' type='submit' onClick={this.handleAddShow}>
                            Add that fucking Show!
                        </Button>
                      </Col>
                    </Row>
                  </Form>
            </Container>
        );
    }
}

export default AddShow
