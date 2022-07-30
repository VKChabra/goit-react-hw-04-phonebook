import PropTypes from 'prop-types';
import styles from './filter.module.css';

const Filter = ({ value, onChangeFilter }) => {
  return (
    <label className={styles.filterLabel}>
      Find contacts by name
      <input type="text" value={value} onChange={onChangeFilter} />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default Filter;
