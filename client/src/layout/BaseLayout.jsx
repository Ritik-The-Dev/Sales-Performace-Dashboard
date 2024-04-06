import { Outlet } from "react-router-dom";
import { Sidebar } from "../components";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { salesData } from "../Recoil/Data";
import { GetSalesData } from "../assets/Api/Api";

const BaseLayout = () => {
  const setSalesData = useSetRecoilState(salesData);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSalesData();
      setSalesData(data);
    };
    fetchData();
  }, []);

  return (
    <main className="bg-[#fafafa] min-h-[100vh] overflow-hidden">
      <Sidebar />
      <div className="bg-[#fafafa] min-h-[100vh] lg:p-14 md:p-10 p-5  lg:ml-64 ml-0 md:ml-10">
        <Outlet />
      </div>
    </main>
  );
};

export default BaseLayout;

export const getSalesData = async () => {
  try {
    const { data } = await axios.get(GetSalesData);
    if (data.success) {
      return data.data;
    } else {
      console.log(data);
    }
  } catch (err) {
    console.log(`Error in Fetching Data -: ${err}`);
  }
};
