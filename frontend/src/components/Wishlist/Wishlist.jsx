import React from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { backend_url } from "../../server";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data) => {
    const newData = { ...data, qty: 1 };
    dispatch(addTocart(newData));
    setOpenWishlist(false);
  };

  return (
    // overlay: clicking outside closes
    <div
      className="fixed inset-0 bg-black/40 z-[999] flex justify-end"
      onClick={() => setOpenWishlist(false)}
      role="presentation"
    >
      <div
        // stop overlay click from closing when clicking inside drawer
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Wishlist"
        className="h-full w-[80%] md:w-[25%] bg-white flex flex-col overflow-y-auto shadow-sm z-[1000]"
      >
        <div className="flex justify-end p-4">
          <button
            aria-label="Close wishlist"
            className="cursor-pointer"
            onClick={() => setOpenWishlist(false)}
          >
            <RxCross1 size={22} />
          </button>
        </div>

        {(!wishlist || wishlist.length === 0) ? (
          <div className="flex flex-1 items-center justify-center px-4">
            <h5>Wishlist is empty!</h5>
          </div>
        ) : (
          <>
            <div className={`${styles.noramlFlex ?? "flex items-center"} p-4`}>
              <AiOutlineHeart size={25} />
              <h5 className="pl-2 text-[20px] font-[500]">
                {wishlist.length} item{wishlist.length > 1 ? "s" : ""}
              </h5>
            </div>

            <div className="w-full border-t">
              {wishlist.map((i) => (
                <CartSingle
                  key={i._id || i.id}
                  data={i}
                  removeFromWishlistHandler={removeFromWishlistHandler}
                  addToCartHandler={addToCartHandler}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  const qty = data?.qty ?? 1;
  const price = data?.discountPrice ?? data?.price ?? 0;
  const totalPrice = price * qty;

  const imgSrc = data?.images?.[0] ? `${backend_url}${data.images[0]}` : "/placeholder.png";

  return (
    <div className="border-b p-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => removeFromWishlistHandler(data)}
          aria-label={`Remove ${data.name} from wishlist`}
          className="text-gray-600"
        >
          <RxCross1 />
        </button>

        <img
          src={imgSrc}
          alt={data?.name || "product image"}
          className="w-[130px] rounded-[5px] object-cover"
        />

        <div className="flex-1">
          <h1 className="font-medium">{data?.name}</h1>
          <h4 className="font-[600] pt-3 text-[17px] text-[#d02222]">
            US${totalPrice.toFixed(2)}
          </h4>
        </div>

        <div>
          <button
            title="Add to cart"
            aria-label={`Add ${data?.name} to cart`}
            onClick={() => addToCartHandler(data)}
            className="p-2"
          >
            <BsCartPlus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
