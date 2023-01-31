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
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CModal,
    CModalBody,
    CModalContent,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CModalDialog,
    CPaginationItem,
    CPagination
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import axios from 'axios';

import '../../css/Style.css'
import { BaseUrl } from 'src/App';
import { AlertMsg } from 'src/components/Alerts';
// import { BaseUrl } from 'src/App';
import DataTable from 'react-data-table-component';

const ViewCustomers = () => {

    const [visible, setVisible] = useState(false)
    const [data, setData] = useState([])
    const [alertMsg, setalertMsg] = useState(false);
    const[query,setquery]=useState([])

    const getApiData = async () => {
        await axios.post(BaseUrl + '/get_all_customers')
            .then((response) => {
                console.log(response.data.msg, 'get_all_customers api')
                if (response.data.status === 200) {
                    setData(response.data.msg)
                }
                else {
                    setalertMsg({ type: 'error', title: "No Data found!", data: 'Customer data not available.', onPress: () => setalertMsg(false) })
                }
            })
            .catch((error) => {
                console.log(error, 'get_all_customers api');
            });
    }


    const deleteCat = async (id) => {
        let form = new FormData()
        form.append('cat_id', id)
        await axios.post(BaseUrl + '/delete_category', form)
            .then((response) => {
                console.log(response.data.msg, 'delete_category api')
                if (response.data.status === 200) {
                    setalertMsg({
                        type: 'error', title: 'Deleted!', data: response.data.msg, onPress: () => {
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
                console.log(error, 'delete_category api');
            });
    }

    const deleteCatData = (id) => {
        let arr = [...data]
        arr.filter(item => item.cat_id !== id)
        setData(arr)
    }


    useEffect(() => {
        getApiData()
    }, [])

    const column = [
        
        {field:'cust_id',headerName:' custid',flex :1,},
        {field:'cust_name',headerName:'name',flex:2},
        {field:'cust_email',headerName:'email',flex:2},
        {field:'cust_mobile',headerName:'mobile',flex:2}
        


    ];
    const row=data?.map((element,index)=>{
        console.log(element)
        return {
            id:index+1,
            cust_id:element.cust_id,
            cust_name:element.cust_name,
            cust_email:element.cust_email,
            cust_mobile:element.cust_mobile
        }
    })

    console.log(row)

    return (
        <>
            

            
            <Box style={{ height: '100vh', width: '100%' }}>
      <DataGrid 
      getRowHeight={()=>50}
     rows={row}
     columns = {column}
        components={{ Toolbar: GridToolbar }}
        pagination
        disableSelectionOnClick />
    </Box>
        </>
    )
}

export default ViewCustomers
