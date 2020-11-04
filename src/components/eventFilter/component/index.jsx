import PropType from 'prop-types'
import React from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import MultiSelect from 'react-multi-select-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

class EventFilter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showFilter: false,
            filterGenres: [],
        }
        this.handleChangeFilterGenres = this.handleChangeFilterGenres.bind(this)
        this.handleClearGenreFilter = this.handleClearGenreFilter.bind(this)
    }

    handleChangeFilterGenres(filterGenres) {
        var selected = filterGenres.map((item) => item.value)
        this.props.setGenresFilter(selected)

    }

    handleClearGenreFilter() {
        this.props.setGenresFilter([])
    }

    render() {
        const { genres, eventFilter = {} } = this.props
        let filterGenres = eventFilter.genres || []
        filterGenres = filterGenres.map((item) => ({label: item, value: item}))
        var options = genres.map(function (item) {
            return { label: item, value: item }
        })

        return (
            <div className="filter-bar">
                <Row>
                    {/*TODO: City Filter when City db is there */}
                    {/*
                    <Col xs={12} sm={4}>
                        <h2><center> Cities</center></h2>
                        <Row>
                            <Col xs={10} sm={8}>
                                <MultiSelect
                                    options={options}
                                    value={filterGenres}
                                    hasSelectAll={false}
                                    onChange={this.handleChangeFilterGenres}
                                />
                            </Col>
                            <Col xs={2} sm={1}>
                                <Button className="btn-dark" onClick={this.handleClearGenreFilter}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </Button>
                            </Col>
                        </Row>
                    </Col> */}
                    <Col xs={12} sm={4}>
                        <h2><center> Genres</center></h2>
                        <Row>
                            <Col xs={10} sm={8}>
                                <MultiSelect
                                    options={options}
                                    value={filterGenres}
                                    hasSelectAll={false}
                                    onChange={this.handleChangeFilterGenres}
                                />
                            </Col>
                            <Col xs={2} sm={1}>
                                <Button className="btn-dark" onClick={this.handleClearGenreFilter}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

EventFilter.propTypes = {
    setGenresFilter: PropType.func.isRequired,
    genres: PropType.array.isRequired,

}

export default EventFilter
