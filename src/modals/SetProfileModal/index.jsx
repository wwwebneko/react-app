import { useState } from "react";
import PropTypes from "prop-types";
import useLocalStorage from "../../actions/useLocalStorage";
import Modal from "../../components/Modal";
import { useActiveProfileContext } from "../../context/ActiveProfile";

export default function SetProfileModal({ onModalClose }) {
  const { setActiveProfile } = useActiveProfileContext();
  const [profilesList, setProfilesList] = useLocalStorage('profilesList', []);
  const [isFormVisible, setIsFormVisible] = useState(false);

  function handleFormSave(newProfile) {
    const newProfilesList = profilesList.concat(newProfile);

    setProfilesList(newProfilesList);
    setIsFormVisible(false);
  }

  function handleProfileDelete(profile) {
    const newProfilesList = profilesList.filter((item) => item.id !== profile.id);

    setProfilesList(newProfilesList);
  }

  function renderProfileList() {
    let list = [];

    if (profilesList.length) {
      list = profilesList.map((item) => {
        return (
          <p key={item.id}>
            <span>{item.name}</span>
            <span>{item.gender}</span>
            <button onClick={() => setActiveProfile(item)}>Make active</button>
            <button onClick={() => handleProfileDelete(item)}>Remove</button>
            <button onClick={() => handleProfileDelete(item)}>Edit</button>
          </p>
        )
      })
    }

    list.push(<button key={0} onClick={() => setIsFormVisible(true)}>Add profile</button>)

    return <div>{list}</div>;
  }

  function renderEmptyState() {
    return (
      <p>You don't have any profiles yet</p>
    )
  }

  return (
    <Modal onModalClose={onModalClose}>
      {!profilesList.length && renderEmptyState()}
      {renderProfileList()}
      {isFormVisible && <ProfileForm onFormSave={handleFormSave} onFormCancel={() => setIsFormVisible(false)} />}
    </Modal>
  )
}

function ProfileForm({ onFormSave, onFormCancel }) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');

  function handleInput(e) {
    setName(e.target.value);
  }

  function handleSelect(e) {
    setGender(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onFormSave({ name, gender, id: Date.now() });
    setName('');
    setGender('');
  }

  function handleBlur(e) { }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="name">Name</label>
        <input id="name" value={name} onChange={handleInput} onBlur={handleBlur} />
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

      <button onClick={onFormCancel}>cancel</button>
      <button type="submit">save</button>
    </form>
  )
}

SetProfileModal.propTypes = {
  onModalClose: PropTypes.func.isRequired
}

ProfileForm.propTypes = {
  onFormSave: PropTypes.func.isRequired,
  onFormCancel: PropTypes.func.isRequired
}

