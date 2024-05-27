import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar'; // Import the Sidebar component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddItemForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: 0,
    price_Ksh: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/items/addItem', formData);
      console.log(response.data); // Log the response
      toast.success('Item added successfully');
      // Clear the form fields after successful submission
      setFormData({ name: '', quantity: 0, price_Ksh: 0 });
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error(error.response?.data?.message || 'Error adding item');
    }
  };

  return (
    <div className="form-container">
      <ToastContainer position="top-right" />
      <Sidebar /> {/* Include the Sidebar component */}
      <form className="form" onSubmit={handleSubmit}>
        <h2>Add Item</h2>
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
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItemForm;
