exports.profileParser = (data) => {
  const parsed = JSON.parse(data);
  return {
    username: parsed.username,
    firstname: parsed.firstname,
    lastname: parsed.lastname,
    bio: parsed.bio
  };
};