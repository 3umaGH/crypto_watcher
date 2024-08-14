## Cryptocurrency Tracker

This project provides functionality to manage and visualize cryptocurrency data, featuring:

1. **Cryptocurrency List**: Displays a list of cryptocurrencies along with their current prices. Users can:
   - **Search**: Filter cryptocurrencies by name or symbol.

2. **Watched Currencies List**: Allows users to select and monitor specific cryptocurrencies. Each entry displays a detailed candlestick chart showing the historical performance of the selected cryptocurrency. Features include:
   - **Drag and Drop Sorting**: Manually reorder cryptocurrencies in the watched list.
   - **Chart Intervals**: Support for various candlestick chart intervals (e.g., 1-minute, 5-minute, hourly, daily) to view different levels of detail in historical data.

### Key Features
- **Search Functionality**: Quickly filter the cryptocurrency list to find desired entries.
- **Drag and Drop**: Move cryptocurrencies between watched and unwatched lists by dragging them.
- **Candlestick Charts**: Visualize historical data for cryptocurrencies in the watched list with customizable intervals.

### Note on State Management

For larger projects, I would suggest using Redux for state management. Currently, this project uses Context API.

**Stack:** React, dnd-kit, Axios, Chart.js, Tailwind CSS  
**Preview Link:** [https://crypto-watcher-alpha.vercel.app/](https://crypto-watcher-alpha.vercel.app/)
