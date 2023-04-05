const IconButton = ({ onClick, icon }) => {
  return (
    <button onClick={onClick}>
      <span className='material-symbols-rounded'>{icon}</span>
    </button>
  );
};

export default IconButton;
