// LIBRARIES
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

// CONTEXT
import { loginContext } from '../../Context/loginContext';

// COMPONENTS
import Header from '../../pages/Header';
import Title from '../../pages/Title';
import DeleteUser from './DeleteUser';
import ChangeStatus from './UpdateUser';

const Moderation = () => {

  const showStatus = {
    user: 'Utilisateur',
    moderator: 'Modérateur',
    admin: 'Administrateur'
  };

  const { token } = useContext(loginContext);
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [toggleClass, setToggleClass] = useState('slide');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const getUsers = async () => {
    setUser(null);
    const getUsers = await axios.get(`http://localhost:3000/api/auth/users/`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const adminFilter = getUsers.data.filter(user => user.status !== 'admin');
    adminFilter.length ? setUsers(adminFilter) : setUsers(null);

  };

  const selectOneUser = (event) => {
    const value = event.target.value;
    if (value === 'default') {
      setUser(null);
    } else {
      const idValue = Number(value);
      setUserId(idValue);
      setToggleClass(true);
      const findUser = users.find(user => user.id === idValue);
      setUser(findUser);
      setUserStatus(findUser.status);
      setTimeout(() => setToggleClass(false), 600);
    }
  };

  useEffect(getUsers, [toggleUpdate]);

  return (
    <>
      <Header />
      {isUpdating && <ChangeStatus data={{ setIsUpdating, userId, setToggleUpdate, userStatus }} />}
      {isDeleting && <DeleteUser data={{ setIsDeleting, userId, setToggleUpdate, setUser }} />}
      <Title name="Modération" />
      <select
        onBlur={e => e.target.value = 'default'}
        onChange={selectOneUser}
        name="users"
        id="users-select"
        className="slide"
      >
        <option value="default">--UserList--</option>
        {users && (
          users.map(({ id, firstname, lastname }, key) => (
            <option value={id} key={key}>{`${firstname} ${lastname}`}</option>
          ))
        )}
      </select>
      {user && (
        <>
          <div className={`moderation__container container ${toggleClass && 'slide'}`}>
            <ul className='moderation-infos__container'>
              <div className='profile-picture__container'>
                <img src={user.profilePicture} className="profile__picture" alt="photo de profil" />
              </div>
              <li className='username-container'>
                <span className='attribute'>PSEUDO</span>
                <span className='value'>{user.username}</span>
              </li>
              <li className='firstname-container'>
                <span className='attribute'>PRÉNOM</span>
                <span className='value'>{user.firstname}</span>
              </li>
              <li className='lastname-container'>
                <span className='attribute'>NOM</span>
                <span className='value'>{user.lastname}</span>
              </li>
              <li className='status-container'>
                <span className='attribute'>STATUS</span>
                <span className='value'>{showStatus[user.status]}</span>
              </li>
            </ul>
            <div className="buttons-container">
              {user.status === 'user'
                ? <button className='btn' onClick={() => setIsUpdating(true)}>Passer Modérateur</button>
                : <button className='btn' onClick={() => setIsUpdating(true)}>Retirer Modérateur</button>
              }
              <button className='btn' onClick={() => setIsDeleting(true)}>Supprimer le compte</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Moderation;