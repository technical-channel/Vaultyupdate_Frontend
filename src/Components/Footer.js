import React from "react";
import "./footer.css";
import logo from "../assets/logo1.svg";
import antifraud from "../assets/Conditions documents/anti_fraud_policy.pdf";
import termsofexchange from "../assets/Conditions documents/vaultytermofexchange.pdf";
import termsofuse from "../assets/Conditions documents/vaultytermofuse.pdf";
import privacypolicy from "../assets/Conditions documents/vaultypolicy.pdf";
import cookiepolicy from "../assets/Conditions documents/cookie_policy.pdf";
import termofservice from "../assets/Conditions documents/termofservice.pdf";
import termofcreddits from "../assets/Conditions documents/terms_of_credits.pdf";
import pdf from "../assets/VaultyWp.pdf";
export default function Footer() {
  return (
    <div>
      <footer className="w-full text-center bg-[#0d0d2b] text-white">
        <div className="flex flex-wrap  justify-evenly p-20 items-start">
          <div className="flex flex-col items-center">
            <img
              src={logo}
              alt="Vaulty Logo"
              className="main-footer__logo"
              style={{ width: "70px" }}
            />
            <p className="text-4xl font-bold pt-1">Vaulty</p>
            <p className="text-2xl opacity-0 ">
              ©2022 Vaulty. All rights reserved
            </p>
          </div>
          <div className="flex justify-around middlecontent">
            <div>
              <ul style={{ textAlign: "justify" }}>
                <li className="text-2xl p-2 font-bold text-white">
                  Application
                </li>
                <li className="p-2 text-xl flex">
                  <div className="flex items-center">
                    <img
                       src={process.env.PUBLIC_URL+"/img/apple-new.png"}
                      width="30"
                    />
                    <p className="mx-2 mt-2">App Store</p>
                  </div>
                </li>
                <li className="p-2 text-xl">
                  <div className="flex items-center">
                    <a
                      className="flex"
                      href="https://play.google.com/store/apps/details?id=com.vaultycrypto.wallet"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <img
                        src={process.env.PUBLIC_URL+"/img/google-new.png"}
                        width="30"
                      />

                      <p className="mx-2 mt-2">Play Store</p>
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="">
              {" "}
              <ul style={{ textAlign: "justify" }}>
                <li className="text-2xl py-2 font-bold text-white">
                  Conditions
                </li>

                <li className="text-xl mt-2">
                  {" "}
                  <a
                    href={termofservice}
                    target="_blank"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Terms Of Service
                  </a>
                </li>
                <li className="text-xl mt-2">
                  <a
                    href={antifraud}
                    target="_blank"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Anti Fraud Policy
                  </a>
                </li>
                <li className="text-xl mt-2">
                  <li className="text-xl">
                    <a
                      href={cookiepolicy}
                      target="_blank"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Cookie Policy
                    </a>
                  </li>
                </li>
                <li className="text-xl mt-2">
                  <a
                    href={termofcreddits}
                    target="_blank"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Terms Of Credits
                  </a>{" "}
                </li>
                <li className="text-xl mt-2">
                  <a
                    href={privacypolicy}
                    target="_blank"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Privacy Policy
                  </a>{" "}
                </li>
                <li className="text-xl mt-2">
                  <a
                    href={termsofuse}
                    target="_blank"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Terms Of Use
                  </a>
                </li>
                <li className="text-xl mt-2">
                  <a
                    href={termsofexchange}
                    target="_blank"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Terms Of Exchange
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            {" "}
            <ul style={{ textAlign: "justify" }}>
              <li className="text-2xl p-2 font-bold text-white">Follow Us</li>
              <li className="p-2 ">
                <div className="flex gap-2">
                  {" "}
                  <a
                    href="https://www.instagram.com/vaultypro/"
                    target="_blank"
                    class="nav-item"
                  >
                    <div class="nav-links">
                      <i class="fab fa-instagram"></i>
                    </div>
                  </a>
                  <a
                    href="https://twitter.com/VaultyPRO"
                    target="_blank"
                    class="nav-item mx-2"
                  >
                    <div class="nav-links transition-all ">
                      <i class="fab fa-twitter"></i>
                    </div>
                  </a>
                  <a
                    href="https://www.facebook.com/VaultyPRO"
                    target="_blank"
                    class="nav-item mx-2"
                  >
                    <div class="nav-links transition-all">
                      <i class="fab fa-facebook"></i>
                    </div>
                  </a>
                  <a
                    href="https://discord.gg/fw9waB8y"
                    target="_blank"
                    class="nav-item mx-2"
                  >
                    <div class="nav-links transition-all">
                      <i class="fab fa-discord"></i>
                    </div>
                  </a>
                  <a
                    href="https://t.me/vaultypro"
                    target="_blank"
                    class="nav-item"
                  >
                    <div class="nav-links transition-all">
                      <i class="fab fa-telegram"></i>
                    </div>
                  </a>
                  <a
                    href="https://www.linkedin.com/vaultypro"
                    target="_blank"
                    class="nav-item"
                  >
                    <div class="nav-links transition-all">
                      <i class="fab fa-linkedin"></i>
                    </div>
                  </a>
                  {/* <a
                    href="https://t.me/vaultypro"
                    target="_blank"
                    class="nav-item"
                  >
                    <div class="nav-links transition-all ml-2">
                      <i class="fab fa-linkedin"></i>
                    </div>
                  </a> */}
                </div>
              </li>
              <li className="p-2 flex justify-center">
                <a
                  href={pdf}
                  target="_blank"
                  className="main-footer-navbar__nav__link"
                >
                  {" "}
                  <button
                    class="px-4 py-2 mx-2 mt-2 bg-transparent hover:bg-gradient-to-r from-[#a42e9a] to-[#5951f6] text-white text-2xl font-medium rounded-full"
                    style={{ border: "1px solid purple" }}
                  >
                    Download Whitepaper
                  </button>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="flex items-center justify-center "
          style={{ marginTOp: "-20px" }}
        >
          <p className="text-2xl bootomtext">©2022 Vaulty. All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}
