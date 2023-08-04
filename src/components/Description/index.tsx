import "./index.scss";

const Description = ({ index, description, setDescription }) => {
  return (
    <div className="description-container">
      <div className="description-header">Description</div>
      <div className="description-content">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="description-text"
        ></textarea>
      </div>
    </div>
  );
};

export default Description;
