import React, { useState, useEffect } from 'react';
import './Home.css';

import axios from "axios";


//make table for items then add buttons and stuff for on hand in transit and add options for adding new items into the table and deleting items from the table

function Table() {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [onHand, setAmount] = useState("");
  const [searchQuery, setSearchQuery] = useState("");


  // Fetch data from backend API on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get("https://localhost:7216/api/product");
    setData(response.data);
  };

  const handleAdd = async () => {
    // Make POST request to backend API to add new data to database
    await axios.post("https://localhost:7216/api/product", { id, name, description, onHand });
    // Fetch updated data from backend API
    await fetchData();
    // Clear input fields
    setId("");
    setName("");
    setDescription("");
    setAmount("");
  };

  const handleUpdate = async (id) => {
    // Make PUT request to backend API to update data in database
    await axios.put(`https://localhost:7216/api/product/${id}`, { name, description, onHand });
    // Fetch updated data from backend API
    await fetchData();
  };

  const handleDelete = async (id) => {
    // Make DELETE request to backend API to delete data from database
    await axios.delete(`https://localhost:7216/api/product/${id}`);
    // Fetch updated data from backend API
    await fetchData();
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  //Filter data based on search tesrm
  const filteredData = data.filter((item) => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

//table search term testing
  return (
    <div class="body">
     <div>
        <input type="text" placeholder="Search..." onChange={handleSearch} />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>On Hand</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.onHand}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => handleUpdate(item.id)}>Update</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Add new data</h2>
        <div>
          <label>ID:</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={onHand}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div>
            <button onClick={() => handleAdd()}>Add</button>
          </div>
        </div>
      </div>

    </div>);
};
export default Table;