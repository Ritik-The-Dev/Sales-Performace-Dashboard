import { MdOutlineMenu } from "react-icons/md";
import { useSetRecoilState } from "recoil";
import { showNav } from "../../../Recoil/Data";

const AreaTop = ({Heading}) => {
  const setShowNavBar = useSetRecoilState(showNav)
  return (
    <section className="mb-4 flex items-start justify-start w-full gap-6 flex-wrap">
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
    </section>
  );
};

export default AreaTop;
