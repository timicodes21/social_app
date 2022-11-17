import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import Link from "next/link";
import Discover from "./discover";
import SuggetedAccounts from "./suggetedAccounts";
import Footer from "./footer";

const Sidebar = () => {
  const [sidebar, showSidebar] = useState(true);
  const userProfile = false;
  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded";
  return (
    <>
      <div>
        <div
          className="block xl:hidden m-2 ml-4 mt-3 text-xl"
          onClick={() => showSidebar((prev) => !prev)}
        >
          {sidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
        </div>
        {sidebar && (
          <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3">
            <div className="xl:border-b-2 border-gray-100 xl:pb-4">
              <Link href="/">
                <div className={normalLink}>
                  <p className="text-2xl">
                    <AiFillHome />
                  </p>
                  <span className="text-xl hidden xl:block">For you</span>
                </div>
              </Link>
            </div>

            <Discover />
            <SuggetedAccounts />
            <Footer />
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
