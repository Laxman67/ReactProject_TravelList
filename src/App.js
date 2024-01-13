import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 12, packed: false },
// ];

function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList
        items={items}
        OnDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return (
    <>
      <h1> 🌴Far Away💼</h1>
    </>
  );
}
function Form({ onAddItems }) {
  const [description, setDescription] = useState(" ");
  const [quantity, setQuantity] = useState(6);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) {
      return;
    }

    const newItem = {
      description,
      quantity,
      id: Date.now(),
      packed: false,
    };

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }
  return (
    <>
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for your😘 Trip ?</h3>

        {/* Select */}

        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Item...."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <button>Add</button>
      </form>
    </>
  );
}
function PackingList({ items, OnDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            OnDeleteItem={OnDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, OnDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {/* {item.quantity}
        {item.description} */}
        {item.quantity + " " + item.description}
      </span>
      <button onClick={() => OnDeleteItem(item.id)}>❌</button>
    </li>
  );
}

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

export default App;
