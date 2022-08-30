import React, {useContext, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import {Link} from 'react-router-dom'
import axios from 'axios'

function OrderHistory() {
    const state = useContext(GlobalState)
    const [history, setHistory] = state.userAPI.history
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    // const [cart, setCart] = state.userAPI.cart
     

    useEffect(() => {
        if(token){
            const getHistory = async() =>{
                // if(isAdmin){
                    const res = await axios.get('http://localhost:4005/api/transaction/allofTransactions')
                    setHistory(res.data)
                    console.log("==",res.data)
                // }else{
                //     const res = await axios.get('http://localhost:4005/api/transaction/allofTransactions')
                //     setHistory(res.data)
                //     console.log("++++",res.data)
                // }
            }
            getHistory()
            console.log("----",history)
        }
    },[token, isAdmin, setHistory])

    return (
        <div className="history-page">
            <h2>History</h2>

            <h4>Total {history.length} transactions so far!</h4>

            <table>
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Sender Account</th>
                        <th>Receiver Account</th>
                        <th>Date of Purchased</th>
                        <th>Ordered Products</th>
                        {/* <th>Product ID</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        history.map(items => (
                            
                            <tr key={items._id}>
                                <td>{items.transactionId}</td>
                                <td>{items.accountId}</td>
                                <td>{items.transferId}</td>
                                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                {/* <td>{items}</td> */}
                                <td><Link to={`/history/${items._id}`}>View</Link></td>
                                
                                {/* <td>{items.cart[0].cart}</td> */}
                            </tr>
                            
                        ))
                    }
                </tbody>
            </table>
            
        </div>
        
    )
}

export default OrderHistory
