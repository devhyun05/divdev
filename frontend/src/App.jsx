import './App.css';
import NavigationComponent from './components/NavigationComponent';
import Home from './pages/Home';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Login from './pages/Login';
import Register from './pages/Register'; 
import Terms from './pages/Terms'; 
import { LoginProvider } from './context/LoginContext';  
import { Route, Routes } from "react-router-dom"; 
function App() {
  return (
    <div className="App">
      <LoginProvider>
        <NavigationComponent/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/:username" element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/privacy" element={<Privacy />}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/terms" element={<Terms/>}/>
        </Routes>
      </LoginProvider>
    </div>
  );
}

export default App;
