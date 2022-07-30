import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import styles from './app.module.css';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import Contacts from 'components/Contacts';

const LS_SAVEDCONTACTS = 'Contacts';

export const App = () => {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(localStorage.getItem(LS_SAVEDCONTACTS)) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );
  const [filter, setFilter] = useState('');

  const submitAddContact = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    form.reset();

    const normalizedName = name.toLowerCase();
    const existingName = contacts.find(contact =>
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

    setContacts([contact, ...contacts]);
  };

  const onChangeFilter = e => {
    setFilter(e.target.value);
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  useEffect(() => {
    window.localStorage.setItem(LS_SAVEDCONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
  return (
    <div className={styles.wrapper}>
      <h1>Phonebook</h1>
      <ContactForm submitAddContact={submitAddContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChangeFilter={onChangeFilter} />
      <Contacts contacts={filteredContacts} deleteContact={deleteContact} />
    </div>
  );
};
