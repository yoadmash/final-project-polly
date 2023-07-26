import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import AdminFormPage from './components/Form/Admin/AdminFormPage';
// import UserFormPage from './components/Form/User/UserFormPage';
// import DashboardHeader from './components/DashboardHeader/DashboardHeader';
// import Auth from './components/Auth_/Authentication';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      {/* <Auth/> */}
      <Dashboard />

      {/* <DashboardHeader />
      <UserFormPage />
      <AdminFormPage /> */}
    </div>
  );
}

export default App;