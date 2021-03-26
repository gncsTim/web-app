import PropType from 'prop-types'
import React from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import MultiSelect from 'react-multi-select-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import REGIONLIST from 'components/eventFilter/constants'


class EventFilter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showFilter: false,
            filterGenres: [],
            filterRegions: [],
        }
        this.handleChangeFilterGenres = this.handleChangeFilterGenres.bind(this)
        this.handleClearGenreFilter = this.handleClearGenreFilter.bind(this)
        this.handleChangeFilterRegions = this.handleChangeFilterRegions.bind(this)
        this.handleClearRegionFilter = this.handleClearRegionFilter.bind(this)
    }

    handleChangeFilterGenres(filterGenres) {
        var selected = filterGenres.map((item) => item.value)
        this.props.setGenresFilter(selected)
    }

    handleClearGenreFilter() {
        this.props.setGenresFilter([])
    }

    handleChangeFilterRegions(filterRegions) {
        var selected = filterRegions.map((item) => item.value)
        this.props.setRegionsFilter(selected)
    }

    handleClearRegionFilter() {
        this.props.setRegionsFilter([])
    }

    render() {
        const { genres, eventFilter = {} } = this.props
        let filterGenres = eventFilter.genres || []
        filterGenres = filterGenres.map((item) => ({label: item, value: item}))
        let filterRegions = eventFilter.regions || []
        filterRegions = filterRegions.map((item) => ({label: item, value: item}))
        const optionsRegions = REGIONLIST.map((item) => ({label: item, value: item}))

        var optionsGenres = genres.map(function (item) {
            return { label: item, value: item }
        })



        return (
            <div className="filter-bar">
                <Row>
                    {/*TODO: City Filter when City db is there */}

                    <Col xs={12} sm={4}>
                        <h2><center>Region</center></h2>
                        <Row>
                            <Col xs={10} sm={8}>
                                <MultiSelect
                                    options={optionsRegions}
                                    value={filterRegions}
                                    hasSelectAll={false}
                                    onChange={this.handleChangeFilterRegions}
                                />
                            </Col>
                            <Col xs={2} sm={1}>
                                <Button className="btn-dark" onClick={this.handleClearRegionFilter}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} sm={4}>
                        <h2><center> Genres</center></h2>
                        <Row>
                            <Col xs={10} sm={8}>
                                <MultiSelect
                                    options={optionsGenres}
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
    setRegionsFilter: PropType.func.isRequired,
    genres: PropType.array.isRequired,
    eventFilter: PropType.object.isRequired,
}

export default EventFilter
