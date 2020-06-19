import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import { Typeahead } from 'react-bootstrap-typeahead'
import { Form, Button, Col, Row } from 'react-bootstrap'
import Datetime from 'react-datetime'
import uuidv1 from 'uuid/v1'
import crypto from 'crypto'
import ksuid from 'ksuid'
import { LodingComonent } from 'components/modal/loading'
import { WithContext as ReactTags } from 'react-tag-input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faAsterisk } from '@fortawesome/free-solid-svg-icons'
import { isAdminOrEditor } from 'components/user/utils'
import SupportForm from './supportForm'

const KeyCodes = {
  comma: 188,
  enter: 13
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

class ShowForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      date: null,
      venue: '',
      presale: '',
      atTheDoor: '',
      facebookLink: '',
      description: '',
      venueAdress: '',
      headliner: '',
      headlinerGenre: [],
      headlinerLinks: ['', ''],
      support: {
        [uuidv1()]: {
          name: '',
          genres: [],
          links: ['', '']
        }
      }
    }
    this.handleDeleteHeadlinerGenre = this.handleDeleteHeadlinerGenre.bind(this)
    this.handleAddition = this.handleAddition.bind(this)
    this.handleChangeTextInput = this.handleChangeTextInput.bind(this)
    this.handleChangeDate = this.handleChangeDate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeSupport = this.handleChangeSupport.bind(this)
    this.addSupport = this.addSupport.bind(this)
    this.addHeadlinerLinks = this.addHeadlinerLinks.bind(this)
    this.addSupportLinks = this.addSupportLinks.bind(this)
    this.deletSupport = this.deletSupport.bind(this)
    this.handleAddShow = this.handleAddShow.bind(this)
    this.handleChangeVenue = this.handleChangeVenue.bind(this)
    this.handleSelectVenue = this.handleSelectVenue.bind(this)
  }

  componentDidMount() {
    // this.props.resetAddEventRequest()
    // this.props.getAllVenues()
    // this.props.getAllGenres()
  }

  handleAddShow(e) {
    const {
      name,
      venue,
      venueAdress,
      presale,
      atTheDoor,
      facebookLink,
      description,
      headliner,
      headlinerGenre,
      headlinerLinks,
      date,
      support
    } = this.state
    const event = {
      name,
      venue,
      venueAdress,
      presale,
      atTheDoor,
      facebookLink,
      description,
      headliner,
      headlinerGenre,
      headlinerLinks,
      date: date ? date.format() : '',
      support
    }
    // this.props.addEvent(event)
  }

  handleDeleteHeadlinerGenre(i) {
    const { headlinerGenre } = this.state
    this.setState({
      headlinerGenre: headlinerGenre.filter((tag, index) => index !== i)
    })
  }

  handleAddition(key) {
    return tag => {
      if (!key) {
        return this.setState({ headlinerGenre: this.state.headlinerGenre.concat([tag]) })
      }
    }

    // let support = Object.assign(this.state.support, {})
    // support[key].genres.push(tag)
    // this.setState({ support })
  }

  handleChangeTextInput(event) {
    const { currentTarget } = event
    this.setState({
      [currentTarget.name]: currentTarget.value
    })
  }

  handleChangeVenue(venue) {
    this.setState({ venue })
  }

  handleSelectVenue(venues) {
    if (!venues || venues.length === 0) return
    const venue = venues[0]
    this.setState({
      venue: venue.label,
      venueAdress: `${venue.street}, ${venue.zip} ${venue.city}`
    })
  }

  handleChangeDate(date) {
    this.setState({ date })
  }

  handleChangeSupport(key) {
    return event => {
      const support = Object.assign(this.state.support, {})
      let value = event.currentTarget.value
      support[key].name = value
      this.setState({ support })
    }
  }

  addSupport() {
    const support = Object.assign(this.state.support, {})
    support[uuidv1()] = {
      name: '',
      genres: [],
      links: ['', '']
    }
    this.setState({ support })
  }

  handleChangeHeadlinerLinks(index) {
    return event => {
      const headlinerLinks = this.state.headlinerLinks.concat([])
      headlinerLinks[index] = event.target.value
      this.setState({ headlinerLinks })
    }
  }

  addHeadlinerLinks() {
    this.setState({ headlinerLinks: this.state.headlinerLinks.concat(['', '']) })
  }

  handleChangeSupportLinks(key, index) {
    return event => {
      const support = JSON.parse(JSON.stringify(this.state.support))
      support[key].links[index] = event.target.value
      this.setState({ support })
    }
  }

  addSupportLinks(key) {
    return () => {
      const support = JSON.parse(JSON.stringify(this.state.support))
      support[key].links = support[key].links.concat(['', ''])
      this.setState({ support })
    }
  }

  deletSupport(key) {
    return event => {
      let support = Object.assign(this.state.support, {})
      delete support[key]
      this.setState({ support })
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const { userCtx, addEventRemote, addEvent } = this.props
    const {
      name,
      date,
      presale,
      atTheDoor,
      facebookLink,
      description,
      headliner,
      headlinerGenre,
      venue,
      headlinerLinks
    } = this.state

    const id = ksuid.fromParts(date.valueOf(), crypto.randomBytes(16))

    // return
    const artist_details = [
      {
        name: headliner,
        genres: headlinerGenre.map(item => item.text),
        links: headlinerLinks
      }
    ]
    const support = JSON.parse(JSON.stringify(this.state.support))
    Object.keys(support).forEach(key => {
      const item = support[key]
      item.genres = item.genres.map(item => item.text)

      if (item && item.name.trim() !== '') artist_details.push(item)
    })
    const data = {
      _id: id.string,
      headliner,
      presale,
      atTheDoor,
      facebookLink,
      description,
      genres: headlinerGenre.map(item => item.text),
      type: 'event',
      name,
      date: date.toISOString(),
      artist_details,
      venue
    }
    if (support && Object.keys(support).length > 0) {
      data.support = Object.keys(support)
        .map(key => support[key].name)
        .filter(item => item && item.trim() !== '')
    }

    if (userCtx && isAdminOrEditor(userCtx.roles)) {
      return addEventRemote(data)
    }

    addEvent(data)
  }

  render() {
    const { addShowRequest, pushRoute, venues, genres } = this.props
    const {
      name,
      venue,
      presale,
      atTheDoor,
      facebookLink,
      description,
      headlinerGenre,
      venueAdress,
      date,
      headliner,
      support,
      headlinerLinks
    } = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col xs={12} md={5}>
            <Form.Group id="name">
              <Form.Label>Show name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                name="name"
                onChange={this.handleChangeTextInput}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={3}>
            <Form.Group id="date">
              <Form.Label>
                Date <FontAwesomeIcon icon={faAsterisk} />
              </Form.Label>
              <Datetime required value={date} onChange={this.handleChangeDate} />
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Form.Group id="facebookLink">
              <Form.Label>Link to facebook event</Form.Label>
              <Form.Control
                type="text"
                value={facebookLink}
                name="facebookLink"
                onChange={this.handleChangeTextInput}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={3}>
            <Form.Group id="venue">
              <Form.Label>
                Venue name <FontAwesomeIcon icon={faAsterisk} />
              </Form.Label>
              <Typeahead
                id="input-venue-name"
                onChange={this.handleSelectVenue}
                onInputChange={this.handleChangeVenue}
                options={venues}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={5}>
            <Form.Group id="venueAdress">
              <Form.Label>Venue adress (Hellstreet 666, 13120 Berlin)</Form.Label>
              <Form.Control
                type="text"
                value={venueAdress}
                name="venueAdress"
                onChange={this.handleChangeTextInput}
              />
            </Form.Group>
          </Col>
          <Col xs={6} md={2}>
            <Form.Group id="presale">
              <Form.Label>Presal Price</Form.Label>
              <Form.Control
                type="text"
                value={presale}
                name="presale"
                onChange={this.handleChangeTextInput}
              />
            </Form.Group>
          </Col>
          <Col xs={6} md={2}>
            <Form.Group id="atTheDoor">
              <Form.Label>Door Price</Form.Label>
              <Form.Control
                type="text"
                value={atTheDoor}
                name="atTheDoor"
                onChange={this.handleChangeTextInput}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group id="headliner">
              <Form.Label>
                Headliner <FontAwesomeIcon icon={faAsterisk} />
              </Form.Label>
              <Form.Control
                type="text"
                required
                value={headliner}
                name="headliner"
                onChange={this.handleChangeTextInput}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>
                Headliner Genre <FontAwesomeIcon icon={faAsterisk} />
              </Form.Label>
              {
                <ReactTags
                  tags={headlinerGenre}
                  inline
                  required
                  inlinePosition="after"
                  suggestions={genres}
                  handleDelete={this.handleDeleteHeadlinerGenre}
                  handleAddition={this.handleAddition()}
                  delimiters={delimiters}
                />
              }
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group>
              <Form.Label>Headliner Links</Form.Label>
              <Row>
                <Col md={10}>
                  <Row>
                    {headlinerLinks.map((item, index) => (
                      <Col xs={12} md={6} key={index}>
                        <Form.Control
                          type="text"
                          onChange={this.handleChangeHeadlinerLinks(index)}
                        />
                      </Col>
                    ))}
                  </Row>
                </Col>
                <Col md={2} className="add-linkt-btn-container">
                  <Button
                    className="btn-block add-content-btn"
                    variant="secondary"
                    onClick={this.addHeadlinerLinks}
                  >
                    <FontAwesomeIcon icon={faPlus} /> Links
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Col>
          <Col xs={12} md={12}>
            <Form.Group id="description">
              <Form.Label>Event description</Form.Label>
              <Form.Control
                type="textarea"
                as="textarea"
                rows="2"
                value={description}
                name="description"
                onChange={this.handleChangeTextInput}
              />
            </Form.Group>
          </Col>

          <Col></Col>
          {Object.keys(support).map((key, index, array) => (
            <Col md={12} key={key}>
              <hr />
              <SupportForm {...support[key]} index={index} arraylength={array.length <= 1} />
            </Col>
          ))}
          <Col md={2} xs={6}>
            <Form.Group>
              <Button
                className="btn-block add-content-btn"
                variant="secondary"
                onClick={this.addSupport}
              >
                <FontAwesomeIcon icon={faPlus} /> Support
              </Button>
            </Form.Group>
          </Col>
          <Col>
            <hr />
            <Button
              className="float-right"
              variant="primary"
              type="submit"
              onClick={this.handleAddShow}
            >
              Add that fucking Show!
            </Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default ShowForm
