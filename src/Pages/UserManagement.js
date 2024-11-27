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
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import axios from "axios";



const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode]=useState(false);
  const[currentUser, setCurrentUser]= useState(null);
  const [newUser,setNewUser]=useState({
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

  // Open Add/Edit User modal
  const handleOpen = (user = null) => {
    if (user) {
      // Edit mode
      setEditMode(true);
      setCurrentUser(user);
      setNewUser(user);
    } else {
      // Add mode
      setEditMode(false);
      setNewUser({ username: "", role: "", status: "Active" });
    }
    setOpen(true);
  };


   // Close Add/Edit User modal
   const handleClose = () => {
    setOpen(false);
    setNewUser({ username: "", role: "", status: "Active" });
    setEditMode(false);
    setCurrentUser(null);
  };

  // Handle form submission for adding/editing a user
  const handleSaveUser = () => {
    if (editMode) {
      // Update existing user
      axios
        .put(`http://localhost:5000/users/${currentUser.id}`, newUser)
        .then((response) => {
          setUsers(
            users.map((user) =>
              user.id === currentUser.id ? response.data : user
            )
          );
          handleClose();
        })
        .catch((err) => {
          console.error("Error updating user:", err);
        });
    } else {
      // Add new user
      axios
        .post("http://localhost:5000/users", newUser)
        .then((response) => {
          setUsers([...users, response.data]);
          handleClose();
        })
        .catch((err) => {
          console.error("Error adding user:", err);
        });
    }
  };

  // Update form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleOpen}>
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
                    onClick={() => handleOpen(user)}
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
      <DialogTitle>{editMode ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="username"
            label="Username"
            type="text"
            fullWidth
            value={newUser.username}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="role"
            label="Role"
            type="text"
            fullWidth
            value={newUser.role}
            onChange={handleChange}
          />

<FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={newUser.status}
              onChange={handleChange}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveUser} color="primary">
            {editMode ? "Save Changes" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;
