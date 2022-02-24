const MessagesImage = ({ attachment }) => {

  return (
    <div className='msg__img-container'>
      <img className='msg__img' src={attachment} alt="attachment" />
    </div>
  );

};

export default MessagesImage;