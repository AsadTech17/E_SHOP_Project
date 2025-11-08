import React from "react";
import ShopCreate from "../components/Shop/ShopCreate.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ShopCreatePage = () => {
  const navigate = useNavigate();
  const { isSeller, seller, isLoading } = useSelector((state) => state.seller);

  console.log("isSeller:", isSeller);
  console.log("seller:", seller);

  useEffect(() => {
    if (isSeller === true && seller && seller._id) {
      navigate(`/shop/${seller._id}`);
    }
  }, [isSeller, seller, navigate]);

  return (
    <div>
      <ShopCreate />
    </div>
  );
};

export default ShopCreatePage;
