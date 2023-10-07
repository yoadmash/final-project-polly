import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import { useForm, FormProvider } from "react-hook-form";
import Layout from './components/Layout/Layout';
import Auth from '../src/components/Auth_/Authentication';
import RequireAuth from './components/Auth_/RequireAuth';
import PersistLogin from './components/Auth_/PersistLogin';
import Dashboard from '../src/components/Dashboard/Dashboard';
import AdminFormPage from '../src/components/Form/Admin/AdminFormPage';
import UserFormPage from '../src/components/Form/User/UserFormPage';
import MissingPage from './components/MissingPage';
import CreatePoll from './components/Form/CreatePoll/CreatePoll';


function App() {
  const methods = useForm();
  return (
    <>
      <Routes>
        <Route path='/auth' element={<Auth />} />
        <Route path='/' element={<Layout />}>

          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path='/' element={<Dashboard />} />
              <Route path='create-new-poll' element={<AdminFormPage />} />
              <Route path='create-new-poll-2' element={
                <FormProvider {...methods}>
                  <CreatePoll />
                </FormProvider>
              } />
              <Route path='poll/:id' element={<UserFormPage />} />
              <Route path='poll/:id/edit' element={<AdminFormPage />} />
            </Route>
          </Route>

        </Route>
        <Route path='*' element={<MissingPage />} />
      </Routes>
    </>
  );
}

export default App;