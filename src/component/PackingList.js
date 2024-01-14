import { useState } from "react";
import Item from "./Item";

function PackingList({ items, OnDeleteItem, onToggleItem, onClearList }) {
  const [sortBy, setSortBy] = useState("description");
  let sortedItem;

  // Sort by Input
  if (sortBy === "input") sortedItem = items;

  // sort by Description
  if (sortBy === "description")
    sortedItem = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  // Sort by Packed
  if (sortBy === "packed")
    sortedItem = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItem.map((item) => (
          <Item
            key={item.id}
            item={item}
            OnDeleteItem={OnDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by the input Order </option>
          <option value="description">Sort by description </option>
          <option value="packed">Sort by Packed status </option>
        </select>

        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}

export default PackingList;
