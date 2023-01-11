/* stockage de toutes les infos liées à l'api ainsi qu'une fonction 
qui nous retourne des headers qu'on utiliser pour les requêtes axios */

export let apiUser = '';
export let apiMessage = '';
export let apiComment = '';
export let apiLogin = '';
export let apiSignup = '';
export let apiModeration = '';
export let apiAdmin = '';

if (window.location.hostname !== "localhost") {
  apiUser = 'https://backend-production-645b.up.railway.app/api/auth/users';
  apiMessage = 'https://backend-production-645b.up.railway.app/api/messages';
  apiComment = 'https://backend-production-645b.up.railway.app/api/comments';
  apiLogin = 'https://backend-production-645b.up.railway.app/api/auth/login';
  apiSignup = 'https://backend-production-645b.up.railway.app/api/auth/signup';
  apiModeration = 'https://backend-production-645b.up.railway.app/api/mod';
  apiAdmin = 'https://backend-production-645b.up.railway.app/api/mod/admin';
}
else {

  apiUser = 'http://localhost:3000/api/auth/users';
  apiMessage = 'http://localhost:3000/api/messages';
  apiComment = 'http://localhost:3000/api/comments';
  apiLogin = 'http://localhost:3000/api/auth/login';
  apiSignup = 'http://localhost:3000/api/auth/signup';
  apiModeration = 'http://localhost:3000/api/mod';
  apiAdmin = 'http://localhost:3000/api/mod/admin';
}

export const getHeaders = (token, option) => {

  if (option === 'multipart') {
    return {
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    };
  }

  return {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

};
