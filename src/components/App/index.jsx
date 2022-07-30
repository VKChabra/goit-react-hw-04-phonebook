import { Component } from 'react';
import { nanoid } from 'nanoid';
import styles from './app.module.css';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import Contacts from 'components/Contacts';

const LS_SAVEDCONTACTS = 'Contacts';

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

  submitAddContact = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    form.reset();

    const normalizedName = name.toLowerCase();
    const existingName = this.state.contacts.find(contact =>
      contact.name.toLowerCase().includes(normalizedName)
    );

    if (existingName) {
      return alert(`${name} is already in contacts, sorry`);
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  onChangeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem(LS_SAVEDCONTACTS));
    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    const contactsList = this.state.contacts;
    if (prevState.contacts !== contactsList) {
      localStorage.setItem(LS_SAVEDCONTACTS, JSON.stringify(contactsList));
    }
  }

  render() {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <div className={styles.wrapper}>
        <h1>Phonebook</h1>
        <ContactForm submitAddContact={this.submitAddContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChangeFilter={this.onChangeFilter} />
        <Contacts
          contacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
