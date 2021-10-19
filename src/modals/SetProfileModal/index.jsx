import { useState } from "react";
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
            <button onClick={() => setActiveProfile(item)}>Make active</button>
            <button onClick={() => handleProfileDelete(item)}>Remove</button>
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
      {isFormVisible && <ProfileForm onFormSave={handleFormSave} />}
    </Modal>
  )
}

function ProfileForm({ onFormSave }) {
  const [name, setName] = useState('');

  function handleInput(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onFormSave({ name: name, id: Date.now() });
    setName('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input id="name" value={name} onChange={handleInput} />
      </label>
      <button type="submit">save</button>
    </form>
  )
}