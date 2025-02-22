import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Login } from '@src/presentation/pages/Login';
import { Layout } from '@src/presentation/components/Layout/Layout';
import { Routes as RoutesMap } from '@src/routes';
import { Beaches } from '@src/presentation/pages/Beaches';
import { Beach } from '@src/presentation/pages/Beach';
import { Profile } from '@src/presentation/pages/Profile';
import { Home } from '@src/presentation/pages/Home';
import { Auth } from '@src/presentation/pages/Auth';
import { Verification } from '@src/presentation/pages/Verification';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={RoutesMap.Login} element={<Login />} />
          <Route path={RoutesMap.Home} element={<Home />}>
            <Route path={RoutesMap.Auth} element={<Auth />} />
            <Route path={RoutesMap.Verification} element={<Verification />} />
            <Route path={RoutesMap.Beaches} element={<Beaches />} />
            <Route path={RoutesMap.Beach} element={<Beach />} />
          </Route>
          <Route path={RoutesMap.Profile} element={<Profile />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
