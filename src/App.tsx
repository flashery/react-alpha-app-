import React, { useEffect, useState } from 'react';
import './index.css';

type TimeSeriesValue = {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. volume': string;
};

type FetchedData = {
  'Time Series (5min)': Record<string, TimeSeriesValue>;
};


const App: React.FC = () => {
  const [data, setData] = useState<[string, TimeSeriesValue][]>([]);
  const API_ENDPOINT = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=RIBXT3XYLI69PC0Q';

  useEffect(() => {
    fetch(API_ENDPOINT)
      .then(response => response.json())
      .then((data: FetchedData) => {
        const timeSeriesData = data['Time Series (5min)'];
        setData(Object.entries(timeSeriesData));
      })
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Time</th>
            <th className="py-2 px-4 border">Open</th>
            <th className="py-2 px-4 border">High</th>
            <th className="py-2 px-4 border">Low</th>
            <th className="py-2 px-4 border">Close</th>
            <th className="py-2 px-4 border">Volume</th>
          </tr>
        </thead>
        <tbody>
          {data.map(([time, values]) => (
            <tr key={time}>
              <td className="py-2 px-4 border">{time}</td>
              <td className="py-2 px-4 border">{values['1. open']}</td>
              <td className="py-2 px-4 border">{values['2. high']}</td>
              <td className="py-2 px-4 border">{values['3. low']}</td>
              <td className="py-2 px-4 border">{values['4. close']}</td>
              <td className="py-2 px-4 border">{values['5. volume']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
