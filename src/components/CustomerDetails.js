import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import Switch from "react-switch";

const CustomerDetails = () => {
    const [data, setData] = useState([])
    const [bidArray, setBidArray] = useState([])
    const [dataToShow, setDataToShow] = useState([]);
    let [showMaxToggle, setShowMaxToggle] = useState(true);
    const columns = [

        {
            title: "Customer", field: null,
            render: function (data) {
                // console.log("--------",data)
                return (
                    <div>
                        <img src={data.avatarUrl} height="40px" width="40px" style={{ borderRadius: "50%" }} /> {data.firstname} {data.lastname}
                    </div>
                )
            },
        },
        { title: "Email", field: "email" },
        { title: "Phone", field: "phone" },
        { title: "Premium", field: "hasPremium" },
        { title: "Bid Amount", field: "bid_amount" },
        { title: "Bid Product", field: "bid_product" },
    ]

    function showMinBid(arr) {
        var minBid = getMinBid(arr, "amount");
        return (
            <>
                Rs {minBid.amount}/- for {minBid.carTitle}
            </>
        );
    }

    function getMinBid(arr, prop) {
        console.log("getMin_arr", arr);
        var max;
        for (var i = 0; i < arr.length; i++) {
            if (max == null || parseInt(arr[i][prop]) < parseInt(max[prop]))
                max = arr[i];
        }
        return max;
    }

    function showMaxBid(arr) {
        var maxBid = getMaximumBid(arr, "amount");

        if (maxBid != undefined && maxBid.hasOwnProperty("amount")) {
            return (
                <>
                    Rs {maxBid.amount}/- for {maxBid.carTitle}
                </>
            );
        } else {
            return <>None</>;
        }
    }

    function getMaximumBid(arr, prop) {
        console.log("getMaximumBid_arr", arr);
        var max;
        for (var i = 0; i < arr.length; i++) {
            if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
                max = arr[i];
        }

        console.log("getMaximumBid_max", max);
        return max;
    }

    function getMaximumAmount(arr) {
        var mx = getMaximumBid(arr, "amount");
        if (mx != undefined && mx.hasOwnProperty("amount")) {
            return mx.amount;
        } else {
            return 0;
        }
    }

    function getMaximumProduct(arr) {
        var mx = getMaximumBid(arr, "amount");
        if (mx != undefined && mx.hasOwnProperty("amount")) {
            return mx.carTitle;
        } else {
            return "";
        }
    }

    function getMinimumAmount(arr) {
        var mx = getMinBid(arr, "amount");
        if (mx != undefined && mx.hasOwnProperty("amount")) {
            return mx.amount;
        } else {
            return 0;
        }
    }

    function getMinimumProduct(arr) {
        var mx = getMinBid(arr, "amount");
        if (mx != undefined && mx.hasOwnProperty("amount")) {
            return mx.carTitle;
        } else {
            return "";
        }
    }


    useEffect(() => {
        fetch("https://intense-tor-76305.herokuapp.com/merchants")
            .then(response => response.json())
            .then((response) => {
                console.log("Api_response", response);
                //getMaximumBid(response[0].bids, "amount");
                setData(response);
                set2DataTableDatas(response);
            });
    }, [])

    function set2DataTableDatas(simpleDataArray) {
        let blankData = [];

        simpleDataArray.map((simpleData, index) => {
            console.log("_simpleData", simpleData);
            simpleData["sno"] = index + 1;
            simpleData["customer"] = (
                <>
                    <img
                        src={simpleData.avatarUrl}
                        height="40px"
                        width="40px"
                        style={{ borderRadius: "50%" }}
                    />&nbsp;
                    {simpleData.firstname} {simpleData.lastname}{" "}
                </>
            );

            if (showMaxToggle) {
                simpleData["bid_amount"] = getMaximumAmount(simpleData.bids);
                simpleData["bid_product"] = getMaximumProduct(simpleData.bids);
            } else {
                simpleData["bid_amount"] = getMinimumAmount(simpleData.bids);
                simpleData["bid_product"] = getMinimumProduct(simpleData.bids);
            }

            blankData.push(simpleData);
        });

        setDataToShow(blankData);
    }

    function handleShowMaxToggle(checked) {
        setShowMaxToggle(checked);
    }

    useEffect(() => {
        console.log("useEffect_checked", showMaxToggle);
        set2DataTableDatas(data);
    }, [showMaxToggle]);


    return (
        <>
            <h1>AMan</h1>
            <Switch onChange={handleShowMaxToggle} checked={showMaxToggle} />
            <MaterialTable
                title="Customer Bidding"
                data={data}
                columns={columns}
            />
        </>
    );
}

export default CustomerDetails;