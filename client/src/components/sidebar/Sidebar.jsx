import {
  MdOutlineAttachMoney,
  MdOutlineBarChart,
  MdOutlineClose,
  MdOutlineGridView,
  MdOutlineLogout,
} from "react-icons/md";
import { SignedIn,SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { DarkMode, showNav } from "../../Recoil/Data";
import './Sidebar.css'

const Sidebar = () => {
  const darkMode = useRecoilValue(DarkMode)
  const [showNavBar, setShowNavBar] = useRecoilState(showNav);

  return (
    <nav className={`sidebar ${darkMode ? 'bg-slate-700 text-white':'bg-white text-black'} lg:flex ${showNavBar ? 'flex' : 'hidden'}`} style={{boxShadow: 'rgba(100, 100, 111, 0.1) 0px 7px 29px 0px' }}>
      <div className="sidebar-top flex items-center justify-between py-4 px-5 border-b border-gray-200">
        <button className="lg:hidden ml-[-3rem]" onClick={() => setShowNavBar(false)}>
          <MdOutlineClose size={24} />
        </button>
        <div className="sidebar-brand">
          <span className="sidebar-brand-text text-1xl gap-2">Dashboard.</span>
        </div>
      </div>
      <div className="sidebar-body flex flex-col justify-between">
        <div className="sidebar-menu mt-5">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/" className="menu-link" onClick={() => setShowNavBar(false)}>
                <span className="menu-link-icon">
                  <MdOutlineGridView size={18} />
                </span>
                <span className="menu-link-text">Dashboard</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/orders" className="menu-link" onClick={() => setShowNavBar(false)}>
                <span className="menu-link-icon">
                  <MdOutlineBarChart size={20} />
                </span>
                <span className="menu-link-text">Orders</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/analytics" className="menu-link" onClick={() => setShowNavBar(false)}>
                <span className="menu-link-icon">
                  <MdOutlineAttachMoney className="" size={20} />
                </span>
                <span className="menu-link-text">Analytics</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="sidebar-menu mt-5">
          <ul className="menu-list">
            <li className="menu-item">
              <div className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineLogout size={20} />
                </span>
                <span className="menu-link-text">
                  <header>
                    <SignedOut>
                      <SignInButton />
                    </SignedOut>
                    <SignedIn>
                      <UserButton />
                    </SignedIn>
                  </header>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
