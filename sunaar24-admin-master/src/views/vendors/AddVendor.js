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

    const vendorid = sessionStorage.getItem('idtoken');

    const [formDetails, setformDetails] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
    })
    const { name, email, mobile, password } = formDetails

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
        else if (!/^[0]?[789]\d{9}$/.test(mobile)) {
            errors.mobile = 'Invalid mobile no';
            setErrors(errors)
            return false
        }
        else if (!formDetails.password) {
            errors.password = "This Field required"
            setErrors(errors)
            return false
        }
        else if (!strongRegex.test(password)) {
            errors.password = 'Password must have at least 8 digits, 1 Capital letter, 1 small letter, 1 number and 1 special character.';
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
            setloading(true)
            let form = new FormData();
            form.append('vendor_id', vendorid)
            form.append('name', name)
            form.append('email', email)
            form.append('mobile', mobile)
            form.append('password', password)
            await axios.post(BaseUrl + "/vendor_register", form)
                .then((response) => {
                    setloading(false)
                    console.log(response.data, 'API vendor_register Post method successful')
                    if (response.data.status === 200) {
                        setalertMsg({
                            type: 'success', title: "Vendor Added!", data: response.data.msg, onPress: () => {
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
                    else setalertMsg({ type: 'error', title: "Can't add vendor", data: response.data.msg, onPress: () => setalertMsg(false) })
                })
                .catch((error) => {
                    setloading(false)
                    console.log(error, 'error in post method with api vendor_register')
                })
        }
    };


    useEffect(() => {

    }, []);




console.log(name,email,mobile,password,"nemp")
    return (
        <>
            {alertMsg ?
                <AlertMsg msg={alertMsg} /> : null
            }
            <CRow>
                <CCol xs="12" md="12">
                    <CCard>
                        <CCardHeader>
                            Add new vendor
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

export default AddVendor;
