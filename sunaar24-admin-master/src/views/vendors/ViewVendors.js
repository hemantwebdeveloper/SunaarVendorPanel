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
    CSpinner,
    CModal,
    CModalBody,
    CModalContent,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CModalDialog,
    CForm,
    CFormInput,
    CFormSelect,
    CFormLabel,
    CAlert,
    CInputGroup
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

import axios from 'axios';

import '../../css/Style.css'
import { BaseUrl } from 'src/App';
import { AlertMsg } from 'src/components/Alerts';

const ViewVendors = () => {


    const [data, setData] = useState([])
    const [alertMsg, setalertMsg] = useState(false);
    const [loading, setloading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState()
    const [errors, setErrors] = useState({});
    const[query,setquery]=useState([])

    const [formDetails, setformDetails] = useState({
        name: selected?.vendor_name,
        email: selected?.vendor_email,
        mobile: selected?.vendor_mobile,
        password: '',
        status: 1,
    })
    const { name, email, mobile, password, status } = formDetails

    const onchange = (e) => {
        setformDetails(formDetails => ({ ...formDetails, [e.target.name]: e.target.value }))
        console.log(formDetails, '--formDetails members')
    };


    const validate = () => {
        let errors = {};
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
        if (!formDetails.name) {
            errors.name = "This Field required";
            setErrors(errors)
            return false
        }
        else if (!formDetails.email) {
            errors.email = "This Field required";
            setErrors(errors)
            return false
        }
        else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Invalid email address';
            setErrors(errors)
            return false
        }
        else if (!formDetails.mobile) {
            errors.mobile = "This Field required";
            setErrors(errors)
            return false
        }
        else if (!/^[0]?[6789]\d{9}$/.test(mobile)) {
            errors.mobile = 'Invalid mobile no';
            setErrors(errors)
            return false
        }
        else {
            setErrors({})
            return true;
        }
    }

    const handleSubmit = async (e) => {
        console.log(selected+"bhbbbbnbnbnb")
        e.preventDefault()
        const isValid = validate()
        if (isValid) {
            setloading(true)
            let form = new FormData();
            form.append('vendor_id', selected)
            form.append('name', name)
            form.append('email', email)
            form.append('mobile', mobile)
            form.append('password', password)
            // 0 for inactive, 1 for Active
            form.append('status', status)
            await axios.post(BaseUrl + "/update_vendor_info", form)
                .then((response) => {
                    setloading(false)
                    console.log(response.data, 'API update_vendor_info Post method successful')
                    if (response.data.status === 200) {
                        setalertMsg({
                            type: 'success', title: "Vendor Updated!", data: response.data.msg, onPress: () => {
                                setalertMsg(false)
                                setformDetails({
                                    name: "",
                                    email: "",
                                    mobile: "",
                                    password: "",
                                })
                            }
                        })
                    }
                    else setalertMsg({ type: 'error', title: "Can't update vendor", data: response.data.msg, onPress: () => setalertMsg(false) })
                })
                .catch((error) => {
                    setloading(false)
                    console.log(error, 'error in post method with api update_vendor_info')
                })
        }
    };


    const getApiData = async () => {
        setloading(true)
        await axios.post(BaseUrl + '/get_all_vendors')
            .then((response) => {
                setloading(false)
                console.log(response.data.msg, 'get_all_vendors api')
                if (response.data.status === 200) {
                    setData(response.data.msg)
                }
                else {
                    setalertMsg({ type: 'error', title: "No Data found!", data: response.data.msg, onPress: () => setalertMsg(false) })
                }
            })
            .catch((error) => {
                console.log(error, 'get_all_vendors api');
                setloading(false)
            });
    }


    useEffect(() => {
        getApiData()
    }, [])


    const handleVendorEdit = item => {
        setformDetails({
            ...formDetails,
            name: item.vendor_name,
            email: item.vendor_email,
            mobile: item.vendor_mobile,
            status: item.status,
            // password: item.password,
        })
        setSelected(item)
        setVisible(true)
    }


    const column = [
        
        {field:'vendor_id',headerName:'vendor Id',flex :1,},
        {field:'vendor_name',headerName:'name',flex:2},
        {field:'vendor_email',headerName:'email',flex:2},
        {field:'vendor_mobile',headerName:'mobile',flex:2}, 
        {
            field :'modify',
            headerName :'modify',
            flex:2 ,
            renderCell:(params)=>{
      
              return <button type='button' className='btn btn-outline-primary m-1'  onClick={() => handleVendorEdit(params.row.vendor_id)}>edit </button>
                
            }
          }


    ];

    const row=data?.map((element,index)=>{
        console.log(element)
        return {
            id:index+1,
            vendor_id:element.vendor_id,
            vendor_name:element.vendor_name,
            vendor_email:element.vendor_email,
            vendor_mobile:element.vendor_mobile
        }
    })

    console.log(row)

    return (
        <>
            {/* {alertMsg ?
                <AlertMsg msg={alertMsg} /> : null
            } */}

            {/* <CRow>
                <CCol xs="12" md="12">
                    <CCard>
                        <CCardHeader>
                            View Vendors
                            {loading ? <CSpinner color="primary" size="sm" style={{ marginLeft: 10 }} /> : null}
                        </CCardHeader>
                        <CCardBody>
                        <CRow xs="12" md="12">
                                
                                <CCol md="5">
                                    <CInputGroup className="mb-3">
                                        
                                        <CFormInput type='text' placeholder="search for" onChange={e=>setquery(e.target.value.toLowerCase())}/>
                                    </CInputGroup>
                                </CCol>
                                
                            </CRow>
                            <CTable align="middle" className="mb-0 border" hover responsive>
                                <CTableHead color="light">
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Mobile</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
                                                                         </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    
                                    {data ? data.map((item,index)=>(
                                        item.vendor_name.toLowerCase().includes(query) || item.vendor_email.toLowerCase().includes(query)
                                        || item.vendor_mobile.toLowerCase().includes(query)?
                                        <CTableRow key={index}>
                                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                            <CTableDataCell>{item.vendor_name}</CTableDataCell>
                                            <CTableDataCell>{item.vendor_email}</CTableDataCell>
                                            <CTableDataCell>{item.vendor_mobile}</CTableDataCell>
                                           
                                            <CTableDataCell><CButton size="sm" color='info' onClick={() => handleVendorEdit(item)}>Edit</CButton></CTableDataCell>
                                            </CTableRow>:null
                                    ) ): null}
                                </CTableBody>
                            </CTable>

                        </CCardBody>
                        <CCardFooter>
                        </CCardFooter>
                    </CCard>

                </CCol>
            </CRow> */}


            <Box style={{ height: '100vh', width: '100%' }}>
      <DataGrid 
      getRowHeight={()=>50}
     rows={row}
     columns = {column}
        components={{ Toolbar: GridToolbar }}
        pagination
        disableSelectionOnClick />
    </Box>




            <CModal visible={visible} onClose={() => setVisible(false)}
                backdrop={'static'}
                keyboard={false}
                portal={false}
                scrollable>
                <CModalHeader>
                    <CModalTitle>Edit {selected?.vendor_name}</CModalTitle>
                </CModalHeader>
                {alertMsg ?
                    <CAlert color={alertMsg.type == 'success' ? 'success' : 'danger'}>
                        {alertMsg.data}
                    </CAlert>
                    : null}
                <CForm
                    encType="multipart/form-data"
                    className="form-horizontal"
                    onSubmit={(e) => handleSubmit(e)}>
                    <CModalBody>

                        <CCol lg="8" >
                            <CRow className="mb-3">
                                <CCol md="3">
                                    <CFormLabel htmlFor="text-input">Name</CFormLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CFormInput id="name" className={`${errors.name && 'help'}`} name="name" placeholder="Name" value={name} onChange={e => onchange(e)} />
                                    {errors.name && (<p className="is-danger">{errors.name}</p>)}
                                </CCol>
                            </CRow>

                            <CRow className="mb-3">
                                <CCol md="3">
                                    <CFormLabel htmlFor="email-input">Email Id</CFormLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CFormInput type="email" className={`${errors.email && 'help'}`} id="email" name="email" placeholder="Email" value={email} onChange={e => onchange(e)} />
                                    {errors.email && (<p className="is-danger">{errors.email}</p>)}
                                </CCol>
                            </CRow>

                            <CRow className="mb-3">
                                <CCol md="3">
                                    <CFormLabel htmlFor="email-input">Mobile</CFormLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CFormInput type="number" id="mobile" name="mobile" placeholder="Mobile Number" value={mobile} onChange={e => onchange(e)} />
                                    {errors.mobile && (<p className="is-danger">{errors.mobile}</p>)}
                                </CCol>
                            </CRow>

                            <CRow className="mb-3">
                                <CCol md="3">
                                    <CFormLabel htmlFor="email-input">Password</CFormLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CFormInput type="text" id="password" name="password" placeholder="Enter Password" value={password} onChange={e => onchange(e)} />
                                    {errors.password && (<p className="is-danger">{errors.password}</p>)}
                                </CCol>
                            </CRow>

                            <CRow className="mb-3">
                                <CCol md="3">
                                    <CFormLabel htmlFor="select">Status</CFormLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CFormSelect name="status" value={status} onChange={e => onchange(e)}>
                                        <option value={0}>Inactive</option>
                                        <option value={1}>Active</option>
                                    </CFormSelect>
                                    {errors.status && (<p className="is-danger">{errors.status}</p>)}
                                </CCol>
                            </CRow>
                        </CCol>

                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisible(false)}>
                            Close
                        </CButton>
                        {loading ? <CButton color="primary" disabled>
                            <CSpinner component="span" size="sm" aria-hidden="true" />
                            Submit
                        </CButton> :
                            <CButton type="submit" color="primary"> Submit</CButton>
                        }
                    </CModalFooter>
                </CForm>

            </CModal>




            <br></br>
            <br></br>
            <br></br>
            
        </>
    )
}

export default ViewVendors
