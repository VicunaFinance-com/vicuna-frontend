"use client";

import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";
import {
  useChainId,
  useAccount,
  useWriteContract,
  useChains,
  usePublicClient,
  useSwitchChain,
} from "wagmi";
import { createConfig } from "@wagmi/core";
import {
  parseUnits,
  formatUnits,
  createPublicClient,
  createWalletClient,
  custom,
  http,
  Chain,
  Address,
} from "viem";
import { readContract } from "viem/actions";
import { base, arbitrum, fantom } from "viem/chains";
import { useToast } from "../ui/use-toast";
import { useContractAddress } from "@/hooks/useContractAddress";
import { useApproved } from "@/hooks/useApproved";
import { useBalance } from "@/hooks/useBalance";
import { useHardCap } from "@/hooks/useHardCap";
import {
  PresaleContractABIArbitrum,
  PresaleContractABIBase,
  PresaleContractAPIFantom,
} from "@/lib/constants";
import { USDC_ABI, RPC_URLS } from "@/lib/constants";
import { PresaleBonus } from "@/lib/constants";
import { usePresaleBonus } from "@/hooks/usePresaleBonus";
import { useAllowance } from "@/hooks";

interface Props {
  setBalance: Function;
  setSelectedCoin: Function;
  setHardCap: Function;
  setTotalDeposited: Function;
  referCode: string | null;
}

export const PresaleModal = (props: Props) => {
  const chainId = useChainId();
  const { chains, switchChain, error, isPending } = useSwitchChain();
  const [connectedChain, setConnectedChain] = useState<Chain>();
  const [availableChains, setAvailableChains] = useState<Chain[]>([]);
  const [presaleContractABI, setPresaleContractABI] = useState<Object[]>(
    PresaleContractABIArbitrum
  );
  const [walletClient, setWalletClient] = useState<any>();
  const { isConnected, address } = useAccount();

  const contractAddress = useContractAddress();

  // ORIGINAL
  // Create public client based on connectedChain
  // const client = createPublicClient({
  //   chain: connectedChain || arbitrum, // Default to Arbitrum if not set
  //   transport: custom(window.ethereum!),
  // });

  // Fix by setting the client only when window is defined (client-side)
  const [client, setClient] = useState<any>(null); // Initialize as null or an appropriate type
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const clientInstance = createPublicClient({
        chain: connectedChain || arbitrum, // Default to Arbitrum if not set
        transport: custom(window.ethereum),
      });
      setClient(clientInstance); // Update the state with the client instance
    } else {
      console.error(
        "Ethereum provider not found. Please install MetaMask or another wallet."
      );
      // Optionally, use a fallback transport
      const fallbackClient = createPublicClient({
        chain: connectedChain || arbitrum,
        transport: http(),
      });
      setClient(fallbackClient);
    }
  }, [connectedChain]);

  useEffect(() => {
    if (chainId) {
      const currentChain = chains.find((c) => c.id === chainId);
      console.log("currentChain: ", currentChain?.name);

      if (!currentChain) {
        console.warn("No chain found for the given chainId");
        return;
      }

      let address: string = "";
      if (currentChain.name === "Base") {
        setPresaleContractABI(PresaleContractABIBase);
      } else if (currentChain.name === "Arbitrum") {
        setPresaleContractABI(PresaleContractABIArbitrum);
      } else if (currentChain.name === "Fantom") {
        setPresaleContractABI(PresaleContractAPIFantom);
      }

      setConnectedChain(currentChain);
      setAvailableChains([...chains].filter((c) => c.id !== chainId));
      console.log("chainId: ", chainId);

      // Check for `window.ethereum`
      if (typeof window.ethereum === "undefined") {
        console.warn("No wallet extension detected");
        return;
      }

      try {
        const clientTemp = createWalletClient({
          chain: currentChain,
          transport: custom(window.ethereum),
        });
        console.log("clientTemp: ", clientTemp);
        setWalletClient(clientTemp);
      } catch (error) {
        console.error("Failed to create wallet client:", error);
      }
    } else {
      setConnectedChain(arbitrum);
      setAvailableChains([...chains]);
    }
  }, [chainId, chains]);

  const { toast } = useToast();

  const [selectedItem, setSelectedItem] = useState<string>("USDC");
  const [selectedMode, setSelectedMode] = useState<1 | 2 | 3>(1);
  const [selectedLockTime, setSelectedLockTime] = useState<7 | 12 | 18 | 24>(7);

  const { balance, coinAddress } = useBalance(selectedItem);
  const { hardCap, totlDepositedAmount } = useHardCap(
    contractAddress,
    presaleContractABI
  );
  const bonusPercent = usePresaleBonus(selectedMode, selectedLockTime);

  const [availableCoins, setAvailableCoins] = useState<string[]>([
    "USDC",
    "USDT",
  ]);
  const [availableFantomCoins, setAvailableFantomCoins] = useState<string[]>([
    "axUSDC",
    "lzUSDC",
  ]);
  const [isOpen, setOpen] = useState(false);
  const [getReferalCode, setGetReferalCode] = useState<boolean>(false);
  const [referalCode, setReferalCode] = useState<string>("");
  const [isGettingReferalCode, setIsGettingReferalCode] =
    useState<boolean>(false);
  const [insertReferalCode, setInsertReferalCode] = useState<boolean>(false);
  const [friendReferalCode, setFriendReferalCode] = useState<string>("");
  const [friendReferalCodeConfirm, setFriendReferalCodeConfirm] =
    useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [isPurchasing, setIsPurchasing] = useState<boolean>(false);
  const [isApproving, setIsApproving] = useState<boolean>(false);
  const [inputAmount, setInputAmount] = useState<string>("0");

  useEffect(() => {
    if (props.referCode != null && props.referCode != "") {
      setInsertReferalCode(false);
      setIsConfirmed(true);
      setFriendReferalCode(props.referCode);
    }
  }, []);

  useEffect(() => {
    if (chainId == 250) {
      setSelectedItem(availableFantomCoins[0]);
    } else {
      setSelectedItem(availableCoins[0]);
    }
  }, [chainId]);

  useEffect(() => {
    console.log("Here!!!");
    if (typeof window !== "undefined" && window.ethereum) {
      console.log("connectedChain: ", connectedChain);
      if (connectedChain) {
        const clientTemp = createWalletClient({
          chain: connectedChain,
          transport: custom(window.ethereum!),
        });
        setWalletClient(clientTemp);
      } else {
        const clientTemp = createWalletClient({
          chain: arbitrum,
          transport: custom(window.ethereum!),
        });
        setWalletClient(clientTemp);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          // Handle wallet switch
          const newWalletAddress = accounts[0];
          setReferalCode(""); // Clear the current referral code
          setGetReferalCode(false); // Reset the state for displaying referral code
          checkReferralCode(newWalletAddress);
        }
      });
    }
  }, []);

  const checkReferralCode = (walletAddress: string) => {
    const savedReferCode = localStorage.getItem(
      `self_refer_code_${walletAddress}`
    );
    if (savedReferCode) {
      setReferalCode(savedReferCode); // Set referral code if it exists
      setGetReferalCode(true); // Indicate that the referral code exists
    } else {
      setReferalCode(""); // No referral code for this wallet
      setGetReferalCode(false); // Show the "Generate Referral Code" button
    }

    const savedFriendReferCode = localStorage.getItem(
      `friend_refer_code_${walletAddress}`
    );
    if (savedFriendReferCode) {
      setFriendReferalCode(savedFriendReferCode);
      setIsConfirmed(true);
    } else {
      setFriendReferalCode("");
      setIsConfirmed(false);
    }
  };

  // Initial check when component mounts or wallet changes
  useEffect(() => {
    if (isConnected && address) {
      checkReferralCode(address);
    }
  }, [isConnected, address]);

  useEffect(() => {
    props.setHardCap(hardCap);
    props.setTotalDeposited(totlDepositedAmount);
  }, [hardCap, totlDepositedAmount]);

  const { checkingApprove, isApproved, allowance } = useApproved(
    inputAmount,
    contractAddress,
    coinAddress,
    isPurchasing,
    isApproving
  );

  useEffect(() => {
    props.setBalance(balance);
  }, [balance]);

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (coin: string) => {
    if (selectedItem != coin) {
      setSelectedItem(coin);
      props.setSelectedCoin(coin);
      setOpen(false);
    }
  };

  const handleModeChange = (value: 1 | 2 | 3) => {
    setSelectedMode(value);
  };

  const handleLockTimeChange = (value: 7 | 12 | 18 | 24) => {
    setSelectedLockTime(value);
  };

  const handleGetReferalCode = async () => {
    setIsGettingReferalCode(true);
    if (!isConnected) {
      toast({
        title: "",
        description: "Wallet is not connected",
        variant: "default",
        style: {
          background: "rgb(255, 255, 255)",
          color: "rgb(0, 0, 0)",
        },
      });
      return;
    }

    const url = "/api/presale";

    const body = {
      action: "assignReferralCode",
      wallet_address: address,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          setIsGettingReferalCode(false);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Proceed to parse the JSON if status is 200
      })
      .then((data) => {
        if (data.selfReferralCode) {
          const referralKey = `self_refer_code_${address}`; // Use walletAddress-specific key
          setReferalCode(data.selfReferralCode); // Set the referral code for UI
          localStorage.setItem(referralKey, data.selfReferralCode); // Save to localStorage with wallet-specific key
          setGetReferalCode(true); // Update UI to show the referral code
        } else {
          console.error("Error: Referral code not received in response");
        }
        setIsGettingReferalCode(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsGettingReferalCode(false);
      });
  };

  const handleShare = async () => {
    try {
      const currentDomain = window.location.origin; // Gets the current domain
      const shareLink = `${currentDomain}/presale/?refer=${referalCode}`;
      await navigator.clipboard.writeText(shareLink);
      toast({
        title: "",
        description: "Link is copied to clipboard",
        variant: "default",
        style: {
          background: "rgb(255, 255, 255)",
          color: "rgb(0, 0, 0)",
        },
      });
    } catch (err) {
      toast({
        title: "",
        description: "Failed to copy text:",
        variant: "default",
        style: {
          background: "rgb(255, 255, 255)",
          color: "rgb(0, 0, 0)",
        },
      });
    }
  };

  const handleConfirmReferalCode = () => {
    if (!isConnected) {
      toast({
        title: "",
        description: "Wallet is not connected",
        variant: "default",
        style: {
          background: "rgb(255, 255, 255)",
          color: "rgb(0, 0, 0)",
        },
      });
      return;
    }
    setFriendReferalCodeConfirm(true);
    const action = "verifyFriendReferralCode";
    const walletAddress = address;

    const url = `/api/presale?action=${action}&wallet_address=${walletAddress}&friendReferralCode=${friendReferalCode}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          setFriendReferalCodeConfirm(false);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.isValid) {
          setIsConfirmed(true);
          const referralKey = `friend_refer_code_${walletAddress}`;
          localStorage.setItem(referralKey, friendReferalCode);
        } else {
          toast({
            title: "",
            description: data.resultMessge,
            variant: "default",
            style: {
              background: "rgb(255, 255, 255)",
              color: "rgb(0, 0, 0)",
            },
          });
        }
        setFriendReferalCodeConfirm(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setFriendReferalCodeConfirm(false);
      });
  };

  const handleMaxAmount = () => {
    setInputAmount(balance);
  };

  const handleApprove = async () => {
    setIsApproving(true);
    const amountInWei = parseUnits(inputAmount, 6);
    try {
      console.log("walletAddress: ", `0x${address?.replace("0x", "")}`);
      // Check and switch to the correct chain
      if (chainId !== connectedChain?.id) {
        console.log("Switching to the correct chain...");
        await walletClient.switchChain({ chainId: connectedChain?.id });
        // Update the wallet client after switching
        const updatedClient = createWalletClient({
          chain: connectedChain,
          transport: custom(window.ethereum!),
        });
        setWalletClient(updatedClient);
      }
      const resultApprove = await walletClient.writeContract({
        address: `0x${coinAddress}`,
        abi: USDC_ABI,
        functionName: "approve",
        args: [contractAddress, amountInWei],
        account: `0x${address?.replace("0x", "")}`,
        chain: connectedChain,
      });
      const receipt = await client.waitForTransactionReceipt({
        hash: `0x${resultApprove.replace("0x", "")}`,
        confirmations: 1,
      });
      if (receipt.status == "success") {
        handleDeposit();
      } else {
        toast({
          title: "",
          description: "Failed to approve",
          variant: "default",
          style: {
            background: "rgb(255, 255, 255)",
            color: "rgb(0, 0, 0)",
          },
        });
      }
      setIsApproving(false);
    } catch (error) {
      console.log("error: ", error);
      setIsApproving(false);
    }
  };

  const handleDeposit = async () => {
    setIsPurchasing(true);
    try {
      const amountInWei = parseUnits(inputAmount, 6);
      const resultDeposit = await walletClient.writeContract({
        address: `0x${contractAddress.replace("0x", "")}`,
        abi: presaleContractABI,
        functionName: "deposit",
        args: [
          `0x${coinAddress}`, // tokenAddress (address of the token)
          selectedMode, // _buyerOption (your buyer option, e.g., 1)
          selectedMode == 1 ? 7 : selectedLockTime, // _period (e.g., 30 days)
          amountInWei, // _amount (convert amount to the token's decimals)
          referalCode == "" ? "1234" : referalCode, // _selfReferralCode (your referral code)
          friendReferalCode == "" ? "1234" : friendReferalCode, // _friendReferralCode (friend's referral code)
        ],
        account: `0x${address?.replace("0x", "")}`,
      });

      const receipt = await client.waitForTransactionReceipt({
        hash: `0x${resultDeposit.replace("0x", "")}`,
        confirmations: 1,
      });
      if (receipt.status == "success") {
        toast({
          title: "",
          description: "Purchased successfully.",
          variant: "default",
          style: {
            background: "rgb(255, 255, 255)",
            color: "rgb(0, 0, 0)",
          },
        });
      } else {
        toast({
          title: "",
          description: "Failed to purchase",
          variant: "default",
          style: {
            background: "rgb(255, 255, 255)",
            color: "rgb(0, 0, 0)",
          },
        });
      }
      handleSaveDepositDetail(resultDeposit);
    } catch (error) {
      console.log("error: ", error);
      setIsPurchasing(false);
    }
  };

  const handleSaveDepositDetail = (resultDeposit: string) => {
    const url = "/api/presale";

    const body = {
      action: "deposit",
      txHash: resultDeposit,
      wallet_address: address,
      amount: Number(inputAmount),
      currency: selectedItem,
      chain: connectedChain?.name,
      option: selectedMode,
      ve_period: selectedLockTime,
      friendReferralCode: friendReferalCode,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsPurchasing(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsGettingReferalCode(false);
      });
  };

  const handlePurchase = async () => {
    if (!isConnected) {
      toast({
        title: "",
        description: "Wallet is not connected",
        variant: "default",
        style: {
          background: "rgb(255, 255, 255)",
          color: "rgb(0, 0, 0)",
        },
      });
      return;
    }
    if (Number(allowance) != 0 && allowance < parseUnits(inputAmount, 6)) {
      toast({
        title: "",
        description:
          "You are allowed to purchase $" +
          Number(formatUnits(allowance as bigint, 6)).toLocaleString(),
        variant: "default",
        style: {
          background: "rgb(255, 255, 255)",
          color: "rgb(0, 0, 0)",
        },
      });
      return;
    }

    console.log("presaleContractABI: ", presaleContractABI);

    const resPresaleStatus = await readContract(client, {
      address: `0x${contractAddress?.replace("0x", "")}`,
      abi: presaleContractABI,
      functionName: "preSaleStatus",
    });
    const presaleStatus = resPresaleStatus
      ? formatUnits(resPresaleStatus as bigint, 0)
      : "0";
    if (presaleStatus == "0") {
      const whiteList = await readContract(client, {
        address: `0x${contractAddress?.replace("0x", "")}`,
        abi: presaleContractABI,
        functionName: "WhiteList",
        args: [address],
      });
      if (whiteList) {
        if (!isApproved) {
          handleApprove();
          return;
        } else {
          handleDeposit();
        }
      } else {
        toast({
          title: "",
          description: "You are not whitelisted",
          variant: "default",
          style: {
            background: "rgb(255, 255, 255)",
            color: "rgb(0, 0, 0)",
          },
        });
        setIsPurchasing(false);
      }
    } else if (presaleStatus == "1") {
      if (!isApproved) {
        handleApprove();
        return;
      } else {
        handleDeposit();
      }
    } else if (presaleStatus == "2") {
      toast({
        title: "",
        description: "Presale has ended.",
        variant: "default",
        style: {
          background: "rgb(255, 255, 255)",
          color: "rgb(0, 0, 0)",
        },
      });
      setIsPurchasing(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative flex items-center w-full mb-6">
        <Button
          size={"sm"}
          className="absolute left-2 h-6 z-10 bg-purple-200 hover:bg-purple-300 text-primary"
          onClick={handleMaxAmount}
        >
          MAX
        </Button>
        <Input
          className="bg-primary placeholder:text-accent text-right text-accent rounded-full pl-16 pr-[7rem]"
          placeholder="$0.00"
          onChange={(e) => setInputAmount(e.target.value)}
          value={inputAmount}
        />
        <div className="absolute right-2 h-6 z-10 bg-purple-200 hover:bg-purple-300 text-primary rounded-full">
          <div
            className="flex flex-row items-center cursor-pointer px-2 111"
            onClick={toggleDropdown}
          >
            <Image
              src={`/icons/coins/${
                chainId == 250 ? "usdc" : selectedItem.toLowerCase()
              }.png`}
              alt={selectedItem}
              width={15}
              height={15}
            />
            {selectedItem}
          </div>
          {isOpen && (
            <div className={`bg-purple-200 rounded px-2 mt-1 cursor-pointer`}>
              {chainId == 250
                ? availableFantomCoins.map((item, index) => (
                    <div
                      className="flex flex-row items-center"
                      onClick={(e) => handleItemClick(e.currentTarget.id)}
                      id={item}
                      key={index}
                    >
                      <Image
                        src={`/icons/coins/usdc.png`}
                        alt={selectedItem}
                        width={15}
                        height={15}
                      />
                      {item}
                    </div>
                  ))
                : availableCoins.map((item, index) => (
                    <div
                      className="flex flex-row items-center"
                      onClick={(e) => handleItemClick(e.currentTarget.id)}
                      id={item}
                      key={index}
                    >
                      <Image
                        src={`/icons/coins/${item.toLowerCase()}.png`}
                        alt={selectedItem}
                        width={15}
                        height={15}
                      />
                      {item}
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>
      <div className="relative flex items-center gap-2 w-full">
        {/* <Input
                    className="bg-primary placeholder:text-accent text-left text-accent rounded-full pl-16 pr-[5.2rem] w-1/2"
                    placeholder="Insert referal code"
                /> */}
        {!isConfirmed && insertReferalCode && (
          <div className="w-1/2 flex flex-row items-center justify-end rounded-full border border-[#3e375d]">
            {/* <p className="text-primary text-center flex-1 tracking-[5px]">Y48D</p> */}
            <input
              className="bg-input text-primary border-none outline-none text-left rounded-full flex-1 text-center w-full"
              maxLength={4}
              autoFocus
              onChange={(e) => setFriendReferalCode(e.target.value)}
              value={friendReferalCode}
            />
            <Button
              size="sm"
              className="w-1/2"
              disabled={friendReferalCodeConfirm}
              onClick={handleConfirmReferalCode}
            >
              {friendReferalCodeConfirm ? (
                <ClipLoader size={20} color="white" />
              ) : (
                "Confirm"
              )}
            </Button>
          </div>
        )}
        {!isConfirmed && !insertReferalCode && (
          <Button className="w-1/2" onClick={() => setInsertReferalCode(true)}>
            Insert referal code
          </Button>
        )}
        {isConfirmed && (
          <p className="text-primary text-center w-1/2 tracking-[5px] border border-[#3e375d] rounded-full h-full py-2">
            {friendReferalCode}
          </p>
        )}
        {getReferalCode ? (
          <div className="w-1/2 flex flex-row items-center justify-end rounded-full border border-[#3e375d]">
            <p className="text-primary text-center flex-1 tracking-[5px]">
              {referalCode}
            </p>
            <Button size="sm" className="w-1/2" onClick={handleShare}>
              Share
            </Button>
          </div>
        ) : (
          <Button
            className="w-1/2"
            onClick={handleGetReferalCode}
            disabled={isGettingReferalCode}
          >
            {isGettingReferalCode ? (
              <ClipLoader size={20} color="white" />
            ) : (
              "Get Referal Code"
            )}
          </Button>
        )}
      </div>
      <div className="mt-4 justify-center  place-items-center grid">
        <div className="flex items-center gap-4">
          <Separator className="w-12 bg-primary" />
          <span className="text-primary">Choose Presale Mode</span>
          <Separator className="w-12 bg-primary" />
        </div>
      </div>
      <div className="mt-4 justify-center  place-items-center w-full">
        <fieldset className="w-full">
          <div>
            <input
              type="radio"
              id="vested"
              name="mode"
              value="vested"
              checked={selectedMode === 1}
              onChange={() => handleModeChange(1)}
            />
            <label htmlFor="vested" className="text-primary ml-2">
              Vested - 25% Unlocked on TG, 75% Vested
            </label>
          </div>

          <div>
            <input
              type="radio"
              id="full"
              name="mode"
              value="full"
              checked={selectedMode === 2}
              onChange={() => handleModeChange(2)}
            />
            <label htmlFor="full" className="text-primary ml-2">
              Full Ve - 100% Ve Position, locked
            </label>
          </div>

          <div>
            <input
              type="radio"
              id="hybrid"
              name="mode"
              value="hybrid"
              checked={selectedMode === 3}
              onChange={() => handleModeChange(3)}
            />
            <label htmlFor="hybrid" className="text-primary ml-2">
              Hybrid - 25% Unlocked on TG, 75% Ve locked
            </label>
          </div>
        </fieldset>
      </div>
      {(selectedMode === 2 || selectedMode === 3) && (
        <>
          <div className="mt-4 justify-center  place-items-center grid">
            <div className="flex items-center gap-4">
              <Separator className="w-12 bg-primary" />
              <span className="text-primary">Choose VE Lock Time</span>
              <Separator className="w-12 bg-primary" />
            </div>
          </div>
          <div className="mt-4 justify-center  place-items-center w-full">
            <fieldset className="w-full flex flex-wrap">
              <div className="w-1/2">
                <input
                  type="radio"
                  id="7"
                  name="time"
                  value="7"
                  checked={selectedLockTime === 7}
                  onChange={() => handleLockTimeChange(7)}
                />
                <label htmlFor="7" className="text-primary ml-2">
                  7 Months Lock
                </label>
              </div>

              <div className="w-1/2">
                <input
                  type="radio"
                  id="12"
                  name="time"
                  value="12"
                  checked={selectedLockTime === 12}
                  onChange={() => handleLockTimeChange(12)}
                />
                <label htmlFor="12" className="text-primary ml-2">
                  12 Months Lock
                </label>
              </div>

              <div className="w-1/2">
                <input
                  type="radio"
                  id="18"
                  name="time"
                  value="18"
                  checked={selectedLockTime === 18}
                  onChange={() => handleLockTimeChange(18)}
                />
                <label htmlFor="18" className="text-primary ml-2">
                  18 Months Lock
                </label>
              </div>

              <div className="w-1/2">
                <input
                  type="radio"
                  id="24"
                  name="time"
                  value="24"
                  checked={selectedLockTime === 24}
                  onChange={() => handleLockTimeChange(24)}
                />
                <label htmlFor="24" className="text-primary ml-2">
                  24 Months Lock
                </label>
              </div>
            </fieldset>
          </div>
        </>
      )}
      <div className="mt-4 justify-start place-items-center w-full">
        <p className="text-primary w-full">
          Value of Total Positions : $
          {(
            Number(inputAmount) +
            (Number(inputAmount) / 100) * bonusPercent
          ).toLocaleString()}
        </p>
        <p className="text-primary w-full">
          Total Bonus Received : {bonusPercent}%
        </p>
      </div>
      <div className="mt-4 justify-center">
        <Button
          onClick={handlePurchase}
          disabled={isPurchasing || checkingApprove || isApproving}
        >
          {isPurchasing || checkingApprove || isApproving ? (
            <span className="flex">
              <ClipLoader size={20} color="white" />
              {isPurchasing ? "Purchasing..." : "Approving..."}
            </span>
          ) : isApproved ? (
            "Purchase"
          ) : (
            "Approve"
          )}
        </Button>
      </div>
    </div>
  );
};
