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

import '../../css/Style.css'
// import { BaseUrl } from 'src/App';

const CreateInvoice = () => {
    const [errors, setErrors] = useState({});
    const [successMsg, setSuccessMsg] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')

    const vendorid = sessionStorage.getItem('idtoken');

    const [formDetails, setFormDetails] = useState({
        fromName: "",
        fromemail: "",
        frommobile: "",
        fromcity: "",
        frompincode: "",
        toName: "",
        toemail: "",
        tomobile: "",
        tocity: "",
        topincode: "",
        itemName: "",
        itemQuantity: "",
        itemPrice: "",
        taxApplicable: "",
        remarks: ""
    })
    const {
        fromName, fromemail, frommobile, fromcity, frompincode, toName, toemail, tomobile, tocity, topincode,
        itemName, itemQuantity, itemPrice, taxApplicable, remarks } = formDetails

    const onchange = (e) => {
        setFormDetails(formDetails => ({ ...formDetails, [e.target.name]: e.target.value }))
        // console.log(formDetails, '--formDetails members')
    };


    const validate = () => {
        let errors = {};
        if (!fromName) {
            errors.fromName = "This Field required";
            setErrors(errors)
            return false
        }
        else if (!fromemail) {
            errors.fromemail = "This Field required";
            setErrors(errors)
            return false
        }
        else if (!/\S+@\S+\.\S+/.test(fromemail)) {
            errors.fromemail = 'Invalid email address';
            setErrors(errors)
            return false
        }
        else if (!frommobile) {
            errors.frommobile = "This Field required";
            setErrors(errors)
            return false
        }
        else if (!/^[0]?[789]\d{9}$/.test(frommobile)) {
            errors.frommobile = 'Invalid mobile no';
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

    }, []);





    return (
        <>

            <CRow>
                <CCol xs="12" md="12">
                    <CCard>
                        <CCardHeader>
                            Add new customer
                        </CCardHeader>
                        <CCardBody>


                            <CForm
                                encType="multipart/form-data"
                                className="form-horizontal"
                                onSubmit={(e) => handleSubmit(e)}>
                                <CCol lg="8" >
                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="text-input">Item Name</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type='text' id="name" className={`${errors.itemName && 'help'}`} name="itemName" placeholder="Name" value={itemName} onChange={e => onchange(e)} />
                                            {errors.itemName && (<p className="is-danger">{errors.itemName}</p>)}
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="text-input">Item Quantity</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type='number' id="itemQuantity" className={`${errors.itemQuantity && 'help'}`} name="itemQuantity" placeholder="Quantity" value={itemQuantity} onChange={e => onchange(e)} />
                                            {errors.itemQuantity && (<p className="is-danger">{errors.itemQuantity}</p>)}
                                        </CCol>
                                    </CRow>

                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="text-input">Item Price</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type='number' id="itemPrice" className={`${errors.itemPrice && 'help'}`} name="itemPrice" placeholder="Price" value={itemPrice} onChange={e => onchange(e)} />
                                            {errors.itemPrice && (<p className="is-danger">{errors.itemPrice}</p>)}
                                        </CCol>
                                    </CRow>

                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="text-input">Applicable Tax</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type='number' id="taxApplicable" className={`${errors.taxApplicable && 'help'}`} name="taxApplicable" placeholder="Applicable Tax" value={taxApplicable} onChange={e => onchange(e)} />
                                            {errors.taxApplicable && (<p className="is-danger">{errors.taxApplicable}</p>)}
                                        </CCol>
                                    </CRow>

                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="text-input">Remarks</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type='text' id="name" className={`${errors.remarks && 'help'}`} name="remarks" placeholder="Remarks" value={remarks} onChange={e => onchange(e)} />
                                            {errors.remarks && (<p className="is-danger">{errors.remarks}</p>)}
                                        </CCol>
                                    </CRow>

                                    <h5 style={{margin:'20px 0px'}}>From</h5>
                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="text-input">Name</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput id="name" className={`${errors.fromName && 'help'}`} name="fromName" placeholder="Name" value={fromName} onChange={e => onchange(e)} />
                                            {errors.fromName && (<p className="is-danger">{errors.fromName}</p>)}
                                        </CCol>
                                    </CRow>

                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="email-input">Email Id</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type="email" className={`${errors.fromemail && 'help'}`} id="fromemail" name="fromemail" placeholder="Email" value={fromemail} onChange={e => onchange(e)} />
                                            {errors.fromemail && (<p className="is-danger">{errors.fromemail}</p>)}
                                        </CCol>
                                    </CRow>

                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="email-input">Mobile</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type="number" id="frommobile" name="frommobile" placeholder="Mobile Number" value={frommobile} onChange={e => onchange(e)} />
                                            {errors.frommobile && (<p className="is-danger">{errors.frommobile}</p>)}
                                        </CCol>
                                    </CRow>

                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="email-input">City</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type="text" id="fromcity" name="fromcity" placeholder="Enter city" value={fromcity} onChange={e => onchange(e)} />
                                            {errors.fromcity && (<p className="is-danger">{errors.fromcity}</p>)}
                                        </CCol>
                                    </CRow>

                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="email-input">Pincode</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type="text" id="frompincode" name="frompincode" placeholder="Enter pincode" value={frompincode} onChange={e => onchange(e)} />
                                            {errors.frompincode && (<p className="is-danger">{errors.frompincode}</p>)}
                                        </CCol>
                                    </CRow>

                                    <h5 style={{margin:'20px 0px'}}>To</h5>
                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="text-input">Name</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput id="name" className={`${errors.toName && 'help'}`} name="toName" placeholder="Name" value={toName} onChange={e => onchange(e)} />
                                            {errors.toName && (<p className="is-danger">{errors.toName}</p>)}
                                        </CCol>
                                    </CRow>

                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="email-input">Email Id</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type="email" className={`${errors.toemail && 'help'}`} id="toemail" name="toemail" placeholder="Email" value={toemail} onChange={e => onchange(e)} />
                                            {errors.toemail && (<p className="is-danger">{errors.toemail}</p>)}
                                        </CCol>
                                    </CRow>

                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="email-input">Mobile</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type="number" id="tomobile" name="tomobile" placeholder="Mobile Number" value={tomobile} onChange={e => onchange(e)} />
                                            {errors.tomobile && (<p className="is-danger">{errors.tomobile}</p>)}
                                        </CCol>
                                    </CRow>

                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="email-input">City</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type="text" id="tocity" name="tocity" placeholder="Enter city" value={tocity} onChange={e => onchange(e)} />
                                            {errors.tocity && (<p className="is-danger">{errors.tocity}</p>)}
                                        </CCol>
                                    </CRow>

                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="email-input">Pincode</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type="text" id="topincode" name="topincode" placeholder="Enter pincode" value={topincode} onChange={e => onchange(e)} />
                                            {errors.topincode && (<p className="is-danger">{errors.topincode}</p>)}
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

export default CreateInvoice
