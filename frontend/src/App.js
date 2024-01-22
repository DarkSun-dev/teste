import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import ErrorPage from "./pages/ErrorPage"
import Location from "./pages/Location"

const App = () => {
  return (
    <div className="container"> 
      <Routes>
        <Route path='*' element={<ErrorPage />} />
        <Route path='/location' element={<Location />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
