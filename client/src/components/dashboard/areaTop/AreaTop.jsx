import { MdOutlineMenu } from "react-icons/md";
import { useRecoilState, useSetRecoilState } from "recoil";
import { DarkMode, showNav } from "../../../Recoil/Data";
import { MdDarkMode,MdLightMode } from "react-icons/md";

const AreaTop = ({Heading}) => {
  const setShowNavBar = useSetRecoilState(showNav)
  const [darkMode,setDarkMode] = useRecoilState(DarkMode)
  return (
    <section className="mb-4 flex items-start justify-start w-full gap-6 flex-wrap">
      <div className="flex items-center justify-between w-full">
      <div className="area-top-l flex items-center gap-6">
        <button
          className="sidebar-open-btn px-2 lg:hidden items-center mb-[-1px] text-text-color-inverted"
          type="button"
          onClick={()=>setShowNavBar(true)}
        >
          <MdOutlineMenu size={24} />
        </button>
        <h2 className="area-top-title text-2xl text-text-color-inverted">{Heading}</h2>
      </div>
      <div className={`${darkMode ? 'bg-white text-black':'bg-slate-800 text-white'} p-2 rounded-full cursor-pointer`} onClick={()=>setDarkMode(!darkMode)}>
        {
          darkMode ? <MdLightMode className="text-2xl"/> :<MdDarkMode className="text-2xl"/> 
        }
      </div>
      </div>
    </section>
  );
};

export default AreaTop;
