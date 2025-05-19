import { StrictMode } from 'react';

import HomePage from '@/pages/home';

import '@/styles/global.css';

import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HomePage />
    </StrictMode>
);
