import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend)

createRoot(document.getElementById('root')!).render(
  <div className='font-anek'>
    <App />
  </div>
)
