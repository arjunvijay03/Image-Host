
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import ImageViewPage from './Pages/ImageViewPage';
import { useContext } from 'react';
import { authContext } from './Contexts/AuthContext';

function App() {
  const {user} = useContext(authContext)
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route exact path={'/'} element={
          user ?<Home></Home>:<LoginPage></LoginPage>}/>
          <Route path={'/login'} element={<LoginPage></LoginPage>}/>
          <Route path={'/signup'} element={<SignupPage></SignupPage>}/>
          <Route path={'/imageview/:imageId'} element={<ImageViewPage></ImageViewPage>}/>
        </Routes>
      </Router>


     
    </div>
  );
}

export default App;
