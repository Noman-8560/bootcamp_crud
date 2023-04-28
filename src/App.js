

import React, { useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    id: '',
    name: '',
    des: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddItem = () => {
    setItems([...items, newItem]);
    setNewItem({ name: '', des: '', id: '' });
  };

  const handleEditItem = (index, editedItem) => {
    const updatedItems = [...items];
    updatedItems[index] = editedItem;
    setItems(updatedItems);
    setEditMode(false);
    setEditIndex(null);
    setNewItem({ name: '', des: '', id: '' });
  };

  const handleDeleteItem = (index) => {
    const filteredItems = items.filter((_, i) => i !== index);
    setItems(filteredItems);
  };

  const handleEditButtonClick = (index) => {
    setEditMode(true);
    setEditIndex(index);
    setNewItem(items[index]);
  };

  return (
    <div className="App">
      <h1>My App</h1>
      <div className="form-container">
      <div className="form-input">
          <label htmlFor="id">id:</label>
          <input
            type="number"
            id="id"
            value={newItem.id}
            onChange={(event) =>
              setNewItem({ ...newItem, id: event.target.value })
            }
          />
        </div>
        <div className="form-input">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={newItem.name}
            onChange={(event) =>
              setNewItem({ ...newItem, name: event.target.value })
            }
          />
        </div>
        <div className="form-input">
          <label htmlFor="des">Description:</label>
          <input
            type="text"
            id="des"
            value={newItem.des}
            onChange={(event) =>
              setNewItem({ ...newItem, des: event.target.value })
            }
          />
        </div>

        <div className="form-button">
          {editMode ? (
            <button onClick={() => handleEditItem(editIndex, newItem)}>
              Save
            </button>
          ) : (
            <button onClick={handleAddItem}>Add</button>
          )}
        </div>
      </div>
      <ul className="item-list">
        {items.map((item, index) => (
          <li key={index} className="item-container">
            <div className="item-info">
            <span className="item-price">{item.id}</span>
              <span className="item-name">{item.name}</span>
              <span className="item-quantity">{item.des}</span>
            </div>
            <div className="item-buttons">
              <button className="edit-button" onClick={() => handleEditButtonClick(index)}>Edit</button>
              <button className="delete-button" onClick={() => handleDeleteItem(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;






