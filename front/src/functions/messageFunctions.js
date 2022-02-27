/* fonctions qui nous retournent des dates formatées */

const handleDate = (date) => {

  const formatDate = new Date(date);

  const options = {
    year: 'numeric',
    month: 'long',
    day: "numeric",
    hour: 'numeric',
    minute: 'numeric',
  };

  return formatDate.toLocaleString('fr-FR', options);

};

const handleCommentDate = (date) => {

  const formatDate = new Date(date);

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: "numeric",
    hour: 'numeric',
    minute: 'numeric',

  };

  return formatDate.toLocaleString('fr-FR', options);

};

export { handleDate, handleCommentDate };