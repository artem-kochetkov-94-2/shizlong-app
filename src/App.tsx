import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Layout } from '@src/presentation/components/Layout/Layout';
import { Routes as RoutesMap } from '@src/routes';
import { Locations } from '@src/presentation/pages/Locations';
// todo
import { Location } from '@src/presentation/pages/Beach';
import { Sector } from '@src/presentation/pages/Sector';
import { Profile } from '@src/presentation/pages/Profile';
import { Home } from '@src/presentation/pages/Home';
import { Auth } from '@src/presentation/pages/Auth';
import { Verification } from '@src/presentation/pages/Verification';
import { Init } from '@src/presentation/pages/Init';
import { Cities } from './presentation/pages/Cities';
import { Favorites } from './presentation/pages/Favorites';
import { Notifications } from './presentation/pages/Notifications';
import { Abonements } from './presentation/pages/Abonements';
import { Abonement } from './presentation/pages/Abonement';
import { Module } from './presentation/pages/Module';
import { Booking } from './presentation/pages/Booking';
import { NotificationsSettings } from './presentation/pages/NotificationsSettings';
import { Support } from './presentation/pages/Support';
import { ProfileEdit } from './presentation/pages/ProfileEdit';
import { PaymentMethods } from './presentation/pages/PaymentMethods';
import { PrivacyPolicy } from './presentation/pages/PrivacyPolicy';
import { UiKit } from './presentation/pages/UiKit';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={RoutesMap.Home} element={<Home />}>
            <Route path={RoutesMap.Init} element={<Init />} />
            <Route path={RoutesMap.Auth} element={<Auth />} />
            <Route path={RoutesMap.Verification} element={<Verification />} />
            <Route path={RoutesMap.Cities} element={<Cities />} />
            <Route path={RoutesMap.Locations} element={<Locations />} />
            <Route path={RoutesMap.Location} element={<Location />} />
            <Route path={RoutesMap.Sector} element={<Sector />} />
            <Route path={RoutesMap.Module} element={<Module />} />
            <Route path={RoutesMap.Booking} element={<Booking />} />
          </Route>
          <Route path={RoutesMap.Profile} element={<Profile />} />
          <Route path={RoutesMap.ProfileEdit} element={<ProfileEdit />} />
          <Route path={RoutesMap.Favorites} element={<Favorites />} />
          <Route path={RoutesMap.Notifications} element={<Notifications />} />
          <Route
            path={RoutesMap.NotificationSettings}
            element={<NotificationsSettings />}
          />
          <Route path={RoutesMap.Abonements} element={<Abonements />} />
          <Route path={RoutesMap.Abonement} element={<Abonement />} />
          <Route path={RoutesMap.Support} element={<Support />} />
          <Route path={RoutesMap.PaymentMethods} element={<PaymentMethods />} />
          <Route path={RoutesMap.Privacy} element={<PrivacyPolicy />} />
          <Route path={RoutesMap.UiKit} element={<UiKit />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
