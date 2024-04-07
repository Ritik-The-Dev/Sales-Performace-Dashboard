import { useEffect, useRef, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import axios from "axios";
import { getSalesData } from "../../../layout/BaseLayout";
import { DarkMode, salesData } from "../../../Recoil/Data";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { MdOutlineAdd } from "react-icons/md";
import { FaMinus } from "react-icons/fa6";
import { DeleteOrderApi, EditOrderApi } from "../../../assets/Api/Api";

const AreaTableAction = ({ orderDetails }) => {
  const darkMode = useRecoilValue(DarkMode)
  const token = useState(localStorage.getItem("token"));
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showEditBox, setShowEditBox] = useState(false);
  const [EditOrderDetails, setEditOrderDetails] = useState({
    QUANTITYORDERED: orderDetails.QUANTITYORDERED,
    STATUS: orderDetails.STATUS,
    CUSTOMERNAME: orderDetails.CUSTOMERNAME,
    PHONE: orderDetails.PHONE,
    ADDRESSLINE1: orderDetails.ADDRESSLINE1,
    CITY: orderDetails.CITY,
    STATE: orderDetails.STATE,
    POSTALCODE: orderDetails.POSTALCODE,
    COUNTRY: orderDetails.COUNTRY,
    TERRITORY: orderDetails.TERRITORY,
  });
  const setSalesData = useSetRecoilState(salesData);

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  const EditOrder = async () => {
    if (!token[0]) {
      setShowEditBox(false);
      return alert("Login to Perform this Action");
    } else {
      try {
        const { data } = await axios.put(
          EditOrderApi,
          {
            id: orderDetails._id,
            QUANTITYORDERED: EditOrderDetails.QUANTITYORDERED,
            STATUS: EditOrderDetails.STATUS,
            CUSTOMERNAME: EditOrderDetails.CUSTOMERNAME,
            PHONE: EditOrderDetails.PHONE,
            ADDRESSLINE1: EditOrderDetails.ADDRESSLINE1,
            CITY: EditOrderDetails.CITY,
            STATE: EditOrderDetails.STATE,
            POSTALCODE: EditOrderDetails.POSTALCODE,
            COUNTRY: EditOrderDetails.COUNTRY,
            TERRITORY: EditOrderDetails.TERRITORY,
          },
          {
            headers: {
              Authorization: `Bearer ${token[0]}`,
            },
          }
        );
        if (data.success) {
          alert("Order Edited Successfully");
          setShowEditBox(false);
          const data = await getSalesData();
          setSalesData(data);
        } else {
          alert("Error Occurred! Please Try Again Later");
          console.log(data);
        }
      } catch (err) {
        console.log("Something Went Wrong", err);
      }
    }
  };

  const DeleteOrder = async () => {
    if (!token[0]) {
      setShowAlert(false);
      return alert("Login to Perform this Action");
    } else {
      try {
        const { data } = await axios.post(
          DeleteOrderApi,
          { id: orderDetails._id },
          {
            headers: {
              Authorization: `Bearer ${token[0]}`,
            },
          }
        );
        if (data.success) {
          alert("Order Deleted Successfully");
          setShowAlert(false);
          const data = await getSalesData();
          setSalesData(data);
        } else {
          alert("Error Occurred! Please Try Again Later");
          console.log(data);
        }
      } catch (err) {
        console.log("Something Went Wrong", err);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className="action-dropdown-btn relative"
        onClick={handleDropdown}
      >
        <HiDotsHorizontal size={18} />
        {showDropdown && (
          <div className={`action-dropdown-menu ${darkMode ? 'bg-slate-700 text-white':'bg-white text-black'} absolute top-full right-1/2 transform translate-x-1/2 w-auto shadow-sm bg-secondary-color px-2 py-1 rounded-md border border-border-color-inverted text-left z-10`}>
            <ul className="dropdown-menu-list">
              <li className="dropdown-menu-item">
                <div
                  className="dropdown-menu-link"
                  onClick={() => {!token[0] ? alert('Login to Perform This Action') :setShowEditBox(true)}}
                >
                  Edit
                </div>
              </li>
              <li className="dropdown-menu-item">
                <div
                  className="dropdown-menu-link"
                  onClick={() => {!token[0] ? alert('Login to Perform This Action') :setShowAlert(true)}}
                >
                  Delete
                </div>
              </li>
            </ul>
          </div>
        )}
      </button>
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`${darkMode ? 'bg-slate-700 text-white':'bg-white text-black'} p-8 rounded-lg shadow-lg`}>
            <p className="text-lg mb-2">
              Are you sure you want to delete this order?
            </p>
            <p className="text-md mb-4 text-red-500">
              This Action is Irreversible Once Completed.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={DeleteOrder}
              >
                Confirm
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                onClick={() => setShowAlert(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
     {showEditBox && (
  <div className="fixed inset-0 flex flex-col items-center justify-center z-30 bg-gray-400 bg-opacity-50">
    <form className={`${darkMode ? 'bg-slate-700 text-white':'bg-white text-black'} lg:min-w-[40vw] md:min-w-[50vw] min-w-full flex flex-col p-8 rounded-lg shadow-lg`}>
      <label className="text-2xl p-2" htmlFor="OrderStatus">Edit Order Details</label>
      <select
      className="p-2 text-black mb-5 border-2 border-black outline-none"
        id="OrderStatus"
        value={EditOrderDetails.STATUS}
        onChange={(e) =>
          setEditOrderDetails({ ...EditOrderDetails, STATUS: e.target.value })
        }
      >
        <option value="Pending">Pending</option>
        <option value="Shipped">Shipped</option>
        <option value="Delivered">Delivered</option>
      </select>
      <div className="flex mb-5 items-center justify-between">
        <label htmlFor="Quantity">Quantity</label>
        <br />
        <div className="flex items-center">
          <button
            type="button"
            className="px-2 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 mr-2"
            onClick={() =>
              setEditOrderDetails({
                ...EditOrderDetails,
                QUANTITYORDERED: EditOrderDetails.QUANTITYORDERED + 1,
              })
            }
          >
            <MdOutlineAdd />
          </button>
          <span>{EditOrderDetails.QUANTITYORDERED}</span>
          <button
            type="button"
            className="px-2 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 ml-2"
            onClick={() =>
              setEditOrderDetails({
                ...EditOrderDetails,
                QUANTITYORDERED: EditOrderDetails.QUANTITYORDERED - 1,
              })
            }
          >
            <FaMinus />
          </button>
        </div>
      </div>
      <input
      className="p-2 text-black w-full mb-5 border-2  outline-none"
        type="text"
        placeholder="CUSTOMERNAME"
        value={EditOrderDetails.CUSTOMERNAME}
        onChange={(e) =>
          setEditOrderDetails({
            ...EditOrderDetails,
            CUSTOMERNAME: e.target.value,
          })
        }
      />
      <input
      className="p-2 text-black w-full mb-5 border-2  outline-none"
        type="number"
        placeholder="PHONE"
        value={EditOrderDetails.PHONE}
        onChange={(e) =>
          setEditOrderDetails({
            ...EditOrderDetails,
            PHONE: e.target.value,
          })
        }
      />
      <input
      className="p-2 text-black w-full mb-5 border-2  outline-none"
        type="text"
        placeholder="ADDRESSLINE1"
        value={EditOrderDetails.ADDRESSLINE1}
        onChange={(e) =>
          setEditOrderDetails({
            ...EditOrderDetails,
            ADDRESSLINE1: e.target.value,
          })
        }
      />
      <input
      className="p-2 text-black w-full mb-5 border-2  outline-none"
        type="text"
        placeholder="CITY"
        value={EditOrderDetails.CITY}
        onChange={(e) =>
          setEditOrderDetails({ ...EditOrderDetails, CITY: e.target.value })
        }
      />
      <input
      className="p-2 text-black w-full mb-5 border-2  outline-none"
        type="text"
        placeholder="STATE"
        value={EditOrderDetails.STATE}
        onChange={(e) =>
          setEditOrderDetails({ ...EditOrderDetails, STATE: e.target.value })
        }
      />
      <input
      className="p-2 text-black w-full mb-5 border-2  outline-none"
        type="number"
        placeholder="POSTALCODE"
        value={EditOrderDetails.POSTALCODE}
        onChange={(e) =>
          setEditOrderDetails({
            ...EditOrderDetails,
            POSTALCODE: e.target.value,
          })
        }
      />
      <input
      className="p-2 text-black w-full mb-5 border-2  outline-none"
        type="text"
        placeholder="COUNTRY"
        value={EditOrderDetails.COUNTRY}
        onChange={(e) =>
          setEditOrderDetails({ ...EditOrderDetails, COUNTRY: e.target.value })
        }
      />
      <input
      className="p-2 text-black w-full mb-5 border-2  outline-none"
        type="text"
        placeholder="TERRITORY"
        value={EditOrderDetails.TERRITORY}
        onChange={(e) =>
          setEditOrderDetails({
            ...EditOrderDetails,
            TERRITORY: e.target.value,
          })
        }
      />
      <div className="flex justify-end mt-4">
        <button
          type="button"
          className="px-4 py-2 bg-blue-500 text-white rounded-md mr-4 hover:bg-blue-600"
          onClick={EditOrder}
        >
          Save
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          onClick={() => setShowEditBox(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
)}
    </>
  );
};

export default AreaTableAction;
