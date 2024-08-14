import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

createRoot(document.getElementById('root')!).render(
  <div className='font-anek'>
    <App />
  </div>
)
