import { FC } from "react"
import { Route, Routes } from "react-router-dom"
import Admin from "pages/Admin"
import Login from "pages/Login"
import Page404 from "pages/Page404"

import "./styles.scss"

const App: FC = () => (
  <Routes>
    <Route
      path="/admin/"
      element={<Login />}
    />
    <Route
      path="/admin/login/"
      element={<Login />}
    />
    <Route
      path="/admin/config"
      element={<Admin />}
    />
    <Route
      path="*"
      element={<Page404 />}
    />
  </Routes>
)

export default App
