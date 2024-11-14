import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CampaignsList from "./pages/CampaignsList";
import CampaignStats from "./pages/CampaignStats";
import CreateCampaign from "./pages/CreateCampaign";
import MessageLogs from "./pages/MessageLogs";
import SendMessages from "./pages/SendMessages"; // Import the new page
import Dashboard from "./pages/Dashboard"; // Add Dashboard Page
import LandingPage from "./pages/LandingPage"; // Add Landing Page
import AudienceBuilder from "./pages/AudienceBuilder";

import "./App.css";

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<LandingPage />} /> {/* Landing Page */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/campaigns" element={<CampaignsList />} />
              <Route path="/create" element={<CreateCampaign />} />
              <Route path="/campaigns/:id" element={<CampaignStats />} />
              <Route path="/logs" element={<MessageLogs />} />
              <Route path="/send/:id" element={<SendMessages />} />
              <Route path="/audience-builder" element={<AudienceBuilder />} />

          </Routes>
      </Router>
  );
};

export default App;
