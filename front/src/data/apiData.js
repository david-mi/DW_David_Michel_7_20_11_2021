const apiUser = 'http://localhost:3000/api/auth/users';
const apiMessage = 'http://localhost:3000/api/messages';
const apiComment = 'http://localhost:3000/api/comments';
const apiLogin = 'http://localhost:3000/api/auth/login';
const apiSignup = 'http://localhost:3000/api/auth/signup';
const apiModeration = 'http://localhost:3000/api/mod';

const getHeaders = (token, option) => {

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

export { apiUser, apiMessage, apiComment, getHeaders, apiLogin, apiSignup, apiModeration };