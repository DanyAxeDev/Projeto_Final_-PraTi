import { BrowserRouter as Router, Routes, Route } from "react-router"
import PublicLayout from "./layouts/PublicLayout"
import LandingPage from "./pages/landing-page/LandingPage"
import LoginPage from "./pages/login/LoginPage"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />

        {/* <Route element={<LoggedInLayout />}>
          <Route path="/home" />
        </Route> */}
      </Routes>
    </Router>
  )
}