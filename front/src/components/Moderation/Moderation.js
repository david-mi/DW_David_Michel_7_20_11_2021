// LIBRARIES
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

// CONTEXT
import { loginContext } from '../../Context/context';

// COMPONENTS
import Header from '../../pages/Header';
import Title from '../../pages/Title';
import DeleteUser from './DeleteUser';
import ChangeStatus from './UpdateUser';

// DATA
import { apiUser, getHeaders } from '../../data/apiData';

const Moderation = () => {

  /* objet qui va permettre des mots plus adaptés pour afficher 
  le status de l'utilisateur affiché */
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

  // fonction qui va gérer l'affichage des utilisateur avec le menu select
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
      /* le setTimout sert à gérer le state qui affichera la classe permettant
       l'animation de slide */
      setTimeout(() => setToggleClass(false), 600);
    }
  };

  // useEffect qui va faire appel à la fonction getUsers à chaque changement d'état du state toggleUpdate
  useEffect(() => {

    // fonction permettant de récupérer la liste des utilisateurs inscrits sur l'application
    const getUsers = async () => {
      setUser(null);
      const getUsers = await axios.get(apiUser, getHeaders(token));
      // on retire l'administrateur de la liste
      const adminFilter = getUsers.data.filter(user => user.status !== 'admin');
      adminFilter.length ? setUsers(adminFilter) : setUsers(null);
    };

    getUsers();

  }, [toggleUpdate, token]);

  return (
    <>
      <Header />
      {isUpdating && <ChangeStatus data={{ setIsUpdating, userId, setToggleUpdate, userStatus }} />}
      {isDeleting && <DeleteUser data={{ setIsDeleting, userId, setToggleUpdate }} />}
      <Title name="Modération" />
      <select
        onBlur={e => e.target.value = 'default'}
        onChange={selectOneUser}
        name="users"
        id="users-select"
        className="slide"
      >
        <option value="default">--Utilisateurs--</option>
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
                <img src={user.profilePicture} className="profile__picture" alt="avatar de l'utilisateur" />
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