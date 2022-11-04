import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useContext, useState, useCallback } from "react";
import { toast } from "react-toastify";

import { WalletContext } from "../contexts/walletContext";

const StyledButton = styled(Button)`
  margin: 0 1em;
  border: 1px solid #fff;
  color: #fff;
  font-size: 1rem;
  line-height: 1.75;
  letterspacing: 0.00938em;

  &:hover {
    border: 1px solid #a6a6a6;
  }
`;

const ConnectWallet: React.FC = () => {
  const { wallet, setWallet } = useContext(WalletContext);

  const correctNetworkCheck = (networkId: string | number) => {
    // return networkId == 1;
    return networkId == 1 || networkId == 5;
  };

  const connectMetamask = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setSelectedWallet(accounts[0]);
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
    }
  };

  const maskWallet = () => {
    return `${wallet.slice(0, 5)}....${wallet.slice(-4)}`;
  };

  const setSelectedWallet = useCallback(
    (account: string) => {
      if (correctNetworkCheck(window.ethereum.networkVersion)) {
        toast.success("Connected!!");
        setWallet(account);
      } else {
        toast.error(
          'Connected to unsupported network. Please switch to "Ethereum Mainnet."'
        );
        setWallet("");
      }
    },
    [setWallet]
  );

  useEffect(() => {
    const accountChanged = (accounts: any) => {
      setWallet(accounts[0]);
    };

    const networkChanged = (_chainId: any) => {
      if (!correctNetworkCheck(parseInt(_chainId, 16))) {
        setWallet("");
      }
    };
    window.ethereum?.on("accountsChanged", accountChanged);

    window.ethereum?.on("chainChanged", networkChanged);

    return () => {
      window.ethereum?.removeListener("accountsChanged", accountChanged);
      window.ethereum?.removeListener("chainChanged", networkChanged);
    };
  }, [setWallet]);

  return (
    <StyledButton variant="outlined" size="small" onClick={connectMetamask}>
      {wallet ? maskWallet() : "Connect Wallet"}
    </StyledButton>
  );
};

export default ConnectWallet;
