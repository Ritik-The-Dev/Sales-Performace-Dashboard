import { FaArrowUpLong } from "react-icons/fa6";
import { useRecoilState, useRecoilValue } from "recoil";
import { Products, Total } from "../../../Recoil/Data";
import { useEffect} from "react";


const AreaBarChart = () => {
  const products = useRecoilValue(Products);
  const [total, setTotal] = useRecoilState(Total);
  
  useEffect(() => {
    const totalRevenue = products.reduce((acc, product) => {
      return acc + product.sales;
    }, 0);
    setTotal(totalRevenue);
  }, [products]);
  
  return (
    <div className="bg-white p-6 rounded-md shadow-light-shadow1">
      <div className="bar-chart-info mb-8">
        <h5 className="text-xl font-bold text-text-color-inverted mb-4">Total Revenue</h5>
        <div className="chart-info-data flex items-center gap-3">
          <div className="text-2xl font-bold text-xl-text-color">${Math.round(total)}</div>
        </div>
      </div>
      <div>
      {products.map((progressbar) => (
          <div key={progressbar.PRODUCTLINE} >
            <div className=" flex justify-between items-center mb-2">
              <p className="text-text-color-inverted font-semibold">
                {progressbar.PRODUCTLINE}
              </p>
              <p className="text-text-color-inverted font-semibold">
                {`$${Math.round(progressbar.sales)}`}
              </p>
            </div>
            <div className="relative w-full h-2 bg-gray-200 rounded-full p-2">
              <div
                className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                style={{ width: `${Math.round(progressbar.percentage)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AreaBarChart;
