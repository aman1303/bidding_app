import MaterialTable from 'material-table';
import {Link} from "@material-ui/core"
import React, { useState, useEffect,forwardRef } from 'react';
import Switch from "react-switch";

import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Search from '@material-ui/icons/Search';

const CustomerDetails = (props) => {

    const tableIcons = {
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
      };

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
                    <div >
                        <div ><img src={data.avatarUrl} height="40px" width="40px" style={{ borderRadius: "50%" }} /> </div>
                        <div>{data.firstname} {data.lastname}</div>
                    </div>
                )
            },
        },
        { title: "Email", field: "email" },
        { title: "Phone", field: "phone" },
        { title: "Premium", field: "hasPremium" },
        { title: "Bid Amount", field: "bid_amount" },
        { title: "Bid Product", field: "bid_product" },
        {
            title: "Details", field: null,
            render: function (data) {
                return (
                    <div style={{cursor:"pointer",paddingLeft:20}} onClick={() => props.history.push(`/${data.id}`)}>
                        <i className="fa fa-external-link-square" aria-hidden="true"></i>
                    </div >
                )
            }
        }
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
            // simpleData["customer"] = (
            //     <>
            //         <img
            //             src={simpleData.avatarUrl}
            //             height="40px"
            //             width="40px"
            //             style={{ borderRadius: "50%" }}
            //         />&nbsp;
            //         {simpleData.firstname} {simpleData.lastname}{" "}
            //     </>
            // );

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
            {/* <h1>AMan</h1> */}<div className="d-flex mt-2">
            <p className="mx-3">Show Highest Bid</p><Switch onChange={handleShowMaxToggle} checked={showMaxToggle} />
            </div>
            <MaterialTable
            icons={tableIcons}
                title="Customer Bidding Table"
                data={data}
                columns={columns}
            />
        </>
    );
}

export default CustomerDetails;