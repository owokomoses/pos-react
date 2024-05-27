import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditItemForm.css';

const EditItemForm = ({ item, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: 0,
    price_Ksh: 0,
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        quantity: item.quantity,
        price_Ksh: item.price_Ksh,
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:4000/api/items/updateItem/${item.item_id}`, formData);
      if (response.status === 200) {
        // Update the item locally before closing the form
        onUpdate(item.item_id, formData);
        onClose();
      } else {
        console.error('Error updating item:', response.data);
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div className="edit-item-form">
      <h2>Edit Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price (Ksh):</label>
          <input
            type="number"
            name="price_Ksh"
            value={formData.price_Ksh}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Item</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditItemForm;
