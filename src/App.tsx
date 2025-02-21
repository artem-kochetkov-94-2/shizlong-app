import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Login } from './presentation/pages/Login';
import { Layout } from './presentation/components/Layout/Layout';
import { Routes as RoutesMap } from './routes';
import { Beaches } from './presentation/pages/Beaches';
import { Beach } from './presentation/pages/Beach';
import { Profile } from './presentation/pages/Profile';
import { Home } from './presentation/pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={RoutesMap.Login} element={<Login />} />
          <Route path={RoutesMap.Home} element={<Home />}>
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
