import { BrowserRouter as Router, Routes, Route } from "react-router"
import PublicLayout from "./layouts/PublicLayout"
import LandingPage from "./pages/landing-page/LandingPage"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        {/* <Route element={<LoggedInLayout />}>
          <Route path="/home" />
        </Route> */}
      </Routes>
    </Router>
  )
}