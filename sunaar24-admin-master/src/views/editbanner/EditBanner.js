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
//     CModal,
//     CModalBody,
//     CModalContent,
//     CModalFooter,
//     CModalHeader,
//     CModalTitle,
//     CModalDialog,
//     CSpinner,
//     CForm,
//     CFormTextarea,
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

// const EditBanner = (props) => {

//     const { item, visible, setVisible, setRefresh } = props

//     const [errors, setErrors] = useState({});
//     const [successMsg, setSuccessMsg] = useState(false);
//     const [loading, setloading] = useState(false)

//     const [formData, setFormData] = useState({
//         p_name: item.product_name,
//         product_sku_no: item.product_sku,
//         price: item.product_price,
//         offerPrice: item.product_offer_price,
//         quantity: item.product_qty,
//         // shortDesc: item.,
//         desc: item.product_desc,
//         // image: item.,
//         category: item.cat_id,
//         stockOut: item.out_of_stock,
//         minQuantity: item.product_min_qty,
//         maxQuantity: item.product_max_qty,
//         status: item.product_status,
//         vendor: item.vendor_id
//     })
//     const { p_name, price, offerPrice, product_sku_no, vendor,
//         maxQuantity, minQuantity, quantity, stockOut,
//         desc, category } = formData

//     const [data, setData] = useState()
//     const [vendors, setvendors] = useState()
//     const [alertMsg, setalertMsg] = useState(false);

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


//     const getVendors = async () => {
//         setloading(true)
//         await axios.post(BaseUrl + '/get_all_vendors')
//             .then((response) => {
//                 setloading(false)
//                 console.log(response.data.msg, 'get_all_vendors api')
//                 if (response.data.status === 200) {
//                     setvendors(response.data.msg)
//                 }
//                 else {
//                     setalertMsg({ type: 'error', title: "No Data found!", data: response.data.msg, onPress: () => setalertMsg(false) })
//                 }
//             })
//             .catch((error) => {
//                 console.log(error, 'get_all_vendors api');
//                 setloading(false)
//             });
//     }



//     useEffect(() => {
//         getApiData()
//         getVendors()
//     }, [])


//     const maxFileSize = 3 * 1024 * 1024

//     const onchange = (e) => {
//         setFormData(formData => ({ ...formData, [e.target.name]: e.target.value }))
//         console.log(formData, '--formData members')
//         if (e.target.files) {
//             if (e.target.files[0].size > maxFileSize) {
//                 window.alert('File size is too big. File size must be less than 3 MB.')
//             }
//             else {
//                 console.log(e.target.files[0]);
//                 setFormData(formData => ({
//                     ...formData,
//                     //  [e.target.image]: e.target.files[0] 
//                     [e.target.name]: e.target.files[0]
//                 }));
//             }
//         }
//     };

//     const validate = () => {
//         let errors = {};
//         if (!p_name) {
//             errors.p_name = "This field is required";
//             setErrors(errors)
//             return false
//         }
//         // else if (!formData.email) {
//         //     errors.email = "This field is required";
//         //     setErrors(errors)
//         //     return false
//         // }
//         // else if (!/\S+@\S+\.\S+/.test(email)) {
//         //     errors.email = 'Invalid email address';
//         //     setErrors(errors)
//         //     return false
//         // }
//         else if (!price) {
//             errors.price = "This field is required";
//             setErrors(errors)
//             return false
//         }
//         // else if (!/^[0]?[789]\d{9}$/.test(price)) {
//         //     errors.price = 'Invalid price no';
//         //     setErrors(errors)
//         //     return false
//         // }
//         else if (!desc) {
//             errors.desc = "This field is required"
//             setErrors(errors)
//             return false
//         }
//         else if (!vendor) {
//             errors.vendor = "This field is required"
//             setErrors(errors)
//             return false
//         }
//         else {
//             setErrors({})
//             return true;
//         }
//     }
//     const { b_name, image, status, platform, link, link_id, sequence } = formData

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         console.log('submitted')
//         const isValid = validate()
//         if (isValid) {
//             setloading(true)
//             let form = new FormData();
//             form.append('banner_name', b_name)
//             form.append('banner_img', image)
//             form.append('banner_sequence', sequence)
//             form.append('status', status)
//             form.append('platform', platform)
//             form.append('link_by', link)
//             form.append('link_id', link_id)
//             // form.append('banner_id', category);
//             // form.append('vendor_id', vendor);
//             form.append('banner_id', item.product_id);
//             console.log(p_name,'name')
//             await axios.post(BaseUrl + "/update_banner", form)
//                 .then((response) => {
//                     setloading(false)
//                     console.log(response, 'API edit_product Post method successful')
//                     if (response.data.status === 200) {
//                         setalertMsg({
//                             type: 'success', title: "Product Added!", data: response.data.msg, onPress: () => {
//                                 setalertMsg(false)
//                             }
//                         })
//                         setRefresh()
//                     }
//                     else setalertMsg({ type: 'error', title: "Can't add product!", data: response.data.msg, onPress: () => setalertMsg(false) })
//                 })
//                 .catch((error) => {
//                     setloading(false)
//                     console.log(error, 'error in post method with api edit_product')
//                 })
//         }
//     };


//     const Loader = () => (
//         <CSpinner color="primary" size="sm" />
//     )


//     return (
//         <>
//             {alertMsg ?
//                 <CAlert color={alertMsg.type == 'success' ? 'success' : 'danger'}>
//                     {alertMsg.data}
//                 </CAlert>
//                 : null}
//             <CForm
//                 encType="multipart/form-data"
//                 className="form-horizontal"
//                 onSubmit={(e) => handleSubmit(e)}>
//             <CModalBody>

//                 <CRow className="mb-3">
//                     <CCol md="3">
//                         <CFormLabel htmlFor="text-input">Banner name</CFormLabel>
//                     </CCol>
//                     <CCol xs="12" md="9">
//                         <CFormInput id="name" className={`${errors.p_name && 'help'}`} name="p_name" placeholder="Name" value={b_name} onChange={e => onchange(e)} />
//                         {errors.p_name && (<p className="is-danger">{errors.p_name}</p>)}
//                     </CCol>
//                 </CRow>

                

//                 <CRow className="mb-3">
//                     <CCol md="3">
//                         <CFormLabel htmlFor="select">Sequence</CFormLabel>
//                     </CCol>
//                     <CCol xs="12" md="9">
//                         <CFormSelect name="category" id="selectcat" value={sequence} onChange={e => onchange(e)}>
//                             <option value="0">--Select--</option>
//                             <option value="1">First</option>
//                                                 <option value="2">Second</option>
//                                                 <option value="3">Third</option>
//                                                 <option value="4">Fourth</option>
//                         </CFormSelect>
//                         {errors.category && (<p className="is-danger">{errors.category}</p>)}
//                     </CCol>
//                 </CRow>

               
//                 <CRow className="mb-3">
//                     <CCol md="3">
//                         <CFormLabel htmlFor="select">Status</CFormLabel>
//                     </CCol>
//                     <CCol xs="12" md="9">
//                         <CFormSelect name="status" id="selectcat" value={status} onChange={e => onchange(e)}>
//                             <option value="1">Active</option>
//                             <option value="0">Inactive</option>
//                         </CFormSelect>
//                         {errors.status && (<p className="is-danger">{errors.status}</p>)}
//                     </CCol>
//                 </CRow>


//                 <CRow className="mb-3">
//                     <CCol md="3">
//                         <CFormLabel htmlFor="select">Platform</CFormLabel>
//                     </CCol>
//                     <CCol xs="12" md="9">
//                         <CFormSelect name="status" id="selectcat" value={platform} onChange={e => onchange(e)}>
//                             <option value="1">Website</option>
//                             <option value="0">Application</option>
//                         </CFormSelect>
//                         {errors.status && (<p className="is-danger">{errors.status}</p>)}
//                     </CCol>
//                 </CRow>
                
//                 <CRow className="mb-3">
//                     <CCol md="3">
//                         <CFormLabel htmlFor="select">Link With</CFormLabel>
//                     </CCol>
//                     <CCol xs="12" md="9">
//                         <CFormSelect name="status" id="selectcat" value={link_id} onChange={e => onchange(e)}>
//                             <option value="1">Product</option>
//                             <option value="0">Category</option>
//                         </CFormSelect>
//                         {errors.status && (<p className="is-danger">{errors.status}</p>)}
//                     </CCol>
//                 </CRow>

//                 <CRow className="mb-3">
//                     <CCol md="3">
//                         <CFormLabel htmlFor="email-input">Image</CFormLabel>
//                     </CCol>
//                     <CCol xs="12" md="9">
//                         <CFormInput type="file" id="image" name="image" accept=".jpeg, .jpg, .png" onChange={e => onchange(e)} />
//                         {errors.image && (<p className="is-danger">{errors.image}</p>)}
//                     </CCol>
//                 </CRow>
//             </CModalBody>
//             <CModalFooter>
//                 <CButton color="secondary" onClick={() => setVisible(false)}>
//                     Close
//                 </CButton>
//                 {loading ? <CButton color="primary" disabled>
//                     <CSpinner component="span" size="sm" aria-hidden="true" />
//                     Submit
//                 </CButton> :
//                     <CButton type="submit" color="primary"
//                         onClick={(e) => handleSubmit(e)}> Submit</CButton>
//                 }
//             </CModalFooter>
//             </CForm>

//         </>
//     )
// }

// export default EditBanner





import React, { useState, useEffect } from 'react';
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
    CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import axios from 'axios';

import '../../css/Style.css'
import { BaseUrl } from 'src/App';
import { AlertMsg } from 'src/components/Alerts';

const EditBanner = (props) => {
    const {item} = props

    const [errors, setErrors] = useState({});
    const [loading, setloading] = useState(false)
    const [alertMsg, setalertMsg] = useState(false);


    const [formData, setFormData] = useState({
        b_id:item.id,
        b_name: "",
        status: "1",
        platform: "1",
        link: "1",
        link_id: "1",
        sequence: '',
    })
    const { b_name,status, platform, link, link_id, sequence,b_id} = formData

    const maxFileSize = 3 * 1024 * 1024

    const onchange = (e) => {
        setFormData(formData => ({ ...formData, [e.target.name]: e.target.value }))
        console.log(formData, '--formData members')
        if (e.target.files) {
            if (e.target.files[0].size > maxFileSize) {
                window.alert('File size is too big. File size must be less than 3 MB.')
            }
            else {
                console.log(e.target.files[0]);
                setFormData(formData => ({
                    ...formData,
                    //  [e.target.image]: e.target.files[0] 
                    [e.target.name]: e.target.files[0]
                }));
            }
        }
    };

    const validate = () => {
        let errors = {};
        if (!b_name) {
            errors.b_name = "This field is required"
            setErrors(errors)
            return false
        }
        else if (!sequence) {
            errors.sequence = "This field is required"
            setErrors(errors)
            return false
        }
       
        else {
            setErrors({})
            return true;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('submittedgygyg')
        const isValid = validate()
        if (isValid) {
            setloading(true)
            let form = new FormData()
            form.append('banner_id', b_id)
            form.append('banner_name', b_name)
            form.append('sequence', sequence)
            form.append('status', status)
            form.append('platform', platform)
            form.append('link_by', link)
            form.append('link_id', link_id)
                // alert(b_id,"bnnaer_id")
            await axios.post(BaseUrl + "/update_banner", form)
                .then((response) => {
                    setloading(false)
                    console.log(response, 'API add_banner Post method successful')
                    if (response.data.status === 200) {
                        setalertMsg({
                            type: 'success', title: "Banner Update!", data: response.data.msg, onPress: () => {
                                setalertMsg(false)
                                setFormData({
                                    b_name: "",
                                    
                                    status: "1",
                                    platform: "1",
                                    link: "1",
                                    link_id: "1",
                                    sequence: '',
                                })
                            }
                        })
                    }
                    else setalertMsg({ type: 'error', title: "Can't add banner", data: response.data.msg, onPress: () => setalertMsg(false) })
                })
                .catch((error) => {
                    setloading(false)
                    console.log(error, 'error in post method with api add_banner')
                    setalertMsg({ type: 'error', title: "Can't update banner", data: error.message, onPress: () => setalertMsg(false) })
                })
        }
    };


    useEffect(() => {

    }, []);





    return (
        <>
            {alertMsg ?
                <AlertMsg msg={alertMsg} /> : null
            }
            <CRow>
                <CCol xs="12" md="12">
                    <CCard>
                        <CCardHeader>
                            Update Banner
                            {loading ? <CSpinner color="primary" size="sm" style={{ marginLeft: 10 }} /> : null}
                        </CCardHeader>

                        <CForm
                            encType="multipart/form-data"
                            className="form-horizontal"
                            onSubmit={(e) => handleSubmit(e)}>

                            <CCardBody>

                                <CCol lg="8" >

                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="text-input">Banner name</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput id="name" className={`${errors.b_name && 'help'}`} name="b_name" placeholder="Name" value={b_name} onChange={e => onchange(e)} />
                                            {errors.b_name && (<p className="is-danger">{errors.b_name}</p>)}
                                        </CCol>
                                    </CRow>

                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="select">Sequence</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormSelect name="sequence" id="selectcat" value={sequence} onChange={e => onchange(e)}>
                                                <option value="">--Select--</option>
                                                <option value="1">First</option>
                                                <option value="2">Second</option>
                                                <option value="3">Third</option>
                                                <option value="4">Fourth</option>
                                            </CFormSelect>
                                            {errors.sequence && (<p className="is-danger">{errors.sequence}</p>)}
                                        </CCol>
                                    </CRow>

                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="select">Status</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormSelect name="status" id="selectcat" value={status} onChange={e => onchange(e)}>
                                                <option value="1">Active</option>
                                                <option value="0">Inactive</option>
                                            </CFormSelect>
                                            {errors.status && (<p className="is-danger">{errors.status}</p>)}
                                        </CCol>
                                    </CRow>

                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="select">Platform</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormSelect name="platform" id="selectcat" value={platform} onChange={e => onchange(e)}>
                                                <option value="1">Website</option>
                                                <option value="2">Application</option>
                                            </CFormSelect>
                                            {errors.platform && (<p className="is-danger">{errors.platform}</p>)}
                                        </CCol>
                                    </CRow>


                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="select">Link with</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormSelect name="link" id="selectcat" value={link} onChange={e => onchange(e)}>
                                                <option value="1">Product</option>
                                                <option value="2">Category</option>
                                            </CFormSelect>
                                            {errors.link && (<p className="is-danger">{errors.link}</p>)}
                                        </CCol>
                                    </CRow>


                                    {/* <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="email-input">Banner Image</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type="file" id="image" name="image" accept=".jpeg, .jpg, .png" onChange={e => onchange(e)} />
                                            {errors.image && (<p className="is-danger">{errors.image}</p>)}
                                        </CCol>
                                    </CRow> */}

                                </CCol>
                            </CCardBody>
                            <CCardFooter>
                                {loading ? <CButton size="lg" color="primary" disabled>
                                    <CSpinner component="span" size="sm" aria-hidden="true" />
                                    Submit
                                </CButton> :
                                    <CButton type="submit" size="lg" color="primary"> Submit</CButton>
                                }
                            </CCardFooter>
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

export default EditBanner

