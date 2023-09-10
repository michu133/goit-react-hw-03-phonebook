import { Component } from 'react';
import { nanoid } from 'nanoid';
import propTypes from 'prop-types';

export default class Filter extends Component {
  render() {
    return (
      <div>
        <h3>Find contacts by name</h3>
        <input
          type="text"
          id={nanoid()}
          name="filter"
          onChange={this.props.handleChange}
          value={this.props.filter}
        ></input>
      </div>
    );
  }
}

Filter.propTypes = {
  onChange: propTypes.func,
  value: propTypes.string,
};
