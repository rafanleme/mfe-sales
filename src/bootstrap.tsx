import React from 'react';
import { createRoot } from 'react-dom/client';
import SalesApp from './SalesApp';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root')!);
root.render(
  <BrowserRouter>
    <SalesApp />
  </BrowserRouter>
);
