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
    CModal,
    CModalBody,
    CModalContent,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CModalDialog,
    CSpinner,
    CForm,
    CFormTextarea,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import axios from 'axios';

import '../../css/Style.css'
import { BaseUrl } from 'src/App';
import { AlertMsg } from 'src/components/Alerts';
import EditBanner from '../editbanner/EditBanner';

const ViewBanners = () => {


    const [data, setData] = useState()
    const [visible, setVisible] = useState(false)
    const [selectedItem, setselectedItem] = useState(false)
    const [refresh, setrefresh] = useState(false)
    const [alertMsg, setalertMsg] = useState(false)
    const [loading, setloading] = useState(false)
    const [platform, setPlatform] = useState(1)



    const getApiData = async () => {
        setloading(true)
        let form = new FormData()
        form.append('platform', 1)
        await axios.post(BaseUrl + '/get_banners', form)
            .then((response) => {
                setData()
                setloading(false)
                console.log(response.data.msg, 'get_banners api')
                if (response.data.status === 200) {
                    setData(response.data.msg)
                }
                else {
                  
                    setalertMsg({ type: 'error', title: "No Data found!", data: response.data.msg, onPress: () => setalertMsg(false) })
                }
            })
            .catch((error) => {
                console.log(error, 'get_banners api');
                setloading(false)
                setalertMsg({ type: 'error', title: "No Data found!", data: error.message, onPress: () => setalertMsg(false) })
            });
    }


    useEffect(() => {
        getApiData()
    }, [platform])

    // useEffect(() => {
    //     getApiData()
    // }, [refresh])

    // const handleRefresh = () => setrefresh(!refresh)

    const [Banner_id, setBannerid] = useState()
    const deleteBanner = async (id) => {
        // if (window.confirm('Delete Banner?')) {

        let form = new FormData()
        form.append('banner_id', id)
       
        await axios.post("https://shopninja.in/sunaar24/api2/public/index.php/delete_banner", form)
            .then((response) => {

                console.log(response.data.msg, 'delete_Banner api')
                if (response.data.status === 200) {
                    getApiData()
                    setalertMsg({
                        type: 'success', title: 'Deleted!', data: response.data.msg, onPress: () => {
                         
                        }
                    })
                }
                else {
                    setalertMsg({ type: 'error', title: 'Not Deleted!', data: response.data.msg, onPress: () => setalertMsg(false) })
                }
            })
            .catch((error) => {
                
                console.log(error, 'delete_banner api');
            });
        // }
    }

    const deleteBannerData = (id) => {
        let arr = [...data]
        let newArr = arr.filter(item => item.Banner_id !== id)
        setData(newArr)
    }
    const handleRefresh = () => setrefresh(!refresh)
    return (
        <>
            {alertMsg ?
                <AlertMsg msg={alertMsg} /> : null
            }

            <CRow>
                <CCol xs="12" md="12">
                    <CCard>
                        <CCardHeader>
                            View Banners
                            {loading ? <CSpinner color="primary" size="sm" style={{ marginLeft: 10 }} /> : null}
                        </CCardHeader>
                        <CCardBody>

                            <CRow className="mb-3">
                                <CCol md="3">
                                    <CFormLabel htmlFor="select">Platform</CFormLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CFormSelect name="platform" value={platform} onChange={e => setPlatform(e.target.value)}>
                                        <option value="1">Website</option>
                                        <option value="2">Application</option>
                                    </CFormSelect>
                                </CCol>
                            </CRow>

                            <CTable align="middle" className="mb-0 border" hover responsive>
                                <CTableHead color="light">
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Banner</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Platform</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {data ? data.map((item, index) =>
                                        <CTableRow key={index}>
                                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                            <CTableDataCell>{item.banner_name}</CTableDataCell>
                                            <CTableDataCell>{item.status == 1 ? 'Active' : 'Inactive'}</CTableDataCell>
                                            <CTableDataCell>{item.platform == 1 ? 'Website' : 'App'}</CTableDataCell>
                                            <CTableDataCell>
                                                <img src={item.banner_img} alt={'Banner'} style={{ height: 50, width: 50, objectFit: 'contain', margin: 1 }} />
                                            </CTableDataCell>
                                            <CTableDataCell><CButton size="sm" color='info'
                                                onClick={() => {
                                                    setselectedItem(item)
                                                    setVisible(true)
                                                   
                                                }}>Edit</CButton></CTableDataCell>
                                            <CTableDataCell>
                                                {loading === item.id ? <CButton size="sm" color='danger'>
                                                    <CSpinner component="span" size="sm" aria-hidden="true" />
                                                    Deleting
                                                </CButton> :
                                                    <CButton size="sm" color='danger'
                                                        // onSelect={()=>}
                                                        onClick={() => deleteBanner(item.id)  }>Delete</CButton>
                                                }
                                            </CTableDataCell>
                                        </CTableRow>
                                    ) : null}
                                </CTableBody>
                            </CTable>

                        </CCardBody>
                        <CCardFooter>
                        </CCardFooter>
                    </CCard>

                </CCol>
            </CRow>


            {/* edit Banner */}

            <CModal visible={visible} onClose={() => setVisible(false)}
                backdrop={'static'}
                keyboard={false}
                portal={false}
                scrollable>
                <CModalHeader>
                    <CModalTitle>{selectedItem.banner_name}</CModalTitle>
                    {/* <img src={selectedItem.banner_img} alt={'Category'} style={{ height: 30, width: 30, objectFit: 'contain', margin: 1, marginLeft: 15, }} /> */}
                </CModalHeader>

                <EditBanner item={selectedItem} visible={visible} setVisible={setVisible} setRefresh={handleRefresh} />

            </CModal>



        </>
    )
}

export default ViewBanners
