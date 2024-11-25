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
} from "@mui/material";
import axios from "axios";




function RoleManagement() {
    const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Role Management
      </Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }}>
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
    </Box>
  );
}

export default RoleManagement;
