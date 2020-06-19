import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import { Typeahead } from 'react-bootstrap-typeahead'
import { Form, Button } from 'react-bootstrap'
import Datetime from 'react-datetime'
import uuidv1 from 'uuid/v1'
import { Col, Row } from 'react-bootstrap'
import crypto from 'crypto'
import ksuid from 'ksuid'
import { LodingComonent } from 'components/modal/loading'
import { WithContext as ReactTags } from 'react-tag-input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faAsterisk } from '@fortawesome/free-solid-svg-icons'
import { isAdminOrEditor } from 'components/user/utils'

import ShowForm from 'components/showForm'

const KeyCodes = {
  comma: 188,
  enter: 13
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

class AddShow extends Component {
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
    this.handleDeleteSupportGenre = this.handleDeleteSupportGenre.bind(this)
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
    this.props.resetAddEventRequest()
    this.props.getAllVenues()
    this.props.getAllGenres()
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

  handleDeleteSupportGenre(key) {
    return i => {
      let support = Object.assign(this.state.support, {})
      support[key].genres = support[key].genres.filter((tag, index) => index !== i)
      this.setState({ support })
    }
  }

  handleAddition(key) {
    return tag => {
      if (!key) {
        return this.setState({ headlinerGenre: this.state.headlinerGenre.concat([tag]) })
      }

      let support = Object.assign(this.state.support, {})
      support[key].genres.push(tag)
      this.setState({ support })
    }
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

  handleChangeSupportLinks = (key, index) => event => {
    const support = JSON.parse(JSON.stringify(this.state.support))
    support[key].links[index] = event.target.value
    this.setState({ support })
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

    return (
      <Container>
        <LodingComonent {...addShowRequest} handleSuccess={pushRoute}>
          <h3>added new show</h3>
        </LodingComonent>
        <h1>Good Night Couch Side | Add Show</h1>
        {/* TODO:  show only if not editor */}
        <p>
          That is the place where you can add your show. It will send to our database and will
          checked by one of our editor
        </p>
        <ShowForm />
      </Container>
    )
  }
}

export default AddShow
