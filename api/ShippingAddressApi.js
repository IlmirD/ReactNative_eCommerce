import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { GetToken } from '../asyncstorage/GetToken';
import { GetEmail } from '../asyncstorage/GetEmail';

function ShippingAddressApi () {
    // fetching Catalog from api
    const [Data, SetData] = useState({
        isLoading: true,
        data: null,
    });

    useEffect(() => {
        SetData({isLoading: true})

        async function ShippingAddress() {
            let token = await GetToken();  
            let email = await GetEmail();
            axios.get('http://192.168.0.101:8000/api/account/shipping_address', {
            headers: {
                Authorization: 'Token ' + token,
                email: email
            }})
            .then(res => {
                SetData({
                    isLoading: false,
                    data: res.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        ShippingAddress();

    }, [SetData]);

    let data = Data.data;

    return data;
}
export { ShippingAddressApi };