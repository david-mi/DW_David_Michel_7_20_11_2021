const handleDate = (date) => {

  const formatDate = new Date(date);

  const options = {
    // weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: "numeric",
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  return formatDate.toLocaleString('fr-FR', options);

};

export { handleDate };