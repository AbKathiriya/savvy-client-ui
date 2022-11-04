import Head from "next/head";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  Typography,
  Grid,
  Chip,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import ConnectWallet from "../src/components/connectWallet.component";
import { WalletContext } from "../src/contexts/walletContext";
import PaymentAbi from "../src/abis/payment.json";
import { handleErrors } from "../src/utils";

export default function Home() {
  const { wallet } = useContext(WalletContext);
  const [walletBalance, setWalletBalance] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [formValues, setFormValues] = useState([{ address: "", amount: "" }]);

  useEffect(() => {
    if (wallet) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      provider.getBalance(wallet).then((balance) => {
        // convert a currency unit from wei to ether
        const balanceInEth = ethers.utils.formatEther(balance);
        setWalletBalance(balanceInEth);
        console.log(`balance: ${balanceInEth} ETH`);
      });
    }
  }, [wallet]);

  const handleChange = (
    i: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let newFormValues = [...formValues];
    console.log(e.target.name, e.target.value);
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  const addFormFields = () => {
    setFormValues([...formValues, { address: "", amount: "" }]);
  };

  // const removeFormFields = (i) => {
  //   let newFormValues = [...formValues];
  //   newFormValues.splice(i, 1);
  //   setFormValues(newFormValues);
  // };

  const payNow = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      const signer = provider.getSigner();
      const paymentContract = new ethers.Contract(
        "0x1E5670D6d74955a1b52c1B5419DE11102E176e61",
        PaymentAbi,
        signer
      );
      const tx = await paymentContract.PayAll();
      console.log(tx);
      setPaymentStatus("INITIATED");
    } catch (error) {
      console.error(error);
      handleErrors(error, wallet);
    }
  };

  return (
    <div>
      <Head>
        <title>Savvy</title>
        <meta name="description" content="Savvy Website" />
      </Head>
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography variant="h1" gutterBottom>
            Payroll
          </Typography>
        </Grid>
        {!wallet ? (
          <Grid item xs={12}>
            <ConnectWallet />
          </Grid>
        ) : (
          <Grid
            item
            spacing={4}
            xs={12}
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Chip
                label={`Wallet Balance: ${walletBalance} ETH`}
                variant="outlined"
              />
            </Grid>
            {formValues.map((element, index) => {
              return (
                <Grid
                  item
                  xs={12}
                  container
                  justifyContent="center"
                  alignItems="center"
                >
                  <TextField
                    id="receipient-address"
                    label="Receipient Address"
                    variant="outlined"
                    name="address"
                    value={element.address}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <TextField
                    id="payment-amount"
                    label="Payment Amount"
                    variant="outlined"
                    sx={{ marginLeft: "1em" }}
                    name="amount"
                    value={element.amount}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{ marginLeft: "1em" }}
                    onClick={addFormFields}
                  >
                    Add
                  </Button>
                </Grid>
              );
            })}
            <Grid item xs={12}>
              <Button variant="outlined" size="large" onClick={payNow}>
                Pay Now
              </Button>
            </Grid>
            {paymentStatus === "INITIATED" && (
              <Grid item xs={12}>
                <Button variant="outlined" size="large">
                  Track Transaction
                </Button>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    </div>
  );
}
