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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import axios from 'axios';

import '../../css/Style.css'
import { BaseUrl } from 'src/App';
import { AlertMsg } from 'src/components/Alerts';

const Orders = () => {

    const [data, setData] = useState([])
    const [alertMsg, setalertMsg] = useState(false);
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState();
    // const [searchdata, setSearchdata] = React.useState('');
    const[query,setquery]=useState([])
    const[search,setSearch]=useState([])

    // const handleSearch = (event) => {
    //   setSearchdata(event.target.value);
    // };

    const getApiData = async () => {
        await axios.post(BaseUrl + '/get_admin_orders')
            .then((response) => {
                console.log(response.data.msg, 'get_admin_orders api')
                if (response.data.status === 200) {
                    setData(response.data.msg)
                }
                else {
                    setalertMsg({ type: 'error', title: "No Data found!", data: 'Category data not available.', onPress: () => setalertMsg(false) })
                }
            })
            .catch((error) => {
                console.log(error, 'get_admin_orders api');
            });
    }


    useEffect(() => {
        getApiData()
    }, [])
    const [formDetails, setformDetails] = useState({
        id: selected?.item_id,
        cust_id: selected?.cust_id,
        date: selected?.cust_id,
       
        status: 1,
    })
    const { id, email, mobile, password, status } = formDetails

//     const search = (data)=>{
// return data.filter(
//     (item)=>
//     item.tran_data.toLoweCase().inclucdes(query)
// )
//     }

const column = [
    {field:'id',headerName:'id',flex :1,},
        {field:'sn_order_id',headerName:'Order Id',flex :1,},
        {field:'item_amt',headerName:'Amount',flex:2},
        {field:'payment_status',headerName:'Payment',flex:2},
        {field:'trans_date',headerName:'Date',flex:2},
        {field:'payment_mode_remark',headerName:'Payment Mode',flex:2},
        // {field:'payment_mode_remark',headerName:'payment mode',flex:2}


    ];
    const row=data?.map((element,index)=>{
        console.log(element)
        return {
            id:index+1,
            sn_order_id:element.sn_order_id,
            item_amt:element.item_amt,
            payment_status:element.payment_status,
            trans_date:element.trans_date,
            payment_mode_remark:element.payment_mode_remark
        }
    })

    console.log(row)

   

    return(
        <>
            <Box style={{ height: '100vh', width: '100%' }}>
      <DataGrid 
      
     rows={row}
     columns = {column}
        components={{ Toolbar: GridToolbar }}
        pagination
        disableSelectionOnClick />
    </Box>
        </>
    )
}

export default Orders
