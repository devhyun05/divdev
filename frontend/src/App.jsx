import './App.css';
import NavigationComponent from './components/NavigationComponent';
import Home from './pages/Home';
import About from './pages/About';
import Privacy from './pages/Privacy';
import SignIn from './pages/SignIn';
import Terms from './pages/Terms'; 
import { Route, Routes} from "react-router-dom"; 
function App() {
  return (
    <div className="App">
      <NavigationComponent/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/privacy" element={<Privacy />}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/terms" element={<Terms/>}/> 
        </Routes>
      </div>
    </div>
  );
}

export default App;
