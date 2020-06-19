import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { WithContext as ReactTags } from 'react-tag-input'

const KeyCodes = {
  comma: 188,
  enter: 13
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

class GenresForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: []
    }
    this.handleDeleteGenre = this.handleDeleteGenre.bind(this)
    this.handleAddition = this.handleAddition.bind(this)
  }

  handleDeleteGenre(index) {
    let selected = JSON.parse(JSON.stringify(this.state.selected))
    selected.splice(index, 1)
    this.setState({ selected })
  }

  handleAddition(item) {
    let selected = JSON.parse(JSON.stringify(this.state.selected))
    selected.push(item)
    this.setState({ selected })
  }

  render() {
    const { selected } = this.state
    const { genres } = this.props
    return (
      <ReactTags
        tags={selected}
        inline
        inlinePosition="after"
        suggestions={genres}
        handleDelete={this.handleDeleteGenre}
        handleAddition={this.handleAddition}
        delimiters={delimiters}
      />
    )
  }
}

GenresForm.propTypes = {
  genres: PropTypes.array
}

const mapState = state => ({
  genres: state.genres
})

export default connect(mapState)(GenresForm)
