const Bowl = ({ bowl }) => {
  const handleOnClick = (event) => {
    event.preventDefault();
    window.location.href = `/edit/${bowl.id}`;
  };

  return (
    <article>
      <div className="article-body">
        <h2>{bowl.name}</h2>
        <p>{bowl.base_type}</p>
      </div>

      <div className="article-footer">
        <button onClick={handleOnClick}>Edit 📝</button>
      </div>
    </article>
  );
};

export default Bowl;
