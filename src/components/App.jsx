import { Component } from 'react';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { nanoid } from 'nanoid';
import Filter from './Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      const parsedContacts = JSON.parse(savedContacts);
      if (parsedContacts.length > 0) {
        this.setState({ contacts: parsedContacts });
      } else {
        localStorage.removeItem('contacts');
      }
    }
  }
  createContact = data => {
    const newContact = {
      ...data,
      id: nanoid(),
    };
    const contactCheck = this.state.contacts.find(
      ({ name }) => name === data.name
    );
    console.log(contactCheck);
    if (contactCheck) {
      return alert(`${data.name} is already in contacts!`);
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  deleteContact = id => {
    const filteredContacts = this.state.contacts.filter(
      contact => contact.id !== id
    );
    this.setState({ contacts: filteredContacts });
  };

  findContact = () => {
    return this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(this.state.filter)
    );
  };

  filterChange = ({ target }) => {
    const normalizedValue = target.value.toLowerCase();
    this.setState({ filter: normalizedValue });
  };

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.createContact}></ContactForm>
        <h2>Contacts</h2>
        <Filter
          handleChange={this.filterChange}
          filter={this.state.filter}
        ></Filter>
        {this.findContact().length ? (
          <ContactList
            contacts={this.findContact()}
            deleteContact={this.deleteContact}
          ></ContactList>
        ) : (
          <p>No contacts found!</p>
        )}
      </div>
    );
  }
}
