import { useState } from "react";
import PropTypes from "prop-types";
import useLocalStorage from "../../actions/useLocalStorage";
import Modal from "../../components/Modal";
import { useActiveProfileContext } from "../../context/ActiveProfile";
import ProfileForm from "./ProfileForm";

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

    list.push(<button aria-label="Add profile" key={0} onClick={() => setIsFormVisible(true)}>Add profile</button>)

    return <div>{list}</div>;
  }

  function renderEmptyState() {
    return (
      <p>You don't have any profiles yet</p>
    )
  }

  return (
    <Modal onModalClose={onModalClose}>
      {
        isFormVisible ? (
          <ProfileForm onFormSave={handleFormSave} onFormCancel={() => setIsFormVisible(false)} />
        ) : (
          <>
            {!profilesList.length && renderEmptyState()}
            {renderProfileList()}
          </>
        )
      }
    </Modal>
  )
}

SetProfileModal.propTypes = {
  onModalClose: PropTypes.func.isRequired
}

