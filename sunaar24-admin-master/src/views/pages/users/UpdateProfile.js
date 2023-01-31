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
    CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

// import axios from 'axios';

import '../../../css/Style.css'
// import { BaseUrl } from 'src/App';

const UpdateProfile = () => {
    const [errors, setErrors] = useState({});
    const [successMsg, setSuccessMsg] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')

    const vendorid = sessionStorage.getItem('idtoken');

    const [formDetails, setFormDetails] = useState({
        name: "",
        email: "",
        mobile: "",
        city: "",
        pincode: "",
    })
    const { name, email, mobile, city, pincode } = formDetails

    const onchange = (e) => {
        setFormDetails(formDetails => ({ ...formDetails, [e.target.name]: e.target.value }))
        console.log(formDetails, '--formDetails members')
    };


    const validate = () => {
        let errors = {};
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
        else if (!/^[0]?[789]\d{9}$/.test(mobile)) {
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
        e.preventDefault()
        console.log('submitted')
        const isValid = validate()
        if (isValid) {

            // let form = new FormData();
            // form.append('vendor_id', vendorid)
            // form.append('formDetails_name', name)
            // form.append('formDetails_email', email)
            // form.append('formDetails_mobile', mobile)
            // form.append('formDetails_pass', password)
            // form.append('flag', role)
            // await axios.post(BaseUrl + "/addformDetails", form)
            //   .then((response) => {
            //     console.log(response, 'API addformDetails Post method successful')
            //     if (response.data.status === 200) {
            //       setSuccessMsg(true)
            //     }
            //     else {
            //       setErrorMsg(response.data.msg)
            //     }
            //   })
            //   .catch((error) => {
            //     console.log(error, 'error in post method with api addformDetails')
            //   })
        }
    };


    useEffect(() => {

    }, [])


    return (
        <>

            <CRow>
                <CCol xs="12" md="12">
                    <CCard>
                        <CCardHeader>
                            Profile
                        </CCardHeader>
                        <CCardBody>


                            <CForm
                                encType="multipart/form-data"
                                className="form-horizontal"
                                onSubmit={(e) => handleSubmit(e)}>
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
                                            <CFormLabel htmlFor="email-input">city</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type="text" id="city" name="city" placeholder="Enter city" value={city} onChange={e => onchange(e)} />
                                            {errors.city && (<p className="is-danger">{errors.city}</p>)}
                                        </CCol>
                                    </CRow>

                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="email-input">Pincode</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type="text" id="pincode" name="pincode" placeholder="Enter pincode" value={pincode} onChange={e => onchange(e)} />
                                            {errors.pincode && (<p className="is-danger">{errors.pincode}</p>)}
                                        </CCol>
                                    </CRow>

                                    <CButton type="submit" size="lg" color="primary"> Submit</CButton>

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

export default UpdateProfile
