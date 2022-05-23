
const Loged = () => {
  const redirectMM = () => {
    window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn')
  }
  return (
    <div class="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-indigo-600 to-blue-400">
      <div class="px-40 py-20 bg-white dark:bg-gray-800 rounded-md shadow-xl">
        <div class="flex flex-col items-center">
          <h1 class="font-bold text-gray-300 dark:text-gray-600 text-7xl">Web3 need You</h1>
          <h6 class="mb-2 text-2xl font-bold text-center text-gray-800 dark:text-gray-500 md:text-3xl">
            <span class="text-red-500">Oops!</span> You can't access to page
          </h6>
          <p class="mb-8 text-center text-gray-500 md:text-lg">
            Whitout having MetaMask
          </p>
          <button className="text-gray-500 bg-gray-200 dark:bg-gray-400 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5" onClick={redirectMM}>Install</button>
        </div>
      </div>
    </div>
  )
}

export default Loged