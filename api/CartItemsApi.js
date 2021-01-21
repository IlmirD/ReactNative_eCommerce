import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { GetToken } from '../asyncstorage/GetToken';
import { GetEmail } from '../asyncstorage/GetEmail';

function CartItemsApi () {
    // fetching Catalog from api
    const [Data, SetData] = useState({
        isLoading: true,
        data: null,
    });

    useEffect(() => {
        SetData({isLoading: true})

        async function CartItems() {
            let token = await GetToken();  
            let email = await GetEmail();
            axios.get('http://192.168.0.101:8000/api/order/cart_list', {
            headers: {
                Authorization: 'Token ' + token,
                email: email
            }})
            .then(res => {
                SetData({
                    isLoading: false,
                    data: res.data
                });
                console.log(res.data.order_item)
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        CartItems();

    }, [SetData]);

    let data = Data.data;

    return data;
}
export { CartItemsApi };