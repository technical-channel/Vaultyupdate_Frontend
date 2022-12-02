import React, { useEffect, useState } from "react";
import logo from "../assets/logo1.svg";
import logoimg from "../assets/logo1.svg";
import icon1 from "../assets/icon1.svg";
import icon2 from "../assets/icon2.svg";
import icon3 from "../assets/icon3.svg";
import "./staking.css";
import { FaInfo } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  ConnectMetamask,
  ConnectWeb3Wallet,
  DisconnectWallet,
  web3_,
} from "../Services";
import { staking, vaulty } from "../Constants/Contaracts";
import { StakingABI } from "../Config/ABI/StakingABI";
import { vaultyABI } from "../Config/ABI/vaultyABI";
import { useNavigate } from "react-router-dom";
// import logo from "./";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import CounterComponent from "../Components/Counter";
import Footer from "../Components/Footer";

function Staking(props) {
  const [connect, setConnect] = useState(false);
  const [isApprovedBuy, setIsApprovedBuy] = useState(true);
  const [Number, setNumber] = useState("");
  const [maturityDate, setMaturityDate] = useState("");
  const [Month, setMonth] = useState(0);
  const [Approval, setApproval] = useState(false);
  const [IsAlreadyStake, setIsAlreadyStake] = useState(false);
  const [UserData, setUserData] = useState(0);
  const [apy, setApy] = useState(0);
  const [UserBalance, setUserBalance] = useState(0);
  const [TotalStaked, setTotalStaked] = useState(0);

  const [selectedMonth, setSelectedMonth] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
  });
  const navigate = useNavigate();
  useEffect(async () => {
    if (props.metamaskAddress != "") {
      setConnect(true);

      let isAlreadyStake = await new web3_.eth.Contract(
        StakingABI,
        staking
      ).methods
        .isAlreadyStaked(props.metamaskAddress)
        .call();

      let userData = await new web3_.eth.Contract(StakingABI, staking).methods
        .stakersDataset(props.metamaskAddress)
        .call();

      setIsAlreadyStake(isAlreadyStake);
      setUserData(userData);
      console.log("user data : ", UserData);

      let vaultyBalance = await new web3_.eth.Contract(
        vaultyABI,
        vaulty
      ).methods
        .balanceOf(props.metamaskAddress)
        .call();
      let MaturityDate = await new web3_.eth.Contract(
        StakingABI,
        staking
      ).methods
        .maturityDate(props.metamaskAddress)
        .call();
      setMaturityDate(MaturityDate);
      setUserBalance(vaultyBalance);
      let totalStakeAmount = await new web3_.eth.Contract(
        StakingABI,
        staking
      ).methods
        .totalStaked()
        .call();
      setTotalStaked(totalStakeAmount);

      console.log(isAlreadyStake, "User is already staked or not");
    } else {
      setConnect(false);
    }
  }, [props.metamaskAddress, IsAlreadyStake]);

  async function doStaking(stakeAmount, stakeDuration) {
    return await new web3_.eth.Contract(StakingABI, staking).methods
      .poolStake(stakeAmount, stakeDuration)
      .send({ from: props.metamaskAddress });
  }

  async function tokenApprove(stakingContractAddr, amount) {
    return await new web3_.eth.Contract(vaultyABI, vaulty).methods
      .approve(stakingContractAddr, amount)
      .send({ from: props.metamaskAddress });
  }

  async function handleStake() {
    if (connect) {
      if (Approval) {
        const tkn = web3_.utils.toWei(Number.toString(), "Gwei");
        const output = await doStaking(tkn, Month)
          .then((res) => {
            Swal.fire("Success", "Staking Successfully", "success");
          })
          .catch((e) => {
            Swal.fire("error", "Please Try Again", "error");
            console.log(e);
          });
        setApproval(false);
      } else {
        Swal.fire("Warning", "Please Approve First", "warning");
      }
    } else {
      Swal.fire("Warning", "Please Connect to the Wallet First", "warning");
    }
  }

  async function handleUnStake() {
    if (connect) {
      return await new web3_.eth.Contract(StakingABI, staking).methods
        .unstake()
        .send({ from: props.metamaskAddress })
        .then((res) => {
          Swal.fire("Success", "Unstaking Successfully", "success");
        })
        .catch((e) => {
          Swal.fire("error", "Please Try Again", "error");
          console.log(e);
          setIsAlreadyStake(true);
        });
    } else {
      Swal.fire("Warning", "Please Connect to the Wallet First", "warning");
    }
  }

  async function handleApprove() {
    if (connect) {
      if (Number === "0") {
        Swal.fire("Warning", "Please Enter amount greater then 0", "warning");
      } else if (Month != 0) {
        if (Number != "") {
          let vaultyBalance = await new web3_.eth.Contract(
            vaultyABI,
            vaulty
          ).methods
            .balanceOf(props.metamaskAddress)
            .call();

          let isAlreadyStake = await new web3_.eth.Contract(
            StakingABI,
            staking
          ).methods
            .isAlreadyStaked(props.metamaskAddress)
            .call();
          const tkn = web3_.utils.toWei(Number.toString(), "Gwei");
          console.log(
            "Vaulty Balance : ",
            parseFloat(vaultyBalance) / Math.pow(10, 9)
          );

          if (parseFloat(vaultyBalance) >= tkn) {
            if (!isAlreadyStake) {
              console.log("Transaction Possible");
              await tokenApprove(staking, tkn)
                .then((res) => {
                  Swal.fire("Success", "Approve Succesfull", "success");
                  setApproval(true);
                })
                .catch((error) => {
                  Swal.fire("error", "Please Try Again", "error");
                });
            } else {
              Swal.fire("Warning", "User is already Staked", "warning");
            }
          } else {
            Swal.fire(
              "Warning",
              "User Does Not Have Sufficent Vaulty Tokens",
              "warning"
            );
          }
        } else {
          Swal.fire("Warning", "Please input number", "warning");
        }
      } else {
        Swal.fire("Warning", "Please select month", "warning");
      }
    } else {
      Swal.fire("Warning", "Please connect to the MetaMask", "warning");
    }
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

      setConnect(true);
      setIsApprovedBuy(true);
    }
  }

  // console.log(new web3_.eth.Contract(StakingABI, staking));
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
           <div className="toploginbox">
           <p className="text-4xl text-center p-3 font-bold participateclass text-[#fff]">How to Participate ?</p>
        <p className=" text-center  font-bold mb-4  text-[#fff]" style={{fontSize:'15px'}}>Stake and earn additional $VLT on top of purchased token and Vaulty App trading fees.</p>
           </div>
        <div class="login-box">
          <span className="text-center "></span>
          {/* <div>
            <p className="text-4xl text-center p-3 font-base">Staking Page</p>
          </div> */}
          <div className="flex flex-wrap justify-between gap-4">
            <div className="flex justify-center gap-2 md:justify-start  ">
              <img src={logo} style={{ width: 70 }} />
              <p className="mt-[2.5rem] text-3xl ml-2">$VLT</p>
            </div>
            <div className="flex flex-col">
              <p className="text-2xl text-gray opacity-50">
                Claimable(USDT) Value
              </p>
              <p className="text-2xl text-bold">$0</p>
            </div>
            <div className="flex flex-col">
              <p className="text-2xl opacity-50 mr-[60px] lg:mr-0">APY</p>
              <p className="text-2xl">{apy}%</p>
            </div>
            <div className="flex flex-col">
              <p className="text-2xl opacity-50">My $VLT Staked</p>
              <p className="text-2xl">
                {" "}
                {UserData && UserData.stackAmount / Math.pow(10, 9)} $VLT
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-2xl opacity-50">Total Balance</p>
              <p className="text-2xl">
                {" "}
                {UserBalance &&
                  parseFloat(UserBalance / Math.pow(10, 9)).toFixed(3)}{" "}
                $VLT
              </p>
            </div>
          </div>
          <hr className=" border-2 border-fuchsia-700 my-4 " />
          <div className="flex flex-col">
            <div className="flex p-2">
              <div className="allstackbtn  ">
                <button
                  onClick={() => {
                    setMonth(1);
                    setSelectedMonth({
                      one: true,
                      two: false,
                      three: false,
                      four: false,
                    });
                    setApy(1);
                  }}
                  disabled={selectedMonth.one}
                  class="btngroupbtn px-4 py-2 mx-2 mb-2  border border-sky-500 bg-transparent hover:bg-gradient-to-r from-[#a42e9a] to-[#5951f6] text-slate-400 text-xl font-medium rounded-full opcaity-50"
                >
                  1 Month
                </button>
                <button
                  onClick={() => {
                    setMonth(2);
                    setSelectedMonth({
                      one: false,
                      two: true,
                      three: false,
                      four: false,
                    });
                    setApy(2);
                  }}
                  disabled={selectedMonth.two}
                  class=" btngroupbtn px-4 py-2 mx-2 mb-2 border border-sky-500 bg-transparent hover:bg-gradient-to-r from-[#a42e9a] to-[#5951f6] text-slate-400 text-xl font-medium rounded-full opcaity-50"
                >
                  3 Months
                </button>
                <button
                  onClick={() => {
                    setMonth(3);
                    setSelectedMonth({
                      one: false,
                      two: false,
                      three: true,
                      four: false,
                    });
                    setApy(3);
                  }}
                  disabled={selectedMonth.three}
                  class=" btngroupbtn px-4 py-2 mx-2 mb-2 border border-sky-500 bg-transparent hover:bg-gradient-to-r from-[#a42e9a] to-[#5951f6] text-slate-400 opcaity-50 text-xl font-medium rounded-full"
                >
                  9 Months
                </button>
                <button
                  onClick={() => {
                    setMonth(4);
                    setSelectedMonth({
                      one: false,
                      two: false,
                      three: false,
                      four: true,
                    });
                    setApy(4);
                  }}
                  disabled={selectedMonth.four}
                  class=" btngroupbtn px-4 py-2 mx-2 mb-2 border border-sky-500 bg-transparent hover:bg-gradient-to-r from-[#a42e9a] to-[#5951f6] text-slate-400 text-xl font-medium rounded-full"
                >
                  12 Months
                </button>
              </div>
            </div>
            <div>
              <p className="text-xl py-3 text-slate-300">
                Stake $VLT on Vaulty.pro to earn a portion of the platform’s
                revenue, distributed as $VLT tokens.
              </p>
              <div className="p-1">
                <div className="flex items-start justify-center ">
                  <div className="flex flex-col md:flex-row rounded-3xl border-2 border-purple-500/75 p-2 items-start justify-center">
                    <span class="border border-white p-2 rounded-full ml-5 items-start ">
                      <FaInfo size={7} />
                    </span>
                    <p className="text-xl text-gray p-2 text-justify opacity-[0.6]">
                      Ut wisi enim ad minim veniam, quis nostrud exerci tation
                      ullamcorper suscipit lobortis nisl ut aliquip ex ea
                      commodo consequat. Lorem ipsum dolor sit amet,
                       consectetuer adipiscing elit, sed diam nonummy nibh
                      euismod tincidunt ut laoreet
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col p-3 justify-between text-left  md:flex-row ">
            <div className="flex-1">
              <div className=" ml-0 lg:ml-[40rem]  pb-3">Available:-</div>
              <div className="max-w-lg mt-[-10px] pb-4 md:pb-0 lg:max-w-3xl">
                <div className="border-bg flex flex-1 items-center rounded-2xl items-center mt-4 ">
                  <div className="  px-0.5 py-0.5 flex flex-1 relative">
                    <div className="bg-[#020123] px-0.5 py-0.5 relative flex flex-1 rounded-2xl items-center">
                      <div className=" bg-[#020123]flex flex-1 relative flex-1 items-center">
                        <div class="flex-1 items-center">
                          {" "}
                          <span className="absolute bg-[#030347] -top-[1.3rem] px-1 ml-10 text-[9px] md:text-xl">
                            Amount of $VLT to Stake
                          </span>
                          <input
                            className="outline-none py-[10px] px-[20px] text-white bg-[#020123] opacity-[57%] w-full text-2xl rounded-2xl"
                            type="number"
                            min={1}
                            step={0.01}
                            name
                            placeholder="0"
                            required
                            value={Number}
                            onChange={(e) => {
                              if (e.target.value < 0) {
                                setNumber("");
                                Swal.fire("Please Enter Valid Value");
                                return;
                              } else {
                                setNumber(e.target.value);
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="ml-5">
                        <span className="border-bg py-2 px-3 text-xl rounded-full mr-3 ">
                          Max
                        </span>
                      </div>
                      <div className="md:block mr-1">
                        <img src={logoimg} width="25" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {maturityDate == 0 ? null : (
              <>
                <h1>Maturity Time</h1>

                <CounterComponent endDate={maturityDate} />
                <p className="cardFont">
                  *Complete Maturity Time To Get Rewards.
                  <br />
                  *Pay Penelty If Unstaked Earlier.
                </p>
              </>
            )}
            <div className="mr-0 mt-0 lg:mr-[10rem] ">
              <div
                className="flex justify-between leading-3 "
                style={{ margin: "0 34px" }}
              >
                <div>
                  <p className="border-2 border-purple-500/75 p-1  rounded-full">
                    1
                  </p>
                </div>
                <div className="flex-grow border-t border-y-fuchsia-600 mt-2"></div>
                <div>
                  <p className="border-2 border-purple-500/75 p-1  rounded-full">
                    2
                  </p>
                </div>
              </div>
              <div className="flex gap-5 mt-2">
                <div className="flex-1 justify-center p-2 mx-auto">
                  <div className="border-bg flex-1 w-fit  mx-auto  rounded-2xl">
                    <div className="px-0.5 py-0.5 relative w-fit">
                      <div
                        onClick={handleApprove}
                        style={{
                          cursor: "pointer",
                          fontSize: "11px",
                          width: "111px",
                        }}
                        className=" outline-transparent py-[10px] px-[10px] text-white bg-[#020123] w-full text-center  rounded-2xl"
                      >
                        Approve
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 justify-center p-2 mx-auto">
                  <div className="border-bg flex-1 w-fit  mx-auto rounded-2xl">
                    <div className="px-0.5 py-0.5 relative w-fit">
                      <div
                        onClick={handleStake}
                        style={{
                          cursor: "pointer",
                          fontSize: "11px",
                          width: "111px",
                        }}
                        className=" outline-transparent py-[10px] px-[10px] text-white bg-[#020123] w-full text-center  rounded-2xl "
                      >
                        Stake $VLT
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" stackmobile container text-4xl font-normal mb-[3rem]" style={{marginTop:'5px'}}>
          <p className="text-[#fff]">Why stake your $VLT ?</p>
        </div>
        <div className="flex flex-wrap md:flex-unwrap justify-center gap-4 mb-[4rem]">
          <div className="w-[300px] p-5 bg-[#06013b] rounded-xl mx-2 0">
            <div>
              <img className="ml-[8rem]" src={icon1} style={{ maxWidth: "100px" }} />
              <p className="text-3xl text-white text-center">Earn Rewards</p>
            </div>

            <hr />
            <p className="text-2xl text-white text-center">
              Rewards are given for actions that help the network reach
              consensus. You'll get rewards for running software that properly
              batches transactions into new blocks and checks the work of other
              validators because that's what keeps the chain running securely.
            </p>
          </div>
          <div className="w-[300px] p-5 bg-[#06013b] rounded-xl mx-2 ">
            <div>
              <img className="ml-[8rem]" src={icon2} style={{ maxWidth: "100px" }} />
              <p className="text-3xl text-white text-center">Better Security</p>
            </div>
            <hr />
            <p className="text-2xl text-white text-center">
              The network gets stronger against attacks as more $VLT is staked,
              as it then requires more $VLT to control a majority of the network.
              To become a threat, you would need to hold the majority of
              validators, which means you'd need to control the majority of $VLT
              in the system-that's alot.
            </p>
          </div>
          <div className="w-[300px] p-5 bg-[#06013b] rounded-xl mx-2 ">
            <div className="items-center">
              <img className="ml-[8rem]" src={icon3} style={{ maxWidth: "100px" }} />
              <p className="text-3xl text-white text-center">More Sustainable</p>
            </div>
            <hr />
            <p className="text-2xl text-white text-center">
              Stakers don't need energy-intensive computers to participate in a
              proof-of-stake system-just a home computer or smartphone. This
              will make Vaulty better for the environments.
            </p>
          </div>
        </div>
    
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    metamaskAddress: state.ConnectivityReducer.metamaskAddress,
    metamaskConnect: state.ConnectivityReducer.metamaskConnect,
  };
};
export default connect(mapStateToProps, null)(Staking);
