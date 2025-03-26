import 'normalize.css';
// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import 'swiper/swiper-bundle.css';
import './styles/react-modal-sheet.css';
import 'react-calendar/dist/Calendar.css';
import '@xyflow/react/dist/style.css';
import './styles/plan.css';
import './styles/calendar.css';

import { registerSW } from 'virtual:pwa-register';

registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(
  <App />
)

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )