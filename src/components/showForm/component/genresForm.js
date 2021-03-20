import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { WithContext as ReactTags } from 'react-tag-input'

const KeyCodes = {
    comma: 188,
    enter: 13,
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

class GenresForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: [],
        }
        this.handleDeleteGenre = this.handleDeleteGenre.bind(this)
        this.handleAddition = this.handleAddition.bind(this)
    }

    handleDeleteGenre(index) {
        let selected = JSON.parse(JSON.stringify(this.props.selected))
        selected.splice(index, 1)
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(selected)
        }
    }

    handleAddition(item) {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(this.props.selected.concat([item]))
        }
    }

    render() {
        const { genres, selected } = this.props
        return (
            <ReactTags
                tags={selected}
                inline
                autofocus={false}
                inlinePosition="after"
                suggestions={genres}
                handleDelete={this.handleDeleteGenre}
                handleAddition={this.handleAddition}
                delimiters={delimiters}
                placeholder="Band Genres"
            />
        )
    }
}

GenresForm.propTypes = {
    genres: PropTypes.array,
    selected: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
}

const mapState = (state) => ({
    genres: state.genres,
})

export default connect(mapState)(GenresForm)
