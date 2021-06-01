import MaterialTable from 'material-table';
import React, {useState, useEffect} from 'react';

const CustomerDetails = () => {
    const [data, setData] = useState([])
    const columns = [

        {title: "Customer", field: null,
        render: function(data) {
            // console.log("--------",data)
            return(
                <div>
                {data.firstname} {data.lastname} <img src={data.avatarUrl} height="40px" width="40px" style={{borderRadius:"50%"}} />
                </div>
                ) 
            },
        },
        {title: "Email", field: "email"},
        {title: "Phone", field: "phone"},
        {title: "Premium", field: "hasPremium"},
        {title: "Bid", field: null,
        render: function(data){
            return(
                <div>
                    {/* {console.log(data.bids)} */}
                    {data.bids.map((bidValue) =>
                    <div>
                    {bidValue.carTitle} Rs {bidValue.amount}/-
                    </div>
                    // console.log(bidValue) 
                    )}
                </div>
            )
        }
    },
    ]

    useEffect(() => {
        fetch("https://intense-tor-76305.herokuapp.com/merchants")
        .then(response => response.json())
        .then(response => setData(response))
    })


    return ( 
        <>
        <h1>AMan</h1>
            <MaterialTable
            title="Customer Bidding"
            data={data}
            columns={columns}
            />
        </>
     );
}
 
export default CustomerDetails;