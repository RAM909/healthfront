import React, { useEffect, useState, useRef } from "react";
import "./DataTable.css";
import axios from 'axios';
const host = "http://localhost:5000"


const DataTable = ({ isLoggedIn }) => {
  const [data, setData] = useState([]);

  const [editFormData, setEditFormData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const closeForm = useRef(null);


  useEffect(() => {
    axios
      .get(`${host}/api/patient`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const closeFormHandler = (event) => {
      if (closeForm.current && !closeForm.current.contains(event.target)) {
        setShowEditForm(false);
        console.log("outside");
      }
    };
    document.addEventListener("mousedown", closeFormHandler);
    return () => {
      document.removeEventListener("mousedown", closeFormHandler);
    };
  }, []);



  const handleEditClick = (item) => {
    setEditFormData(item);
    setShowEditForm(true);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    axios
      .put(
        `${host}/api/patient/${editFormData._id}`,
        editFormData
      )
      .then((response) => {
        setData((prevData) => {
          return prevData.map((item) => {
            if (item._id === editFormData._id) {
              return editFormData;
            }
            return item;
          });
        });
        setShowEditForm(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div>
      <table className="table_div">
        <tr className="head-row">
          <th>Session Id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Height</th>
          <th>Weight</th>
          <th>BMI</th>
          <th>Oxygen Level</th>
          <th>Heart Rate</th>
          <th>Temperature</th>
          <th>ECG Status</th>
          <th>Actions</th>
        </tr>
        {data &&
          data.map((item, index) => {
            return (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{item.Firstname}</td>
                <td>{item.Lastname}</td>
                <td>{item.Age}</td>
                <td>{item.Gender}</td>
                <td>{item.Height}</td>
                <td>{item.Weight}</td>
                <td>{item.BMI}</td>
                <td>{item.Oxygen}</td>
                <td>{item.Heartrate}</td>
                <td>{item.Temperature}</td>
                <td>{item.ECG}</td>

                <td>
                  <button
                    className="form-btn"
                    onClick={() => handleEditClick(item)}
                  >
                    Edit
                  </button>
                </td>

              </tr>
            );
          })}
      </table>

      {showEditForm && (
        <div className="edit-form overlay">
          <div className="edit-form-div">
            <h2>Edit Details</h2>
            <form onSubmit={handleEditFormSubmit} ref={closeForm}>
              <label>First Name:</label>
              <input
                type="text"
                value={editFormData.Firstname}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    Firstname: e.target.value,
                  })
                }
              />
              <label>Last Name:</label>
              <input
                type="text"
                value={editFormData.Lastname}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, Lastname: e.target.value })
                }
              />
              <label>Age:</label>
              <input
                type="text"
                value={editFormData.Age}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, Age: e.target.value })
                }
              />
              <label>Gender:</label>
              <input
                type="text"
                value={editFormData.Gender}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, Gender: e.target.value })
                }
              />
              <label>Height:</label>
              <input
                type="text"
                value={editFormData.Height}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, Height: e.target.value })
                }
              />
              <label>Weight:</label>
              <input
                type="text"
                value={editFormData.Weight}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, Weight: e.target.value })
                }
              />{" "}
              <label>BMI:</label>
              <input
                type="text"
                value={editFormData.BMI}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, BMI: e.target.value })
                }
              />
              <button className="form-btn" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;




