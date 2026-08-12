'use client';
import Image from "next/image";
import { useEffect , useState,useCallback} from "react";
import { responseData } from "./types/dashboard.types";


export default function Home() {
  const Filters = ['All', 'Pinned', 'Gainers','Losers'];
  const [data, setData] = useState<responseData[]>([]);
 const fetchData = useCallback(async() => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=10&page=1&sparkline=true');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }, []);
    useEffect(() => {
      fetchData();
    }, [fetchData]);
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-black sm:items-start">
        <div className="w-full shadow-lg p-4 text-white bg-[#0d0d10] rounded-lg">
          <div className="flex w-full justify-between">
            <div className="card left-side">
              <h4 className="text-lg text-gray-500 letter-spacing-1">PORTFOLIO</h4>
              <h1 className="text-3xl font-bold">watchlist</h1>
            </div>
            <div className="card right-side">
              <button className="refresh-button text-white px-4 py-2 rounded-2xl hover:bg-gray-400">
                ⟳
              </button>
            </div>
          </div>
          <div className="py-2">
            <input
              type="text"
              placeholder="Search assets"
              className="search-input border border-gray-100 rounded px-4 py-2 w-full"
            />
          </div>
          <div className="py-2">
            {Filters.map((filter, index) => (
              <button
                key={index}
                className="filter-button bg-black text-gray-700 px-4 py-2 rounded hover:bg-gray-300 rounded-full cursor-pointer"
              >
                {filter}
              </button>
            ))}

          </div>
          <div className="py-2">
          {data.map((item) => (
            <div key={item.id} className="w-full shadow-lg flex items-center justify-between p-2 bg-[#16161b] mb-2 rounded-2xl cursor-pointer hover:bg-[#1b1b1f]">
              <div className="flex items-center">
                <div className="mr-2">
                  <Image src={item.image} alt={item.name} width={40} height={40} />
                </div>
                <div className="flex flex-col">
                <span className="text-white">{item.name}</span>
                <span className="text-gray-500">{item.symbol.toUpperCase()}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col items-center justify-end">
                <span className="text-white">₹{item.current_price}</span>
                <span className={`text-${item?.price_change_percentage_24h_in_currency >= 0 ? 'green' : 'red'}-500`}>
                   {item?.price_change_percentage_24h_in_currency >= 0 ? '▲ ' : '▼ '}{item?.price_change_percentage_24h}
                </span>
                </div>
                 <span>★</span>
              </div>
             
            </div>
          ))}
            </div>
        </div>
      </main>
    </div>
  );
}
