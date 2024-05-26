import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './ItemList.css';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/items/getAllItems');
        setItems(response.data);
      } catch (error) {
        setError('Error fetching items');
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (item_id) => {
    try {
      await axios.delete(`http://localhost:4000/api/items/deleteItem/${item_id}`);
      setItems(items.filter(item => item.item_id !== item_id));
    } catch (error) {
      setError('Error deleting item');
    }
  };

  const handleEdit = (item) => {
    // You can navigate to an edit page or open a modal with the item details for editing
    // For simplicity, we'll just log the item to be edited here
    console.log('Edit item:', item);
  };

  return (
    <div className="item-list-container">
      <Sidebar />
      <div className="item-list">
        <div className="item-table-container">
          <h2>Item List</h2>
          {error && <p className="error-message">{error}</p>}
          <table className="item-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price (Ksh)</th>
                <th>Total Sales (Ksh)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.item_id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price_Ksh}</td>
                  <td>{item.total_sales}</td>
                  <td>
                    <button onClick={() => handleEdit(item)}>Edit</button>
                    <button onClick={() => handleDelete(item.item_id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
