import React from "react";
import bgImg from "../assets/earth.svg";
import hero from "../assets/new.svg";
import copys from "../assets/copyimg.svg";
import Circle from "../assets/circlechart.svg";
import Graph from "../assets/graph.svg";
import logo from "../assets/logo1.svg";
import { Link } from "react-router-dom";
import Bottom from "../assets/bottom.svg";
import bgimgmobile from "../assets/updateimg.svg"; 
import { useNavigate } from "react-router-dom";
import { ConnectMetamask, DisconnectWallet, web3_ } from "../Services/index";
import { ConnectWeb3Wallet } from "../Services";
import Footer from "../Components/Footer";
import copy from 'copy-to-clipboard';
import Swal from "sweetalert2";
import { connect } from "react-redux";



const Token = (props) => {
  const [isApprovedBuy, setIsApprovedBuy] = React.useState(true);
  
const [connect, setConnect] = React.useState(false);
const navigate = useNavigate();

const [copyText, setCopyText] = React.useState('');
  
const handleCopyText = (e) => {
   setCopyText(e.target.value);
} 

const copyToClipboard = () => {
   copy("0xc6255aDf5aBB75DF880f2ae33b524c514b350c47");
  Swal.fire("Success","Address Copied");
}
  
  async function handleClick() {
    if (window.ethereum) {
      await ConnectMetamask();
      console.log("yess");

      setConnect(true);
      setIsApprovedBuy(true);
    } else {
      DisconnectWallet();
      await ConnectWeb3Wallet();

      setIsApprovedBuy(true);
    }
  }
  return (
    <div>
      <div className="main-container" style={{ padding: "20px" }}>
           <header className="main-header" style={{marginTop:'25px'}}>
          <div
            className="main-header-content-container"
            style={{ justifyContent: "unset" }}
          >
            <div className="header-container">
          {/* Header navbar */}
          {/* <div>
          <  GiHamburgerMenu value={{color:'white',size:'25'}} />
          </div> */}
          <nav className="main-header-navbar">
            <div className="flex gap-3">
            <a href="/">
            <img
              src={logo}
              alt="KeeSwap logo"
              className="main-header-navbar__logo"
              style={{ width:70 }}
            />
            </a>
            <a href="/" style={{textDecoration:'none'}}>
            <h4 className="mt-[2.5rem] gap-5 text-3xl mt-[2.5rem] text-[#fff] ">VAULTY</h4>
            </a>
            
            </div>
            <ul className="main-header-navbar__nav">
              <li className="main-header-navbar__nav__item">
                <a
                  href="/token"
                  className="main-header-navbar__nav__link"
                  // onClick={() => {
                  //   navigate("/coininfo");
                  // }}
                >
                  Token Info
                </a>
              </li>
              <li className="main-header-navbar__nav__item">
                <a href="/" className="main-header-navbar__nav__link">
                  Buy
                </a>
              </li>
              <li className="main-header-navbar__nav__item">
                <a href="/" className="main-header-navbar__nav__link">
                  Values
                </a>
              </li>
              <li className="main-header-navbar__nav__item">
                <a href="/" className="main-header-navbar__nav__link">
                  Price
                </a>
              </li>
              <li className="main-header-navbar__nav__item">
                <a href="/" className="main-header-navbar__nav__link">
                  Roadmap
                </a>
              </li>
              <li className="main-header-navbar__nav__item">
                <a
                  className="main-header-navbar__nav__link"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/staking");
                  }}
                >
                  Staking
                </a>
              </li>
              {connect ? (
                <>
                  <li className="main-header-navbar__nav__item">
                    <a href="#" className="main-header-navbar__nav__link">
                      {props.metamaskAddress &&
                        `${props.metamaskAddress.slice(
                          0,
                          3
                        )}..${props.metamaskAddress.slice(40, 42)}`}
                    </a>
                  </li>
                </>
              ) : null}

              <li className="main-header-navbar__nav__item connectitem">
                {connect ? (
                  <>
                    <a
                      className="main-header-navbar__nav__link disconnectButton"
                      onClick={() => {
                        setConnect(false);
                        DisconnectWallet();
                      }}
                    >
                      <span className="connectitem"
                        style={{
                          borderRadius: "20px",
                          border: "1px solid green",
                          padding: 5,
                          color: "green",
                          cursor: "pointer",
                        }}
                      >
                        Disconnect
                      </span>
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      className="main-header-navbar__nav__link disconnectButton"
                      style={{
                        borderRadius: "20px",
                        border: "1px solid green",
                        padding: 5,
                        color: "green",
                        cursor: "pointer",
                      }}
                      onClick={handleClick}
                    >
                      Connect Wallet
                    </a>
                  </>
                )}
              </li>
            </ul>
              
          </nav>
          {/* Header content */}
        
        </div>
          </div>
        </header>
      <div className=" max-w-[1300px] mx-auto px-[30px] md:px-[80px] md: py-[30px] tokenpage">
     
        <div className="flex flex-col mt-[-70px] md:flex-row gap-3 ">
          <div className="flex-1 mt-0 md:">
            <div className="headercolor">
              <h1 style={{fontSize:'28px'}} > VLT - Vaulty</h1>
              <h1 style={{fontSize:'28px'}}>IS A BEP -20 TOKEN</h1>
            </div>
            <div className="">
              <p
                className="text-white font-sm text-xl pt-3 opacity-70"
                style={{fontSize:'17px',lineHeight:'30px'}}
              >
               Use Vaulty tokens confidently while exploring the
               Vaulty ecosystem, and can used to purchase Vaulty membership.
                The VLT tokens is the native utility 
               token for the Vaulty plateform. It is deployed on 
               the Ethereum network and compliant with the  BEP-20 token 
               standard. The VLT token goal is to  drive adoption and incentive good behavior on 
               the plateform,  while also being a valid service 
               payment and fee settlement method.
              </p>
            </div>
            <div>
              <div className="buybtnouter mt-3"
                    
                    >
                      <button className="buybtninner text-2xl w-[108px] bg-[#120c41] flex flex-col items-center border-rounded h-[20px] text-[#fff] p-4"
                        
                      >
                        Buy Now
                      </button>
                    </div>
                    <div>
                    </div>
            </div>
          </div>
          <div className="flex-1">
            <img src={bgImg} alt className="" />
          </div>
        </div>
        {/* Second first section */}
        <div className="bg-black-800">
          <img src={hero} className="desktopimg"></img>
          <img src={bgimgmobile} className="mobileimg"></img>
        </div>
        {/* Close second section */}
        {/* third section */}
        <div className="mt-5 ">
          <h1 className="font-base" style={{fontSize:'24px'}}>Smart Contract Address:</h1>
        </div>
        <div className=" mt-5">
          <div className="smartaddress flex flex-col md:flex-row justify-between p-[20px] ">
            <p className=" address text-[#fff] text-2xl pt-4 font-bold cursor-pointer"  
            >
            0xc6255aDf5aBB75DF880f2ae33b524c514b350c47
            </p>
            <img className="h-[35px] cursor-pointer " src={copys}   onClick={copyToClipboard}/>
          </div>
        </div>
        {/* close third section */}
        {/* Fourth section */}
        <div className="mt-[50px]">
          <p className="font-base text-[#fff] text-2xl " style={{fontSize:'24px'}}>Token Allocation</p>
          <img src={Circle} />
        </div>
        <div className=" text-3xl">
          <p className="text-[#fff] text-center opacity-50">Total tokens allocation.Assumes reached Hardcap.</p>
        </div>
        {/* close fourth section */}
        {/* fifth section */}
        <div className="mt-[50px]">
          <div>
            <img src={Graph} />
          </div>
        </div>
        {/* close fifth sction */}
        {/* sixth section */}
        <div className="mb-[40px]">
          <div className="mt-[50px] pb-[20px] ">
            <h1 className="font-base" style={{fontSize:'24px'}}>Why holding VLT?</h1>
          </div>
          <div className="flex flex-col md:flex-row gap-5">
          <div className="flex-1">
            <div className="rounded-3xl border-2 border-purple-500/75 text-center" style={{padding:'20px'}}>
            <h1 className="white" style={{fontSize:'23px'}}>Never decreases in demand.</h1>
            <span className="text-slate-400 " style={{fontSize:'17px',}}>
              The vaulty coin is a crucial participant in our ecosystem. Since
              token drives every crypto and fiat transaction, vaulty needs to
              rescue its original tokens from the exchanges marker and destroy
              them every month to boost demand.
            </span>
            </div>
            <div className="rounded-3xl border-2 border-purple-500/75 text-center mt-5" style={{padding:'20px'}}>
            <h1 className="white" style={{fontSize:'23px'}}>Supply is limited</h1>
            <span className="text-slate-400 " style={{fontSize:'17px'}}>
             You cannot produce or seize our coins. Therefore, the overall 
             quantity of vaulty tokens is continuously decreasing and has a
             beneficial effect on basic tokenomics.
            </span>
            </div>
          </div>
        
          <div className="bootomborder flex-1 rounded-3xl border-2 border-purple-500/75 text-center" style={{padding:'20px'}}>
            <h1 className="white" style={{fontSize:'23px'}}>Deposit VLT & earn up to 21% annually</h1>
            <div className="text-slate-400  text-center
            " style={{fontSize:'17px'}}>
            Keep your VLT tokens on your saving account and earn VLT.
            A low-risk strategy that helps to boost your interest earning.
            </div>
           <div className="h-[150px] mt-5">
            <img className="flex m-auto h-full md:h-[22rem] " src={Bottom} ></img>
            </div>
          </div>
        </div>
        </div>
        {/* close sixth section */}
      </div>
      </div>
      <Footer />
    </div>
    
  );
};
const mapStateToProps = (state) => {
  return {
    metamaskAddress: state.ConnectivityReducer.metamaskAddress,
    metamaskConnect: state.ConnectivityReducer.metamaskConnect,
  };
};
export default connect(mapStateToProps, null)(Token);
