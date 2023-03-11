import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './App.css';
import Sidebar from './components/Sidebar';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard.jsx';
import DoneWebsites from './pages/DoneWebsites';
import Login from './pages/Login.jsx';
import Manager from './pages/Manager';
import Redirect from './pages/Redirect';
import Requests from './pages/Requests';
import Tech from './pages/Tech';
import Websites from './pages/Websites';

function App() {
  return (
    <>
    <div className='flex flex-row'>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/allrequests" element={<Requests />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/tech" element={<Tech />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/websites" element={<Websites />} />
        <Route path="/donewebsites" element={<DoneWebsites />} />
      </Routes>

    </div>
    </>
  );
}

export default App;
