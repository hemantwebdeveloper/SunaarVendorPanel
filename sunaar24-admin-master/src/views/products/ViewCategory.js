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
    CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import axios from 'axios';

import '../../css/Style.css'
import { BaseUrl } from 'src/App';
import { AlertMsg } from 'src/components/Alerts';
import EditCategory from './EditCategory';

const ViewCategory = () => {


    const [data, setData] = useState()
    const [loading, setloading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [selectedItem, setselectedItem] = useState(false)
    const [refresh, setrefresh] = useState(false)
    const [alertMsg, setalertMsg] = useState(false)



    const getApiData = async () => {
        setloading(true)
        await axios.post(BaseUrl + '/get_all_category')
            .then((response) => {
                setloading(false)
                console.log(response.data.msg, 'get_all_category api')
                if (response.data.status === 200) {
                    setData(response.data.msg)
                }
                else {
                    setalertMsg({ type: 'error', title: "No Data found!", data: 'Category data not available.', onPress: () => setalertMsg(false) })
                }
            })
            .catch((error) => {
                setloading(false)
                console.log(error, 'get_all_category api');
            });
    }

    const deleteCat = async (id) => {
        if (window.confirm('Delete Category?')) {
            setloading(id)
            let form = new FormData()
            form.append('cat_id', id)
            await axios.post(BaseUrl + '/delete_category', form)
                .then((response) => {
                    setloading(false)
                    console.log(response.data.msg, 'delete_category api')
                    if (response.data.status === 200) {
                        setalertMsg({
                            type: 'success', title: 'Deleted!', data: response.data.msg, onPress: () => {
                                setalertMsg(false)
                                deleteCatData(id)
                            }
                        })
                    }
                    else {
                        setalertMsg({ type: 'error', title: 'Not Deleted!', data: response.data.msg, onPress: () => setalertMsg(false) })
                    }
                })
                .catch((error) => {
                    setloading(false)
                    console.log(error, 'delete_category api');
                });
        }
    }

    const deleteCatData = (id) => {
        let arr = [...data]
        let newArr = arr.filter(item => item.cat_id !== id)
        setData(newArr)
    }

    useEffect(() => {
        getApiData()
    }, [refresh])

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
                            View Categories
                            {loading ? <CSpinner color="primary" size="sm" style={{ marginLeft: 10 }} /> : null}
                        </CCardHeader>
                        <CCardBody>

                            <CTable align="middle" className="mb-0 border" hover responsive>
                                <CTableHead color="light">
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Parent</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {data ? data.map((item, index) =>
                                        <CTableRow key={index}>
                                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                            <CTableDataCell>{item.category_name}</CTableDataCell>
                                            <CTableDataCell>{item.status == 1 ? 'Active' : 'Inactive'}</CTableDataCell>
                                            <CTableDataCell>{item.parent_cat_id == 0 ? 'NA' : item.parent_cat_id}</CTableDataCell>
                                            <CTableDataCell>
                                                <img src={item.cat_img} alt={'Category'} style={{ height: 50, width: 50, objectFit: 'contain', margin: 1 }} />
                                            </CTableDataCell>
                                            <CTableDataCell><CButton size="sm" color='info'
                                                onClick={() => {
                                                    setselectedItem(item)
                                                    setVisible(true)
                                                }}>Edit</CButton></CTableDataCell>
                                            <CTableDataCell>
                                                {loading === item.cat_id ? <CButton size="sm" color='danger'>
                                                    <CSpinner component="span" size="sm" aria-hidden="true" />
                                                    Deleting
                                                </CButton> :
                                                    <CButton size="sm" color='danger'
                                                        onClick={() => deleteCat(item.cat_id)}>Delete</CButton>
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


            {/* edit category */}

            <CModal visible={visible} onClose={() => setVisible(false)}
                backdrop={'static'}
                keyboard={false}
                portal={false}
                scrollable>
                <CModalHeader>
                    <CModalTitle>{selectedItem.category_name}</CModalTitle>
                    <img src={selectedItem.cat_img} alt={'Category'} style={{ height: 30, width: 30, objectFit: 'contain', margin: 1, marginLeft: 15, }} />
                </CModalHeader>

                <EditCategory item={selectedItem} visible={visible} setVisible={setVisible} setRefresh={handleRefresh} />

            </CModal>



        </>
    )
}

export default ViewCategory
