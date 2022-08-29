import React, {useState,useContext} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Cart from '../cart/Cart'
import {GlobalState} from '../../../GlobalState'
import { render } from 'react-dom'
import {tranSuccess} from '../cart/Cart'

function Transact() {
           
        const state = useContext(GlobalState)
        const [cart, setCart] = state.userAPI.cart
        const [token] = state.token
        const[userrr,setUserrr] = useState({
            account:''
        })
        const [user, setUser] = useState({
            accountId:'', secretkey: '', amount: '', orderID: '', adminAccId: '', cart: '' 
        })

        const [userr, setUserr] = useState({
            accountId:'', secretkey: '', amount: '', orderID: '', adminAccId: '', cart: '' 
        })

        const addToCart = async (cart) =>{
            await axios.patch('/user/addcart', {cart}, {
                headers: {Authorization: token}
            })
        }

        const onChangeInput = e =>{
            const {name, value} = e.target;
            setUser({...user, [name]:value})
        }

        const onChangeInput2 = e =>{
            const {name, value} = e.target;
            setUserrr({...userrr, [name]:value})
        }

        const balanceSubmit = async e => {
            e.preventDefault()
            console.log("~~~",userrr.account)
            const nres = await axios.post('http://localhost:4005/api/users/userInfos',{accountId:userrr.account})

            console.log("..==",nres.data)
            console.log("..--",nres.data[0].amount)
            alert('Your current balance is: '+ nres.data[0].amount)
        }

        const bankSubmit = async e =>{
            e.preventDefault()
            user.cart = cart
            // user.orderID = cart.product_id
            await axios.post('http://localhost:4005/api/transaction/verifyAccAndTransaction', {...user})
            userr.accountId= '696969'
            userr.adminAccId= '654321'
            userr.secretkey= '696969'
            userr.amount = user.amount*0.9

            userr.orderID = user.orderID
            userr.cart = cart
            await axios.post('http://localhost:4005/api/transaction/verifyAccAndTransaction', {...userr})

            console.log(userr)

            console.log(user.cart[0].quantity)
            setCart([])
            addToCart([])
            alert("You have successfully placed an order.")
            // console.log(cart)
            // console.log("The payment was succeeded!", e);
            
            // Cart.tranSuccess()
            // try{
            //     tranSuccess()
            // }catch (err) {
            //         // alert(err.response.data.msg)
            //         // console.log(err)
            //         console.log(err.response)
            // }
            
            // try {
            //     await axios.post('http://localhost:4005/api/transaction/verifyAccAndTransaction', {...user})


            //     setCart([])
            //     addToCart([])
            //     alert("You have successfully placed an order.")

            //     // localStorage.setItem('firstLogin', true)

                
            //     // window.location.href = "/";
            // } catch (err) {
            //     alert(err.response.data.msg)
            //     // console.log(err)
            //     // console.log(err.response)
            // }

            // if(cart.length === 0) 
            // return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Cart Empty</h2> 
            
        }
        

    // render(){
        return (
            // <div className='login-page'>
                
            // </div>
            
            <div className="login-page">

                <form onSubmit={balanceSubmit}>
                    <input type="account" name="account" required
                    placeholder="accountID" value={userrr.account} onChange={onChangeInput2} />
                    <div className="row">
                        <button type="submit">Show Balance</button>
                        {/* <Link to="/">Home</Link> */}
                    </div>
                </form>
                
                <form onSubmit={bankSubmit}>
                    <h2>Transaction</h2>
                    {/* <input type="text" name="fullName" required
                    placeholder="fullName" value={user.fullName} onChange={onChangeInput} /> */}

                    <input type="accountId" name="accountId" required
                    placeholder="accountId" value={user.accountId} onChange={onChangeInput} />

                    <input type="adminAccId" name="adminAccId" required
                    placeholder="adminAccId" value={user.adminAccId} onChange={onChangeInput} />


                    <input type="secretkey" name="secretkey" required autoComplete="on"
                    placeholder="secretkey" value={user.secretkey} onChange={onChangeInput} />

                    <input type="amount" name="amount" required autoComplete="on"
                    placeholder="amount" value={user.amount} onChange={onChangeInput} />

                    <input type="orderID" name="orderID" required autoComplete="on"
                    placeholder="orderID" value={user.amount} onChange={onChangeInput} />

                    <div className="row">
                        <button type="submit">Transfer</button>
                        <Link to="/">Home</Link>
                    </div>
                </form>
            </div>
        );
    // }
}

export default Transact
