function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="stats">
        <em>Start Adding some Items </em>
      </p>
    );
  }
  const numItems = items.length;
  const numPacked = items.filter((items) => items.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <>
      <footer className="stats">
        <em>
          {percentage === 100
            ? "You've Got Everythink , Ready to Go "
            : ` 💼 You've ${numItems} items on your list , and you already packed
          ${numPacked}(${percentage}%
          )`}
        </em>
      </footer>
    </>
  );
}

export default Stats;
