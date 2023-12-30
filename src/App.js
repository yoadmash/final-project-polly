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
import ViewAnswers from './components/Form/ViewAnswers/ViewAnswers';
import PollSummary from './components/Form/ViewAnswers/PollSummary';
import ResetPasswordForm from './components/Auth_/ResetPasswordForm';


function App() {
  return (
    <>
      <Routes>
        <Route path='/auth' element={<Auth />} />
        <Route path='/auth/reset_password' element={<ResetPasswordForm />} />

        <Route path='/' element={<Layout />}>
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path='/' element={<Dashboard />} />
              <Route path='/poll/create/new' element={<CreatePoll />} />
              {/* <Route path='/poll/create/template' element={<CreatePoll />} /> */}
              <Route path='/poll/:id' element={<AnswerPoll />} />
              <Route path='/poll/:id/edit' element={<CreatePoll />} />
              <Route path='/poll/:id/view_answers' element={<ViewAnswers />} />
              <Route path='/poll/:id/summary' element={<PollSummary />} />
            </Route>
          </Route>

        </Route>
        <Route path='*' element={<MissingPage />} />
      </Routes>
    </>
  );
}

export default App;