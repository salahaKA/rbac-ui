import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

function RoleManagement() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null); // Store the role being edited
  const [newRole, setNewRole] = useState({
    name: "",
    permissions: [],
  });

  // Fetch roles from the mock API
  useEffect(() => {
    axios
      .get("http://localhost:5000/roles")
      .then((response) => {
        setRoles(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch roles.");
        console.error("Error fetching roles:", err);
        setLoading(false);
      });
  }, []);

  // Delete role by ID
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/roles/${id}`)
      .then(() => {
        setRoles(roles.filter((role) => role.id !== id));
      })
      .catch((err) => {
        console.error("Error deleting role:", err);
      });
  };

  // Open the Add Role dialog
  const handleOpen = (role = null) => {
    setEditingRole(role); // If editing, set the role being edited
    setNewRole(role || { name: "", permissions: [] });
    setOpen(true);
  };

  // Close the Add/Edit Role dialog
  const handleClose = () => {
    setOpen(false);
    setEditingRole(null);
    setNewRole({ name: "", permissions: [] });
  };

  // Handle form submission (Add or Update Role)
  const handleSaveRole = () => {
    if (editingRole) {
      // Update the existing role
      axios
        .put(`http://localhost:5000/roles/${editingRole.id}`, newRole)
        .then((response) => {
          setRoles(
            roles.map((role) =>
              role.id === editingRole.id ? response.data : role
            )
          );
          handleClose();
        })
        .catch((err) => {
          console.error("Error updating role:", err);
        });
    } else {
      // Add a new role
      axios
        .post("http://localhost:5000/roles", newRole)
        .then((response) => {
          setRoles([...roles, response.data]); // Add the new role to the table
          handleClose();
        })
        .catch((err) => {
          console.error("Error adding role:", err);
        });
    }
  };

  // Update form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRole((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Role Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => handleOpen()}
      >
        Add Role
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
              <TableCell>Role Name</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.id}</TableCell>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role.permissions.join(", ")}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => handleOpen(role)} // Open for editing
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(role.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Add/Edit Role Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingRole ? "Edit Role" : "Add Role"}</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">Role Name:</Typography>
          <Select
            fullWidth
            value={newRole.name}
            onChange={(e) =>
              setNewRole((prev) => ({ ...prev, name: e.target.value }))
            }
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select Role
            </MenuItem>
            {["Admin", "User", "Role"].map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Permissions:
          </Typography>
          <FormGroup>
            {["Read", "Write", "Delete"].map((permission) => (
              <FormControlLabel
                key={permission}
                control={
                  <Checkbox
                    value={permission}
                    checked={newRole.permissions.includes(permission)}
                    onChange={(e) => {
                      const { value, checked } = e.target;
                      setNewRole((prev) => ({
                        ...prev,
                        permissions: checked
                          ? [...prev.permissions, value]
                          : prev.permissions.filter((perm) => perm !== value),
                      }));
                    }}
                  />
                }
                label={permission}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveRole} color="primary">
            {editingRole ? "Save Changes" : "Add Role"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default RoleManagement;
