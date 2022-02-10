const LogOutIcon = () => {
  return (
    <svg className='logout-icon' width="1em" height="1em" viewBox="0 0 24 24"><path d="M4 18h2v2h12V4H6v2H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3zm2-7h7v2H6v3l-5-4l5-4v3z" fill="currentColor"></path></svg>
  );
};

const MessageIcon = () => {
  return (
    <svg className='feed-icon' width="1em" height="1em" viewBox="0 0 24 24"><path d="M20 20H7a2 2 0 0 1-2-2V8.94l-2.77-3.3C2.09 5.47 2 5.24 2 5a1 1 0 0 1 1-1h17a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2M8.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-10m0 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-10m0 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-5z" fill="currentColor"></path></svg>
  );
};


const LikeIcon = () => {
  return (
    <svg className='like-icon' width="1em" height="1em" viewBox="0 0 48 48"><path fill="#F44336" d="M34 9c-4.2 0-7.9 2.1-10 5.4C21.9 11.1 18.2 9 14 9C7.4 9 2 14.4 2 21c0 11.9 22 24 22 24s22-12 22-24c0-6.6-5.4-12-12-12z"></path></svg>
  );
};


const HomeIcon = () => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 16 16"><path d="M16 9.226l-8-6.21l-8 6.21V6.694l8-6.21l8 6.21zM14 9v6h-4v-4H6v4H2V9l6-4.5z" fill="currentColor"></path></svg>
  );
};


const DeleteIcon = () => {
  return (
    <svg className='del-svg' width="1em" height="1em" viewBox="0 0 28 28"><path d="M19.5 16a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11zM14 2a4 4 0 0 1 3.995 3.8L18 6h5a1 1 0 0 1 .117 1.993L23 8h-.849l-.594 7.332a6.5 6.5 0 0 0-6.746 10.669L10.766 26a3.75 3.75 0 0 1-3.738-3.447L5.848 8H5a1 1 0 0 1-.993-.883L4 7a1 1 0 0 1 .883-.993L5 6h5a4 4 0 0 1 4-4zm3.73 17.024l-.068-.058a.5.5 0 0 0-.569 0l-.07.058l-.057.07a.5.5 0 0 0 0 .568l.058.07l1.77 1.769l-1.768 1.766l-.057.07a.5.5 0 0 0 0 .568l.057.07l.07.057a.5.5 0 0 0 .568 0l.07-.057l1.766-1.767l1.77 1.769l.069.058a.5.5 0 0 0 .568 0l.07-.058l.057-.07a.5.5 0 0 0 0-.568l-.057-.07l-1.77-1.768l1.772-1.77l.058-.069a.5.5 0 0 0 0-.569l-.058-.069l-.069-.058a.5.5 0 0 0-.569 0l-.069.058l-1.772 1.77l-1.77-1.77l-.068-.058l.069.058zM14 4a2 2 0 0 0-1.995 1.85L12 6h4l-.005-.15A2 2 0 0 0 14 4z" fill="currentColor" fillRule="nonzero"></path></svg>
  );
};


const EditIcon = () => {
  return (
    <svg className='edit-svg' width="1em" height="1em" viewBox="0 0 24 24"><path d="M5 3c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7H5V5h7V3H5m12.78 1a.69.69 0 0 0-.48.2l-1.22 1.21l2.5 2.5L19.8 6.7c.26-.26.26-.7 0-.95L18.25 4.2c-.13-.13-.3-.2-.47-.2m-2.41 2.12L8 13.5V16h2.5l7.37-7.38l-2.5-2.5z" fill="currentColor"></path></svg>
  );
};

export { LogOutIcon, MessageIcon, LikeIcon, HomeIcon, DeleteIcon, EditIcon };