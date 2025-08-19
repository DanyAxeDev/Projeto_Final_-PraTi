import { BrowserRouter as Router, Routes, Route } from "react-router"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" />
        </Route>

        <Route element={<LoggedInLayout />}>
          <Route path="/home" />
        </Route>
      </Routes>
    </Router>
  )
}