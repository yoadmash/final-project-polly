import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Auth from '../src/components/Auth_/Authentication';
import RequireAuth from './components/Auth_/RequireAuth';
import PersistLogin from './components/Auth_/PersistLogin';
import Dashboard from '../src/components/Dashboard/Dashboard';
import AnswerPoll from './components/Form/AnswerPoll/AnswerPoll';
import MissingPage from './components/MissingPage';
import CreatePoll from './components/Form/CreatePoll/CreatePoll';
import CreateTemplate from './components/Form/CreatePoll/CreateTemplate';
import ViewAnswers from './components/Form/ViewAnswers/ViewAnswers';
import PollSummary from './components/Form/ViewAnswers/PollSummary';
import ResetPasswordForm from './components/Auth_/ResetPasswordForm';
import AdminPanel from './components/AdminPanel/AdminPanel';
import { AuthErrMsgProvider } from './contexts/AuthErrMsgProvider';
import { AdminPanelErrProvider } from './contexts/AdminPanelErrProvider';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <Routes>
        <Route path='/auth' element={<AuthErrMsgProvider><Auth /></AuthErrMsgProvider>} />
        <Route path='/auth/reset_password' element={<ResetPasswordForm />} />

        <Route path='/' element={<Layout />}>
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path='/' element={<Dashboard />} />
              <Route path='/admin' element={<AdminPanelErrProvider><AdminPanel /></AdminPanelErrProvider>} />
              <Route path='/template/create' element={<CreateTemplate />} />
              <Route path='/template/:id/edit' element={<CreateTemplate />} />
              <Route path='/poll/create/new' element={<CreatePoll />} />
              <Route path='/poll/:id' element={<AnswerPoll />} />
              <Route path='/poll/:id/edit' element={<CreatePoll />} />
              <Route path='/poll/:id/view_answers' element={<ViewAnswers />} />
              <Route path='/poll/:id/summary' element={<PollSummary />} />
            </Route>
          </Route>

        </Route>
        <Route path='*' element={<MissingPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;