import { createContext, Dispatch, SetStateAction, useState } from "react";

type WalletContextType = {
  wallet: string;
  setWallet: Dispatch<SetStateAction<string>>;
  network: string;
  setNetwork: Dispatch<SetStateAction<string>>;
};

export const WalletContext = createContext<WalletContextType>(
  {} as WalletContextType
);

export const WalletProvider = (props: any) => {
  const [wallet, setWallet] = useState("");

  const value = {
    wallet,
    setWallet,
  };

  return (
    <WalletContext.Provider value={value}>
      {props.children}
    </WalletContext.Provider>
  );
};
