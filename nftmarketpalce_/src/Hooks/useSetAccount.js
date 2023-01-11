import { useDispatch } from "react-redux";
import { setAccount } from "../Store/slicers/accounts";

export const useSetAccount = () => {
  const dispatch = useDispatch();

  const connectAccount = async () => {
    if (!window.ethereum) {
      throw Error("User has to download metamask");
    } else {
      let accounts = await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .catch((err) => {
          console.log(err.code);
        });
      dispatch(setAccount(accounts[0]));

      if (window.ethereum.chainId === "0x5") {
        await window.ethereum
          .request({ method: "eth_requestAccounts" })
          .catch((err) => {
            console.log(err.code);
          });
      } else {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x5" }],
          });
        } catch (e) {
          if (e.code === 4902) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x5",
                    chainName: "Goerli Testnet",
                    nativeCurrency: {
                      name: "Ether",
                      symbol: "ETH", // 2-6 characters long
                      decimals: 18,
                    },
                    blockExplorerUrls: ["https://goerli.etherscan.io"],
                    rpcUrls: ["https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
                  },
                ],
              });
            } catch (addError) {
              console.error(addError);
            }
          }
        }
      }
    }
  };

  return {
    connectAccount,
  };
};
