// import React, { useState, useEffect } from 'react';
// import {
//     CButton,
//     CCard,
//     CCardBody,
//     CCardFooter,
//     CCardHeader,
//     CCol,
//     CRow,
//     CTable,
//     CTableBody,
//     CTableCaption,
//     CTableDataCell,
//     CTableHead,
//     CTableHeaderCell,
//     CTableRow,
//     CSpinner,
//     CModal,
//     CModalBody,
//     CModalContent,
//     CModalFooter,
//     CModalHeader,
//     CModalTitle,
//     CModalDialog,
//     CForm,
//     CFormInput,
//     CFormSelect,
//     CFormLabel,
//     CAlert
// } from '@coreui/react'
// import CIcon from '@coreui/icons-react'

// import axios from 'axios';

// import '../../css/Style.css'
// import { BaseUrl } from 'src/App';
// import { AlertMsg } from 'src/components/Alerts';

// const ViewVendors = () => {

//     const [loading, setloading] = useState(false)
//     const [data, setData] = useState()
//     const [alertMsg, setalertMsg] = useState()

//     const getApiData = async () => {
//         await axios.post(BaseUrl + '/get_all_category')
//             .then((response) => {
//                 console.log(response.data.msg, 'get_all_category api')
//                 if (response.data.status === 200) {
//                     setData(response.data.msg)
//                 }
//                 else {
//                     setalertMsg({ type: 'error', title: "No Data found!", data: 'Category data not available.', onPress: () => setalertMsg(false) })
//                 }
//             })
//             .catch((error) => {
//                 console.log(error, 'get_all_category api');
//             });
//     }


//     useEffect(() => {
//         getApiData()
//     }, [])





   


//     return (
//         <>


//             <CRow>
//                 <CCol xs="12" md="12">
//                     <CCard>
//                         <CCardHeader>
//                             View Vendors
//                             {loading ? <CSpinner color="primary" size="sm" style={{ marginLeft: 10 }} /> : null}
//                         </CCardHeader>
//                         <CCardBody>

//                             <CTable align="middle" className="mb-0 border" hover responsive>
//                                 <CTableHead color="light">
//                                     <CTableRow>

//                                         <CTableHeaderCell scope="col">Gold</CTableHeaderCell>
//                                         <CTableHeaderCell scope="col">Diamond</CTableHeaderCell>
//                                         <CTableHeaderCell scope="col">Silver</CTableHeaderCell>
//                                         <CTableHeaderCell scope="col">GST</CTableHeaderCell>
//                                         {/* <CTableHeaderCell scope="col">Delete</CTableHeaderCell> */}
//                                     </CTableRow>
//                                 </CTableHead>
//                                 <CTableBody>
//                                     {data ? data.map((item, index) =>
//                                         <CTableRow key={index}>

//                                             <CTableDataCell>{index +1}</CTableDataCell>
//                                             <CTableDataCell>{item.diamond}</CTableDataCell>
//                                             <CTableDataCell>{item.silver}</CTableDataCell>
//                                             <CTableDataCell>{item.gst}</CTableDataCell>

//                                         </CTableRow>
//                                     ) : null}
//                                 </CTableBody>
//                             </CTable>

//                         </CCardBody>
//                         <CCardFooter>
//                         </CCardFooter>
//                     </CCard>

//                 </CCol>
//             </CRow>





//         </>
//     )
// }


// export default ViewVendors







import React, { useState, useEffect } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CCollapse,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CFade,
    CForm,
    CFormGroup,
    CFormText,
    CValidFeedback,
    CInvalidFeedback,
    CTextarea,
    CFormInput,
    CFormFeedback,
    CFormFile,
    CFormCheckbox,
    CFormRadio,
    CFormGroupAppend,
    CFormGroupPrepend,
    CDropdown,
    CFormInputGroupText,
    CFormLabel,
    CFormSelect,
    CRow,
    CSwitch,
    CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import axios from 'axios';

import '../../css/Style.css'
import { BaseUrl } from 'src/App';
import { AlertMsg } from 'src/components/Alerts';

const AddVendor = () => {
    const [errors, setErrors] = useState({});
    const [alertMsg, setalertMsg] = useState(false);
    const [loading, setloading] = useState(false)
    const[gold, setGold]=useState()
    const[silver, setSilver]=useState()
    const[diamond, setDiamond]=useState()
    const[gst, setGst]=useState()

    const vendorid = sessionStorage.getItem('idtoken');

    const [formDetails, setformDetails] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
    })
  
   

    

    const getApiData = async () => {
        setloading(true)
        await axios.post(BaseUrl + '/get_market_rates')
            .then((response) => {
                setloading(false)
                console.log(response.data.msg, 'get_all_market_rates api')
                if (response.data.status === 200) {
                     setGold(response.data.gold)
                     setSilver(response.data.silver)
                     setDiamond(response.data.diamond)
                     setGst(response.data.gst)
                }
                else {
                    setalertMsg({ type: 'error', title: "No Data found!", data: response.data.msg, onPress: () => setalertMsg(false) })
                }
            })
            .catch((error) => {
                console.log(error, 'get_all_market_rates api');
                setloading(false)
            });
    }


    useEffect(() => {
        getApiData()
    }, [])


    return (
        <>
            {alertMsg ?
                <AlertMsg msg={alertMsg} /> : null
            }
            <CRow>
                <CCol xs="12" md="12">
                    <CCard>
                        <CCardHeader>
                            price updated
                            {loading ? <CSpinner color="primary" size="sm" style={{ marginLeft: 10 }} /> : null}
                        </CCardHeader>

                        <CForm
                            // encType="multipart/form-data"
                            // className="form-horizontal"
                            // onSubmit={(e) => handleSubmit(e)}>
                            >
                            <CCardBody>

                                <CCol lg="8" >
                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="text-input">Gold</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            {/* <CFormInput id="name"  name="name" value={gold}  placeholder="Name"  /> */}
                                            <div className='border' style={{padding:"15px 15px"}}>
                                                <span>{gold}</span>
                                            </div>
                                           
                                        </CCol>
                                    </CRow>

                                    {/* <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="email-input">Diamond</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">

                                            <div className='border' style={{padding:"15px 15px"}}>
                                                <span>{diamond}</span>
                                            </div>
                                          
                                        </CCol>
                                    </CRow> */}

                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="email-input">Silver</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <div className='border' style={{padding:"15px 15px"}}>
                                                <span>{silver}</span>
                                            </div>
                                          
                                        </CCol>
                                    </CRow>

                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="email-input">Gst</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            {/* <CFormInput type="text" id="" name="" value={gst}   placeholder="Enter Password"  /> */}
                                            <div className='border' style={{padding:"15px 15px"}}>
                                                <span>{gst}</span>
                                            </div>
             
                                        </CCol>
                                    </CRow>

                                </CCol>
                            </CCardBody>
                            {/* <CCardFooter>
                                {loading ? <CButton size="lg" color="primary" disabled>
                                    <CSpinner component="span" size="sm" aria-hidden="true" />
                                    Submit
                                </CButton> :
                                    <CButton type="submit" size="lg" color="primary"> Submit</CButton>
                                }
                            </CCardFooter> */}
                        </CForm>
                    </CCard>

                </CCol>
            </CRow>
            <br></br>
            <br></br>
            <br></br>
        </>
    )
}

export default AddVendor;

