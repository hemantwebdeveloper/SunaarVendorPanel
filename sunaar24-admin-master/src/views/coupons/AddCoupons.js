import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    CSwitch, CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

// import axios from 'axios';

import '../../css/Style.css'
import { AlertMsg } from 'src/components/Alerts';
// import { BaseUrl } from 'src/App';

const AddCoupon = () => {
  




    const [errors, setErrors] = useState({});
    const [successMsg, setSuccessMsg] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')
    const [alertMsg, setalertMsg] = useState(false);
    const [loading, setloading] = useState(false)
    const[formdata,setFormData]=useState({
        coupon_code: "",
        desc: "",
        percent_off: "",
        applicable: "",
        coupon_expiry: "",
        services: "",
        coupon_id: '',
    })

    const vendorid = sessionStorage.getItem('idtoken');

    const [formDetails, setFormDetails] = useState({
        name: "",
        percentage: "",
        expDate: "",
    })
    const { coupon_code,coupon_expiry, desc,percent_off,services,applicable ,status,coupon_id} = formDetails

    const onchange = (e) => {
        setFormDetails(formDetails => ({ ...formDetails, [e.target.name]: e.target.value }))
        console.log(formDetails, '--formDetails members')
    };


    const validate = () => {
        let errors = {};
        if (!coupon_code) {
            errors.coupon_code = "This Field required";
            setErrors(errors)
            return false
        }
        else if (!percent_off) {
            errors.percent_off = "This Field required";
            setErrors(errors)
            return false
        }
        else if (!desc) {
            errors.desc = "This Field required";
            setErrors(errors)
            return false
        }
       
        else if (!applicable) {
            errors.applicable = "This Field required";
            setErrors(errors)
            return false
        }
       
        else if (!status) {
            errors.status = "This Field required";
            setErrors(errors)
            return false
        }
        else if (!services) {
            errors.services = "This Field required";
            setErrors(errors)
            return false
        }
        else if (!coupon_expiry) {
            errors.coupon_expiry = "This Field required";
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
        console.log('submitted')
        // const isValid = validate()
        // if (isValid) {
            setloading(true)
            let form = new FormData();
            form.append('coupon_code', coupon_code)
            form.append('coupon_desc', desc)
            form.append('percent_off', percent_off)
            form.append('applicable', applicable)
            form.append('coupon_expiry',coupon_expiry)
            form.append('services', services)
            form.append('status',status)
            form.append('coupon_id',coupon_id)
            await axios.post("https://shopninja.in/sunaar24/api2/public/index.php/add_coupon", form)
              .then((response) => {
                setloading(false)
                console.log(response, 'API addformDetails Post method successful')
                if (response.data.status === 200) {
                  setSuccessMsg(true)
                  setalertMsg({
                    type: 'success', title: "Product Added!", data: response.data.msg, onPress: () => {
                        setalertMsg(false)
                        setFormData({
                            coupon_code: "",
                            desc: "",
                            percent_off: "",
                            applicable: "",
                            coupon_expiry: "",
                            services: "",
                            coupon_id: '',
                        })
                    }
                })
                 
                }
            
            else setalertMsg({ type: 'error', title: "Can't add Coupon", data: response.data.msg, onPress: () => setalertMsg(false) })
        })
        .catch((error) => {
            setloading(false)
            console.log(error, 'error in post method with api add_banner')
            setalertMsg({ type: 'error', title: "Can't add coupon", data: error.message, onPress: () => setalertMsg(false) })
        })
        // }
    };


    useEffect(() => {

    }, []);

    // setalertMsg({
    //     type: 'success', title: "Product Added!", data: response.data.msg, onPress: () => {
    //         setalertMsg(false)
    //         setFormData({
    //             p_name: "",
    //             product_sku_no: "",

    //             quantity: "",
    //             desc: "",
    //             // price:"",
    //             // offerPrice:"",
    //             category: "",
    //             stockOut: "0",
    //             minQuantity: "",
    //             maxQuantity: "",
    //             status: '1',
    //             vendor_id:""
    //         })
    //     }
    // })




    return (
        <>
        {alertMsg ?
                <AlertMsg msg={alertMsg} /> : null
            }

            <CRow>
                <CCol xs="12" md="12">
                    <CCard>
                        <CCardHeader>
                            Add new coupon
                            {loading ? <CSpinner color="primary" size="sm" style={{ marginLeft: 10 }} /> : null}
                        </CCardHeader>
                        <CCardBody>


                            <CForm
                                encType="multipart/form-data"
                                className="form-horizontal"
                                onSubmit={(e) => handleSubmit(e)}>
                                <CCol lg="8" >
                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="text-input">Coupon_code</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput id="name"  type= "text" className={`${errors.name && 'help'}`} name="coupon_code"  value={coupon_code} onChange={e => onchange(e)} />
                                            {errors.coupon_code && (<p className="is-danger">{errors.coupon_code}</p>)}
                                        </CCol>
                                    </CRow>

                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="email-input">Percentageoff</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type="text" id="percentage" name="percentage" placeholder="Enter percentage" value={percent_off} onChange={e => onchange(e)} />
                                            {errors.percent_off && (<p className="is-danger">{errors.percent_off}</p>)}
                                        </CCol>
                                    </CRow>

                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="email-input">Coupon Desc</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type="text" id="Desc" name="desc" placeholder="Enter Desc." value={desc} onChange={e => onchange(e)} />
                                            {errors.desc && (<p className="is-danger">{errors.desc}</p>)}
                                        </CCol>
                                    </CRow>

                                    {/* <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="email-input">Percent Off</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type="text" id="percentage off" name="percentage off" placeholder="percent off" value={percentageoff} onChange={e => onchange(e)} />
                                            {errors.percentageoff && (<p className="is-danger">{errors.percentageoff}</p>)}
                                        </CCol>
                                    </CRow> */}

                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="email-input">Applicable</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type="text" id="applicable " name="applicable"  value={applicable} onChange={e => onchange(e)} />
                                            {errors.applicable && (<p className="is-danger">{errors.applicable}</p>)}
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="email-input">Status</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type="number" id="status" name="status" placeholder="Enter status" value={status} onChange={e => onchange(e)} />
                                            {errors.status && (<p className="is-danger">{errors.status}</p>)}
                                        </CCol>
                                    </CRow>
                        

                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="email-input">Services</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type="text" id="services " name="services"  value={services} onChange={e => onchange(e)} />
                                            {errors.services && (<p className="is-danger">{errors.services}</p>)}
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="email-input">Expire Date</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type="date" id="expDate" name="expDate" placeholder="Enter expire date" value={coupon_expiry} onChange={e => onchange(e)} />
                                            {errors.coupon_expiry && (<p className="is-danger">{errors.coupon_expiry}</p>)}
                                        </CCol>
                                    </CRow>

                                    {loading ? <CButton size="lg" color="primary" disabled>
                                    <CSpinner component="span" size="sm" aria-hidden="true" />
                                    Submit
                                </CButton> :
                                    <CButton type="submit" size="lg" color="primary"> Submit</CButton>
                                }
                                {/* <CButton type="submit" size="lg" color="primary"> Submit</CButton> */}
                                </CCol>
                            </CForm>
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

export default AddCoupon
