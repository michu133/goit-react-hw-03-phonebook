import { Component } from 'react';
import propTypes from 'prop-types';

export class ContactList extends Component {
  render() {
    return (
      <ul>
        {this.props.contacts.map(({ id, name, number }) => (
          <li key={id}>
            {name}: {number}{' '}
            <button onClick={() => this.props.deleteContact(id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  }
}

ContactList.propTypes = {
  deleteContact: propTypes.func,
  contacts: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      name: propTypes.string,
      number: propTypes.string,
    })
  ),
};
