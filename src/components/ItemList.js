import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import EditItemForm from './EditItemForm';
import './ItemList.css';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState('');

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
  }, [deleteMessage]); // Refresh item list when deleteMessage changes

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:4000/api/items/deleteItem/${itemId}`);
      setDeleteMessage('Item deleted'); // Set delete message
      setTimeout(() => {
        setDeleteMessage(''); // Clear delete message after 3 seconds
      }, 1000);
      // window.location.reload(); // Refresh the page
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setShowEditForm(true);
  };

  const handleUpdate = (item_id, updatedItem) => {
    setItems(items.map(item => (item.item_id === item_id ? { ...item, ...updatedItem } : item)));
  };

  return (
    <div className="item-list-container">
      <Sidebar />
      <div className="item-list">
        <div className="item-table-container">
          <h2>Item List</h2>
          {deleteMessage && <p className="delete-message">{deleteMessage}</p>}
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
      {showEditForm && (
        <EditItemForm
          item={currentItem}
          onClose={() => setShowEditForm(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ItemList;
