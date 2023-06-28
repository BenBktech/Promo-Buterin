import useEth from "../../contexts/EthContext/useEth";

function Address() {
  const { state: { accounts } } = useEth();
  

//{ balance > 0 ? 
//<div>
//<p>Balance: {balance}</p>
//</div> : <></>
//https://discord.com/channels/861560988683862026/1018853513138274315/1042519525096165556


  return (
    <div className="addr">
        Votre address eth:
        <br />
        {accounts && accounts[0] && <pre>{accounts[0]}</pre>}
    </div>
    );
}

export default Address;