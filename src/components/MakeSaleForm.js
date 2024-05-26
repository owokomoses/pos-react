import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar'; // Import the Sidebar component

const MakeSaleForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    price_Ksh: 0,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/items/makeSale', formData);
      console.log(response.data); // Log the response
      setSuccess('Sale made successfully');
      setError(null);
      // Clear the form fields after successful submission
      setFormData({ name: '', price_Ksh: 0 });
    } catch (error) {
      console.error('Error making sale:', error);
      setError(error.response?.data?.message || 'Error making sale');
      setSuccess(null);
    }
  };

  return (
    <div className="form-container">
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default MakeSaleForm;
