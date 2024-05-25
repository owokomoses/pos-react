import React, { useState } from 'react';
import axios from 'axios';

const AddItemForm = () => {
const [formData, setFormData] = useState({
    name: '',
    quantity: 0,
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
    const response = await axios.post('http://localhost:4000/api/items/addItem', formData);
      console.log(response.data); // Log the response
    setSuccess('Item added successfully');
    setError(null);
      // Clear the form fields after successful submission
    setFormData({ name: '', quantity: 0, price_Ksh: 0 });
    } catch (error) {
    console.error('Error adding item:', error);
    setError(error.response?.data?.message || 'Error adding item');
    setSuccess(null);
    }
};

return (
    <div className="form-container">
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
    {error && <p style={{ color: 'red' }}>{error}</p>}
    {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
);
};

export default AddItemForm;
