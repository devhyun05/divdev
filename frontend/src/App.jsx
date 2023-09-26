import './App.css';
import NavigationComponent from './components/NavigationComponent';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'; 
import Profile from './pages/Profile';
import Posts from './pages/Posts';
import Settings from './pages/Settings';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms'; 
import { LoginProvider } from './context/LoginContext';  
import { Route, Routes} from "react-router-dom"; 
function App() {
  
 
  return (
    <div className="App">
      <LoginProvider>
        <NavigationComponent/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/:username" element={<Home />}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/> 
          <Route path="/posts" element={<Posts/>}/> 
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/privacy" element={<Privacy />}/>
          <Route path="/terms" element={<Terms/>}/>
        </Routes>
      </LoginProvider>
    </div>
  );
}

export default App;
