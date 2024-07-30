import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SendWhatsappMessage from './features/SendWhatsappMessage/SendWhatsappMessage';
// import SendEmail from './features/SendEmail/SendEmail';
// import PaymentGateway from './features/PaymentGateway/PaymentGateway';
import AboutOlympiad from './features/AboutOlympiad/AboutOlympiad';
import ReferEarn from './features/ReferEarn/ReferEarn';
import Awards from './features/Awards/Awards';
import FAQ from './features/FAQ/FAQ';
import LiveMasterClass from './features/LiveMasterClass/LiveMasterClass';
import Report from './features/Report/Report';
import AboutupEducators from './features/AboutupEducators/AboutupEducators';
import Header from './components/Header/Header';

import './App.css';



const App = () => {
  return (
    <Router>
      <div className="App">
      <Header />
        <Routes>
          <Route path="/" element={<AboutOlympiad />} />
          <Route path="/AboutOlympiad" element={<AboutOlympiad />} />
          <Route path="/ReferEarn" element={<ReferEarn />} />
          <Route path="/Awards" element={<Awards />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/LiveMasterClass" element={<LiveMasterClass />} />
          <Route path="/Report" element={<Report />} />
          <Route path="/AboutupEducators" element={<AboutupEducators />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
