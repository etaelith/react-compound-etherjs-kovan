import { useContext} from "react"
import { UserContext } from "../context/UserProvider"
import { ContractContext } from "../context/ContractProvider"
import LoadingButton from "./LoadingButton"
const style = {
  container : `flex-1 w-screen bg-gray-400 dark:bg-gray-700 h-auto grid place-items-center`,
  form :`p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 dark:bg-gray-800 dark:border-gray-700`,
  margin : `my-2.5`,
  h5 : `text-center text-xl font-medium text-gray-900 dark:text-white`,
  h6 : `text-xs text-center font-medium text-gray-900/25 dark:text-white/25`,
  labelOption : `block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400`,
  select : `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`,
  h6Ex: `ml-2 text-sm font-medium text-gray-900 dark:text-gray-500`,
  labelInput : `block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300`,
  input : `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`,
  button : `w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`
}

const TestCard = () => {
  const {defaultAccount} = useContext(UserContext)
  const {
    balSwap, uiTag, 
    exchangeRateCERC,
    handleChange,
    placeholder,
    handleSubmit,
  } = useContext(ContractContext)

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h5 className={style.h5}>Swap</h5>
        <h6 className={style.h6}>{`${defaultAccount.substring(0,7)}...`}</h6>
        <div>
            <label htmlFor="token" className={style.labelOption}>Select an option</label>
            <select id="token" name="token" className={style.select} onChange={handleChange} disabled={uiTag.handleDisabled}>
            <option value="eth">ETH to cETH</option>
            <option value="dai">DAI to cDAI</option>
            <option value="cdai">cDAI to DAI</option>
            </select>
        </div>
        <div className={style.margin}>
          <label htmlFor="swapAmount" className={style.labelInput}>{uiTag.tokenValue}</label>
          <input type="number" name="swapAmount" id="swapAmount" className={style.input} onChange={handleChange} max={Number(placeholder).toFixed(2)} step=".01" placeholder={`${placeholder} max`} disabled={uiTag.handleDisabled}/>
        </div>
        <div className="flex justify-between items-center">
          <h6 className={style.h6Ex}>ExchangeRate:</h6>
          <h6 className={style.h6Ex}>{`1 ${uiTag.tokenValue} : ~${Number(exchangeRateCERC).toFixed(3)} ${uiTag.swapValue}`}</h6>
        </div>
        <div className={style.margin}>
          <label htmlFor="rateValue" className={style.labelInput}>{uiTag.swapValue}</label>
          <input type="text" name="rateValue" id="rateValue" className={style.input} value={balSwap.rateValue} disabled/>
        </div>
        <button className={`${style.button} mt-2.5`} disabled={uiTag.handleDisabled}>
          {uiTag.handleDisabled === true ? <LoadingButton/> : 'Go' }
        </button>
      </form>
    </div>
  )
}

export default TestCard