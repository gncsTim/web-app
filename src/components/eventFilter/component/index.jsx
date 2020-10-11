import React, { useState } from "react";
import { Button, Collapse, Row, Col } from "react-bootstrap";
// import Multiselect from "react-widgets/lib/Multiselect";
import MultiSelect from "react-multi-select-component";

const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class EventFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilter: false,
      filterGenres: []
    };
    this.handleToggleFilter = this.handleToggleFilter.bind(this);
    this.handleChangeFilterGenres = this.handleChangeFilterGenres.bind(this);
    this.handleClearGenreFilter = this.handleClearGenreFilter.bind(this)
  }

  handleToggleFilter() {
    const { showFilter } = this.state;
    this.setState({ showFilter: !showFilter });
  }

  handleChangeFilterGenres(filterGenres) {
    console.log("THISSSS")
    console.log(filterGenres)
    var selected = filterGenres.map(function(item){
         return {value: item.value};
      });
      console.log(selected)

    this.setState({ filterGenres }, () => {
      this.props.setGenresFilter(filterGenres);
    });
  }

  handleClearGenreFilter() {
      this.setState({filterGenres: []}, () => {
        this.props.setGenresFilter([]);
      })
  }

  render() {
    const { showFilter, filterGenres } = this.state;
    const { genres } = this.props;
    console.log( {genres});
    console.log( {showFilter});
    var options = genres.map(function(item){
         return {label: item, value: item};
      });
    // const options = [
    //       { label: "Grapes 🍇", value: "grapes" },
    //       { label: "Mango 🥭", value: "mango" },
    //       { label: "Strawberry 🍓", value: "strawberry"},
    //     ];
    console.log( {options});
        console.log( {filterGenres});

    return (
      <div>
        <Button
          onClick={this.handleToggleFilter}
          aria-controls="collapse-event-filter"
          aria-expanded={showFilter}
        >
          filter
        </Button>
        <Collapse in={showFilter}>
          <div id="collapse-event-filter">
            <Row>
              <Col xs={4}>
                <MultiSelect
                  options={options}
                  value={filterGenres}
                  hasSelectAll={false}
                  onChange={this.handleChangeFilterGenres}

                />
              </Col>
              <Col xs={1}>
                <Button
                  onClick={this.handleClearGenreFilter}
                >
                  clear
                </Button>
              </Col>
            </Row>
          </div>
        </Collapse>
      </div>
    );
  }
}

export default EventFilter;
