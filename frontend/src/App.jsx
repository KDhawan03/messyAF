import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import Signup from './pages/signup'
import Landing from './pages/Landing'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {
  
  return (
    <Router>
      <Routes>
          <Route path = "/" element ={<Signup />} />
          <Route element = {<ProtectedRoutes/>}>
            <Route path = "/landing" element ={<Landing />} />
          </Route>

      </Routes>
    </Router>
  )
}

export default App
