import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { AiOutlineArrowRight } from "react-icons/ai";

const AllOrders = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  // Fetch orders when seller ID changes
  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllOrdersOfShop(seller._id));
    }
  }, [dispatch, seller?._id]);

  // Define columns
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) =>
        params.value?.toLowerCase() === "delivered" ? "greenColor" : "redColor",
    },

    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/order/${params.id}`}>
          <Button>
            <AiOutlineArrowRight size={20} />
          </Button>
        </Link>
      ),
    },
  ];

  // Map orders to rows
  const rows =
    orders?.map((item) => ({
      id: item._id,
      itemsQty: item.cart.length,
      total: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(item.totalPrice),
      status: item.status,
    })) || [];

  return (
    <div className="w-full mx-8 pt-1 mt-10 bg-white">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
        loading={isLoading}
      />
    </div>
  );
};

export default AllOrders;
