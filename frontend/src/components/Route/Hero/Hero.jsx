import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat bg-cover bg-center ${styles.noramlFlex}`}
      style={{
        backgroundImage:
          "url(https://balancethroughsimplicity.com/wp-content/uploads/2022/12/How-to-stop-impulse-buying-and-purchase-more-intentionally.jpg)",
      }}
    >
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <div
        className={`${styles.section} relative w-[90%] 800px:w-[60%] text-center 800px:text-left`}
      >
        <h1 className="text-[35px] 800px:text-[60px] font-bold text-white leading-[1.2] capitalize">
          Discover Best Products <br /> from Top Vendors
        </h1>
        <p className="pt-5 text-[16px] 800px:text-[18px] font-[Poppins] text-white">
          Shop from multiple trusted sellers, enjoy fast delivery, and grab
          amazing deals every day. <br />
          Find everything you need from hundreds of <br />
          vendors — all in one place. Start shopping now
        </p>
        <Link to="/products" className="inline-block">
          <div className={`${styles.button} mt-5`}>
            <span className="text-[#fff] font-[Poppins] text-[18px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
