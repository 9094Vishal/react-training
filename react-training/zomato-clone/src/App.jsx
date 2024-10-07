import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import NoPage from "./components/NoPage";
import { AuthContext } from "./context/loginContext";
import { useState } from "react";
import { getLoginUser } from "./helper/helper";
import PartnerWithUs from "./pages/PartnerWithUs";
import RestaurantResto from "./pages/RestaurantResto";
import AddNewRestaurant from "./pages/AddNewRestaurant";

function App() {
  const [isLogin, setIsLogin] = useState(getLoginUser());
  const setLoginData = (data) => {
    setIsLogin(data);
  };

  return (
    <AuthContext.Provider value={{ ...isLogin, setLoginData }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/partner-with-us" element={<PartnerWithUs />}></Route>
          <Route
            path="/partner-with-us/new"
            element={<RestaurantResto />}
          ></Route>
          <Route
            path="/partner-with-us/new/add/"
            element={<AddNewRestaurant />}
          />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
