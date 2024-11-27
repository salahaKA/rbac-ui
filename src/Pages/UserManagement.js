import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Box,
  Typography,
  CircularProgress,
  TextField,
  DialogActions,
  DialogTitle,
  DialogContent,
  Dialog,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";


const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    username: "",
    role: "",
    status: "Active",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch users.");
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
      });
  };

  // Open Add User modal
  const handleOpen = () => setOpen(true);

  // Close Add User/Edit User modal
  const handleClose = () => {
    setOpen(false);
    setEditingUser(null); // Clear editing state when closing dialog
    setNewUser({ username: "", role: "", status: "Active" });
  };

  // Handle form submission
  const handleAddUser = () => {
    axios
      .post("http://localhost:5000/users", newUser)
      .then((response) => {
        setUsers([...users, response.data]); // Add new user to the table
        handleClose();
      })
      .catch((err) => {
        console.error("Error adding user:", err);
      });
  };

  // Handle form submission for editing a user
  const handleUpdateUser = () => {
    axios
      .put(`http://localhost:5000/users/${editingUser.id}`, editingUser)
      .then((response) => {
        // Update the user in the list
        setUsers(
          users.map((user) =>
            user.id === editingUser.id ? response.data : user
          )
        );
        handleClose();
      })
      .catch((err) => {
        console.error("Error updating user:", err);
      });
  };

  // Update form fields for Add User or Edit User
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingUser) {
      setEditingUser((prev) => ({ ...prev, [name]: value })); // Update editing user
    } else {
      setNewUser((prev) => ({ ...prev, [name]: value })); // Update new user for add
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user); // Set the user to be edited
    setOpen(true); // Open the dialog
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={handleOpen}
      >
        Add User
      </Button>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => handleEdit(user)} // Open edit dialog
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {/* Add User Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="username"
            label="Username"
            type="text"
            fullWidth
            value={editingUser ? editingUser.username : newUser.username}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="role"
            label="Role"
            type="text"
            fullWidth
            // value={newUser.role}
            value={editingUser ? editingUser.role : newUser.role}
            onChange={handleChange}
          />

          {/* Status dropdown */}
          <Select
            margin="dense"
            name="status"
            label="Status"
            fullWidth
            value={editingUser ? editingUser.status : newUser.status}
            onChange={handleChange}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
          {/* <TextField
            margin="dense"
            name="status"
            label="Status"
            type="text"
            fullWidth
            value={editingUser ? editingUser.status : newUser.status}
            onChange={handleChange}
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          {/* <Button onClick={handleAddUser} color="primary">
            Add
          </Button> */}
          <Button
            onClick={editingUser ? handleUpdateUser : handleAddUser}
            color="primary"
          >
            {editingUser ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;
