import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from '../Layout/DefaultLayout/DefaultLayout';
import ProviderFiltersContext from '../pages/Movie/context/FiltersContext/Provider';
import { routes } from '../routes';
import AuthRoute from '../routes/AuthRoute';
import NoAuthRoute from '../routes/NoAuthRoute';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {routes.map((route, index) => {
            let Auth = Fragment;
            if (route.hasOwnProperty('auth'))
              if (route.auth) Auth = AuthRoute;
              else Auth = NoAuthRoute;
            const Page = route.component;
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Auth>
                    <Layout>
                      <ProviderFiltersContext>{Page}</ProviderFiltersContext>
                    </Layout>
                  </Auth>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
