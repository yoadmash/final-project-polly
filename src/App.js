import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminFormPage from './components/Form/Admin/AdminFormPage';
import UserFormPage from './components/Form/User/UserFormPage';
import DashboardHeader from './components/DashboardHeader/DashboardHeader';
// import Auth from './components/Auth_/Authentication';
// import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      {/* <Auth/> */}
      {/* <Dashboard /> */}

      <DashboardHeader />

      <AdminFormPage />
      <UserFormPage poll={{
        questions: [
          { //single option
            question: "is alex homo1?",
            answers: ["yes", "yes", "yes", "all of the above"],
            answersType: 'radio'
          },
          { //multiple option
            question: "is alex homo2?",
            answers: ["yes", "yes", "yes", "all of the above"],
            answersType: 'checkbox'
          },
          { //text option
            question: "is alex homo3?",
            answers: ["yes", "yes", "yes", "all of the above"],
            answersType: 'text'
          }
        ]
      }} />
    </div>
  );
}

export default App;