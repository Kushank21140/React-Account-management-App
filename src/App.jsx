import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import { Navigate } from "react-router";
import Header from './Components/Header';
import Home from './Components/Home';
import { Auth, AuthProvider } from './Context/Auth';
import RouteGaurd from './Components/RouteGaurd';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Navigate to="/Login" replace />} />
          <Route index path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Home' element={<RouteGaurd> <Home />
          </RouteGaurd>} />
        </Routes>
      </BrowserRouter >
    </AuthProvider>
  );
}

export default App;
