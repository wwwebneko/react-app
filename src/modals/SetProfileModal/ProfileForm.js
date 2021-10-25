import { useState } from "react";
import PropTypes from "prop-types";
import styles from './ProfileForm.module.css';

export default function ProfileForm({ onFormSave, onFormCancel }) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [avatar, setAvatar] = useState('');

  function handleInput(e) {
    const target = e.target;
    target.name === 'name' && setName(e.target.value);
    target.name === 'avatar' && setAvatar(e.target.value);
  }

  function handleSelect(e) {
    setGender(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onFormSave({ name, gender, avatar, id: Date.now() });
    setName('');
    setGender('');
    setAvatar('');
  }

  function handleBlur(e) { }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <p>
        <label htmlFor="name">Name</label>
        <input aria-label="name" id="name" name="name" type="text" value={name} onChange={handleInput} onBlur={handleBlur} />
      </p>
      <p>
        <label htmlFor="gender">Gender</label>
        <select id="gender" value={gender} onChange={handleSelect}>
          <option disabled value="">Select</option>
          <option value="F">Female</option>
          <option value="M">Male</option>
          <option value="O">Other</option>
        </select>
      </p>
      <p>
        <label htmlFor="avatar">Avatar</label>
        <input aria-label="avatar" id="avatar" name="avatar" type="text" value={avatar} onChange={handleInput} onBlur={handleBlur} placeholder="Link to image goes here" />
      </p>

      <button onClick={onFormCancel}>cancel</button>
      <button type="submit">save</button>
    </form>
  )
}

ProfileForm.propTypes = {
  onFormSave: PropTypes.func.isRequired,
  onFormCancel: PropTypes.func.isRequired
}