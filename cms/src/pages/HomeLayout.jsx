import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Header from "../components/Header";

const HomeLayout = () => {
  const { user } = useSelector((state) => state.userState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <Navbar />
      <Header />
      <Outlet />
    </>
  );
};

export default HomeLayout;
