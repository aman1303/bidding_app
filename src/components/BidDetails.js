import React, { useState, useEffect } from 'react';
import axios from "axios"


const BidDetails = (props) => {
    const {history, match} = props;
    const {params} = match;
    const {id} = params
    const [customer, setCustomer] = useState(undefined)

    useEffect(() => {
        axios.get(`https://intense-tor-76305.herokuapp.com/merchants/${id}`)
        .then(function(response) {
            const {data} = response;
            setCustomer(data)
        })
        .catch(function(error) {
            setCustomer(false)
        })
    }, [id])
    
    const customerDetail = () => {
        // return(
            // <>
            {if (customer != undefined) {
                console.log(customer.firstname)
                return(
                    <>
                    <div className="d-flex" style={{height:"100vh" ,justifyContent:"center", alignItems:"center"}}>
                        <div style={{boxShadow:"0px 0px 10px gray", padding:20, textAlign:"center"}}>
                    <h1>{customer.firstname} {customer.lastname}</h1>
                    <img style={{height:100, width:100, borderRadius:"50%"}}src={customer.avatarUrl} />
                    <h3>Email: {customer.email}</h3>
                    <h3>Phone No: {customer.phone}</h3>
                    <ul style={{ textAlign:"left"}}> 
                    {customer.bids.map((bid) => {
                        // console.log(bid)
                        return(
                            <>
                                <li>Rs {bid.amount}/- for {bid.carTitle} </li>
                            </>
                        )
                    })}
                    </ul>
                        </div>
                    </div>
                    </>
                )
            }}
            {/* {console.log(customer)} */}
                {/* <h1>{firstname} {lastname}</h1> */}
            // </>
        // )
    }
    return ( 
        <>
            {/* <h2>AMan{id}</h2> */}
            {customerDetail()}
            {console.log(customer)}
        </>
     );
}
 
export default BidDetails;