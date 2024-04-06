import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BaseLayout from "./layout/BaseLayout";
import { Dashboard, PageNotFound } from "./screens";
import Orders from "./components/orders/orders";
import Analytics from "./components/Analytics/Analytics";
import { SignIn, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AuthUserApi } from "./assets/Api/Api";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { isSignedIn, user, isLoaded } = useUser();

  const User = async () => {
    try {
      const {
        fullName: userName,
        emailAddresses,
        imageUrl: imgUrl,
        id: userId,
      } = user;
      const email = emailAddresses[0].emailAddress;

      const { data } = await axios.post(AuthUserApi, {
        userName,
        email,
        userId,
        imgUrl,
      });
      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        window.location.reload()
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log("Something went wrong !!! ", err);
    }
  };

  useEffect(()=>{
    if (!isLoaded) {
      null;
    }
  
    if (isSignedIn) {
      if (!token) {
        User();
      }
    }
  },[isSignedIn,user,isLoaded,token])

  return (
    <>
      <Router>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
