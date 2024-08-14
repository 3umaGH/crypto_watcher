import { Chart, registerables } from 'chart.js'
import zoomPlugin from 'chartjs-plugin-zoom'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

Chart.register(...registerables, zoomPlugin)

createRoot(document.getElementById('root')!).render(
  <div className='font-anek'>
    <App />
  </div>
)
