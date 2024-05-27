import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar'; // Import the Sidebar component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MakeSaleForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    price_Ksh: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/items/makeSale', formData);
      console.log(response.data); // Log the response
      toast.success('Sale made successfully');
      // Clear the form fields after successful submission
      setFormData({ name: '', price_Ksh: 0 });
    } catch (error) {
      console.error('Error making sale:', error);
      toast.error(error.response?.data?.message || 'Error making sale');
    }
  };

  return (
    <div className="form-container">
      <ToastContainer position="top-right" />
      <Sidebar /> {/* Include the Sidebar component */}
      <form className="form" onSubmit={handleSubmit}>
        <h2>Make Sale</h2>
        <div>
          <label>Item Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
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
        <button type="submit">Make Sale</button>
      </form>
    </div>
  );
};

export default MakeSaleForm;
