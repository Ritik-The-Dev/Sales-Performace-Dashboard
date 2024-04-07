import { Outlet } from "react-router-dom";
import { Sidebar } from "../components";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";
import { DarkMode, salesData } from "../Recoil/Data";
import ClipLoader from "react-spinners/ClipLoader";
import { GetSalesData } from "../assets/Api/Api";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const BaseLayout = () => {
  const [Loading, setLoading] = useState(false);
  const darkMode = useRecoilValue(DarkMode)
  let [color, setColor] = useState("#ffffff");
  const setSalesData = useSetRecoilState(salesData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getSalesData();
        setSalesData(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main className={`${darkMode ? 'bg-slate-800 text-white':'bg-[#fafafa] text-black'} min-h-[100vh] overflow-hidden`}>
      <Sidebar />
      <div className={`${darkMode ? 'bg-slate-800 text-white':'bg-[#fafafa] text-black'} min-h-[100vh] lg:p-14 md:p-10 p-5  lg:ml-64 ml-0 md:ml-10`}>
        {Loading ? (
          <div className="sweet-loading flex items-center justify-center flex-col h-[80vh]">
            <ClipLoader
              color={color}
              s
              loading={Loading}
              cssOverride={override}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <h1 className="text-center mt-5">Loading Charts...</h1>
          </div>
        ) : (
          <Outlet />
        )}
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
