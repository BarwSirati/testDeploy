const Starfall = () => {
  const config = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <div className="hidden md:flex">
      {config.map((list, key) => {
        return <div key={key} className={`meteor-${list}`}></div>;
      })}
    </div>
  );
};

export default Starfall;
