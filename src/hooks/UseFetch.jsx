import { useContext, useEffect, useMemo, useState } from "react"
import { UserContext } from "../context/UserProvider"
import Table from "../components/Table"
const UseFetch = () => {
    const {defaultAccount} = useContext(UserContext)

    const [data, setDataTable] = useState([])

    useEffect(() => {
        consumeApi(defaultAccount)
        // eslint-disable-next-line
    }, [defaultAccount])

    const consumeApi = async(defaultAccount) =>{
        try {
            fetch(`https://api.covalenthq.com/v1/42/address/${defaultAccount}/transactions_v2/?quote-currency=USD&format=JSON&block-signed-at-asc=false&no-logs=false&page-size=1000&key=${process.env.REACT_APP_API}`)
            .then(res => res.json())
            .then(dat => {
                setDataTable(dat.data.items)
                console.log(dat.data.items)
            })
            .then(console.log(typeof data))
        } catch(error){
            console.log(error)
        }
    }      
    const columns = useMemo(
        () => [
            {
                Header: 'Address Transactions',
                columns: [
                    {
                        Header: "From",
                        accessor: 'from_address'
                    },
                    {
                        Header: "Value",
                        accessor: 'value_quote'
                    },
                    {
                        Header: "To address",
                        accessor: 'to_address'
                    }
                ]
            }
        ],[]
    ); 
    return (
        <Table columns={columns} data={data}></Table>
  )
}

export default UseFetch