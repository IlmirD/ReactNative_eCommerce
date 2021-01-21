import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { GetToken } from '../asyncstorage/GetToken';

function CatalogApi () {
    // fetching Catalog from api
    const [Data, SetData] = useState({
        isLoading: true,
        data: null,
    });

    useEffect(() => {
        SetData({isLoading: true})
        async function Catalog() {
            let token = await GetToken();  
            axios.get('http://192.168.0.101:8000/api/mobile/product_category', {
            headers: {
                Authorization: 'Token ' + token
            }})
            .then(res => {
                SetData({
                    isLoading: false,
                    data: res.data.results
                });
            })
            .catch(function (error) {
            console.log(error);
            });
        }
        Catalog();
    }, [SetData]);

    let data = Data.data;

    return data;
}
export { CatalogApi };