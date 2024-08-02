import { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import PaymentGateway from './features/PaymentGateway/PaymentGateway';
import AboutOlympiad from './features/AboutOlympiad/AboutOlympiad';
import ReferEarn from './features/ReferEarn/ReferEarn';
import Awards from './features/Awards/Awards';
import FAQ from './features/FAQ/FAQ';
import LiveMasterClass from './features/LiveMasterClass/LiveMasterClass';
import Report from './features/Report/Report';
import AboutUpEducators from './features/AboutUpEducators/AboutUpEducators';
import Login from './features/Login/Login';
import Header from './components/Header/Header';
import PageNavigation from './components/PageNavigation/PageNavigation';

import './App.css';

const App = () => {
  const [hasSessionId, setHasSessionId] = useState(false);
  const location = useLocation(); // Get the current route location

  useEffect(() => {
    const olympd_prefix = localStorage.getItem('olympd_prefix');
    if (olympd_prefix) {
      const user = JSON.parse(olympd_prefix);
      if (user?.sessionId) {
        setHasSessionId(true);
      }
    }
  }, []);

  const shouldShowPageNavigation = !hasSessionId || location.pathname !== '/PaymentGateway';

  return (
    <div className="App">
      {!hasSessionId ? (
        <>
          <Login />
          <PaymentGateway />
        </>
      ) : (
        <>
          <Header />
          <div className="container-wrapper">
            {shouldShowPageNavigation && <PageNavigation />}
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/PaymentGateway" element={<PaymentGateway />} />
              <Route path="/AboutOlympiad" element={<AboutOlympiad />} />
              <Route path="/ReferEarn" element={<ReferEarn />} />
              <Route path="/Awards" element={<Awards />} />
              <Route path="/FAQ" element={<FAQ />} />
              <Route path="/LiveMasterClass" element={<LiveMasterClass />} />
              <Route path="/Report" element={<Report />} />
              <Route path="/AboutUpEducators" element={<AboutUpEducators />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
};

export default () => (
  <Router>
    <App />
  </Router>
);
