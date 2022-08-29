import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

function RegisterBank() {
    const [user, setUser] = useState({
        fullName:'', accountId:'', secretkey: '', amount: ''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const registerbankSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('http://localhost:4005/api/users/register', {...user})

            localStorage.setItem('firstLogin', true)

            
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="login-page">
            <form onSubmit={registerbankSubmit}>
                <h2>RegisterBank</h2>
                <input type="text" name="fullName" required
                placeholder="fullName" value={user.fullName} onChange={onChangeInput} />

                <input type="accountId" name="accountId" required
                placeholder="accountId" value={user.accountId} onChange={onChangeInput} />

                <input type="secretkey" name="secretkey" required autoComplete="on"
                placeholder="secretkey" value={user.secretkey} onChange={onChangeInput} />

                <input type="amount" name="amount" required autoComplete="on"
                placeholder="amount" value={user.amount} onChange={onChangeInput} />


                <div className="row">
                    <button type="submit">Register</button>
                    <Link to="/">Home</Link>
                </div>
            </form>
        </div>
    )
}

export default RegisterBank