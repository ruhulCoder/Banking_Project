import React from 'react';
import Dashboard from './pages/Dashboard';
import InvoiceReceived from './pages/InvoiceReceived';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/invoice-received" element={<InvoiceReceived />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
