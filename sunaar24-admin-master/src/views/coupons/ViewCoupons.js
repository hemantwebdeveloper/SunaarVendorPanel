import React, { useState, useEffect } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableCaption,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'


// import axios from 'axios';

import '../../css/Style.css'
// import { BaseUrl } from 'src/App';
import CIcon from '@coreui/icons-react'

import axios from 'axios';


import { BaseUrl } from 'src/App';
import { AlertMsg } from 'src/components/Alerts';

const ViewCoupons = () => {
    const [data, setData] = useState()
    const [platform, setPlatform] = useState(1)
    const [refresh, setrefresh] = useState(false)
    const [alertMsg, setalertMsg] = useState(false)
    const [loading, setloading] = useState(false)



    const getApiData = async () => {
        setloading(true)
        let form = new FormData()
        form.append('platform', 1)
        await axios.post(BaseUrl + '/get_all_coupons', form)
            .then((response) => {
                setData()
                setloading(false)
                console.log(response.data.msg, 'get_coupons api')
                if (response.data.status === 200) {
                    setData(response.data.msg)
                }
                else {
                    setalertMsg({ type: 'error', title: "No Data found!", data: response.data.msg, onPress: () => setalertMsg(false) })
                }
            })
            .catch((error) => {
                console.log(error, 'coupons api');
                setloading(false)
                setalertMsg({ type: 'error', title: "No Data found!", data: error.message, onPress: () => setalertMsg(false) })
            });
    }


    useEffect(() => {
        getApiData()
    }, [platform])


    return (
        <>

            <CRow>
                <CCol xs="12" md="12">
                    <CCard>
                        <CCardHeader>
                            View Coupons
                        </CCardHeader>
                        <CCardBody>

                            <CTable align="middle" className="mb-0 border" hover responsive>
                                <CTableHead color="light">
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                       
                                        <CTableHeaderCell scope="col">OFF %</CTableHeaderCell>
                                       
                                        <CTableHeaderCell scope="col">Creation Dt.</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Expire Dt.</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                                        
                                        <CTableHeaderCell scope="col">Applicable</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                                        {/* <CTableHeaderCell scope="col">Services</CTableHeaderCell> */}
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                {data ? data.map((item, index) =>
                                    <CTableRow key={index}>
                                        <CTableHeaderCell scope="row">{index+1}</CTableHeaderCell>
                                      
                                        <CTableDataCell>{item.coupon_code}</CTableDataCell>
                                        <CTableDataCell>{item.created_at}</CTableDataCell>
                                       
                                        <CTableDataCell>{item.expiry_date}</CTableDataCell>
                                        <CTableDataCell>{item.coupon_desc}</CTableDataCell>
                                        <CTableDataCell>{item.applicable_for}</CTableDataCell>
                                        <CTableDataCell>{item.status}</CTableDataCell>
                                        {/* <CTableDataCell>services</CTableDataCell> */}
                                    </CTableRow>
                                ):null}
                                </CTableBody>
                            </CTable>

                        </CCardBody>
                        <CCardFooter>
                        </CCardFooter>
                    </CCard>

                </CCol>
            </CRow>
            <br></br>
            <br></br>
            <br></br>
        </>
    )
}

export default ViewCoupons
