import styles from './contactsItem.module.css';

const ContactsItem = ({ id, name, number, deleteContact }) => {
  return (
    <li className={styles.contactsListItem}>
      {name}: {number}
      <button type="button" onClick={() => deleteContact(id)}>
        Delete
      </button>
    </li>
  );
};

export default ContactsItem;
