import { useContext } from "react"
import { UserContext } from "../context/UserProvider"

const CardTrade = () => {
    const {walletAddress} = useContext(UserContext)
  return (
            <div className="flex h-screen p-4 w-auto bg-gray-200 rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6 m-auto bg-gray-300 rounded-lg border border-gray-300 shadow-md sm:p-6 lg:p-8 dark:bg-gray-900 dasrk:border-gray-900" action="#">
                    <h5 className="text-xl text-center font-medium text-gray-900 dark:text-white">Swap</h5>
                    <h6 className="text-xs text-center font-medium text-gray-900/25 dark:text-white/25 ">{walletAddress}</h6>
                    <div>
                        <label htmlFor="change" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Change</label>
                        <input type="number" name="change" id="change" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none appearance-none" placeholder="0.3" required></input>
                    </div>
                    <div>
                        <label htmlFor="forTake" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">For</label>
                        <input type="number" name="forTake" id="forTake" placeholder="0.3" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none appearance-none" required></input>
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                </form>
            </div>
  )
}

export default CardTrade