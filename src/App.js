import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

function App() {
  const [newItem, setNewItem] = useState({
    id: '',
    name: '',
    des: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [items, setItems] = useState(getLocalItems());
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

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
  const [search, setSearch] = useState("");

  return (
    <div className="App">
      <h1>My CRUD App</h1>
      <div className="form-input w-25 srch">
          <label htmlFor="Search">Search</label>
          <input
            type="text"
            id="id" 
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
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
            <button className='btn1' onClick={handleAddItem}>Add</button>
          )}
        </div>
      </div>
      <ul className="item-list">
        {items.filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.name.toLowerCase().includes(search) || item.id.toLowerCase().includes(search) || item.des.toLowerCase().includes(search);
            }).map((item, index) => (
          <li key={index} className="item-container">
            <div className="item-info">
            <span className="item-price">{item.id}</span>
              <span className="item-name">{item.name}</span>
              <span className="item-quantity">{item.des}</span>
            </div>
            <div className="item-buttons">
            <span className="badge bg-success" type="button" onClick={() => handleEditButtonClick(index)}>Edit</span>
            <span className="badge bg-danger dlt" type="button" onClick={() => handleDeleteItem(index)}>Delete</span>

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;






