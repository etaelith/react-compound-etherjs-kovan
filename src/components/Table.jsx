import { useTable, usePagination } from "react-table";

const style = {
    button: `py-2 px-4 mx-2 text-sm font-medium text-white bg-gray-800 rounded-r border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`,
    buttonSelect: `py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`
}

export default function Table({ columns, data }) {
    // Table component logic and UI come here
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state,
    } = useTable({columns, data},usePagination)
    return (
    <div className="relative h-screen shadow-md bg-white dark:bg-gray-800">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" {...getTableProps()}>
            <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                    <th scope="col" className="px-6 py-3" {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {page.map((page, i) => {
                prepareRow(page);
                return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" {...page.getRowProps()}>
                    {page.cells.map(cell => {
                    return <td className="px-6 py-2 text-center" {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                    })}
                </tr>
                );
            })}
            </tbody>
        </table>
        <div className="flex flex-col items-center bg-white dark:bg-gray-800">
            <span className="text-sm text-gray-700 dark:text-gray-400 pt-4">
                Showing{" "}
                <span className="font-semibold text-gray-900 dark:text-white">{state.pageIndex + 1}</span> of{" "}
                <span className="font-semibold text-gray-900 dark:text-white">{pageOptions.length}</span> Pages{" "}
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
                <button className={style.buttonSelect} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                First Page
                </button>
                <button className={style.buttonSelect} onClick={() => previousPage()} disabled={!canPreviousPage}>
                Prev
                </button>
                <button className={style.buttonSelect} onClick={() => nextPage()} disabled={!canNextPage}>
                Next
                </button>
                <button className={style.buttonSelect} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                Last Page
                </button>

                <select className={style.buttonSelect} value={state.pageSize} onChange={e => {setPageSize(Number(e.target.value))}}>
                    {[10, 25, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            {`Show ${pageSize}`}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    </div>
    );
}