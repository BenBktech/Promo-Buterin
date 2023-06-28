import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Address from "./Address";
import Balance from "./Balance";
import Button from "./Button";


function Web3stuff() {
  const { state: { contract, accounts } } = useEth();
  const [balance, setBalance] = useState();

  const refreshBalance = async () => {
    const value = await contract.methods.balanceOf(accounts[0]).call({ from: accounts[0] });
    setBalance(value);
  }

  useEffect(() => {
    if (contract?.methods) {
        refreshBalance();
    }
  }, [contract]);



  return (
    <div className="web3stuff">
        <Address accounts={accounts}/>
        {balance==0 ? <div className="bal">Vous n'avez aucun token pour le moment.</div> : <Balance balance={balance}  />} 
        <Button refreshBalance={refreshBalance}/>

    </div>
  );
}

export default Web3stuff;