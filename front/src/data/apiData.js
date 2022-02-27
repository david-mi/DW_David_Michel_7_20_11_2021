/* stockage de toutes les infos liées à l'api ainsi qu'une fonction 
qui nous retourne des headers qu'on utiliser pour les requêtes axios */

export const apiUser = 'http://localhost:3000/api/auth/users';
export const apiMessage = 'http://localhost:3000/api/messages';
export const apiComment = 'http://localhost:3000/api/comments';
export const apiLogin = 'http://localhost:3000/api/auth/login';
export const apiSignup = 'http://localhost:3000/api/auth/signup';
export const apiModeration = 'http://localhost:3000/api/mod';
export const apiAdmin = 'http://localhost:3000/api/mod/admin';

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
