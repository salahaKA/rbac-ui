import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from './Components/Layout'
import UserManagement from './Pages/UserManagement'
import RoleManagement from './Pages/RoleManagement'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route path="users" element={<UserManagement />} />
          <Route path="roles" element={<RoleManagement />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App