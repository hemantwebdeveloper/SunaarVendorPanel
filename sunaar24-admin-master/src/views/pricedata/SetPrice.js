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
    const [gold, setGold] = useState()
    const [diamond, setDiamond] = useState()
    const [silver, setSilver] = useState()
    const [gst, setGst] = useState()

    const vendorid = sessionStorage.getItem('idtoken');

    const [formDetails, setformDetails] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
    })
    // const { name, email, mobile, password } = formDetails

    // const onchange = (e) => {
    //     setformDetails(formDetails => ({ ...formDetails, [e.target.name]: e.target.value }))
    //     console.log(formDetails, '--formDetails members')
    // };


    const validate = () => {
        let errors = {};
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
        if (!gold) {
            errors.gold = "This Field required";
            setErrors(errors)
            return false
        }
        // else if (!diamond) {
        //     errors.diamond = "This Field required";
        //     setErrors(errors)
        //     return false
        // }
      
        else if (!silver) {
            errors.silver = "This Field required";
            setErrors(errors)
            return false
        }
        
        else if (!gst) {
            errors.password = "This Field required"
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
            
            form.append('gold_price', gold)
            form.append('diamond_price', diamond)
            form.append('silver_price', silver)
            form.append('gst', gst)
            await axios.post(BaseUrl + "/set_market_rates", form)
                .then((response) => {
                    setloading(false)
                    console.log(response.data, 'API set_register Post method successful')
                    if (response.data.status === 200) {
                        setalertMsg({
                            type: 'success', title: "Set Added!", data: response.data.msg, onPress: () => {
                                console.log(response.data)
                                console.log(gold)
                            }
                        })
                    }
                    else setalertMsg({ type: 'error', title: "Can't add vendor", data: response.data.msg, onPress: () => setalertMsg(false) })
                })
                .catch((error) => {
                    setloading(false)
                    console.log(error, 'error in post method with api set_register')
                })
        }
    };


    useEffect(() => {

    }, []);

    const handleGoldChange = (e) => {
        setGold(e.target.value)
    }

    const handleDiamondChange = (e) => {
        setDiamond(e.target.value)
    }
    const handlSilverChange = (e) => {
        setSilver(e.target.value)
    }
    const handleGstChange = (e) => {
        setGst(e.target.value)
    }




    return (
        <>
            {alertMsg ?
                <AlertMsg msg={alertMsg} /> : null
            }
            <CRow>
                <CCol xs="12" md="12">
                    <CCard>
                        <CCardHeader>
                          Set Price
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
                                            <CFormLabel htmlFor="text-input">Gold</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput id="name" className={`${errors.gold && 'help'}`} name="gold" placeholder="Enter price" value={gold} onChange={handleGoldChange} />
                                            {errors.gold && (<p className="is-danger">{errors.gold}</p>)}
                                        </CCol>
                                    </CRow>

                                    {/* <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="email-input">Diamond</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type="text" className={`${errors.diamond && 'help'}`} id="email" name="diamond" placeholder="Enter price" value={diamond}  onChange={handleDiamondChange}/>
                                            {errors.diamond && (<p className="is-danger">{errors.diamond}</p>)}
                                        </CCol>
                                    </CRow> */}

                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="email-input">Silver</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type="number" id="silver" name="silver" placeholder="Enter price" value={silver} onChange={handlSilverChange}/>
                                            {errors.silver && (<p className="is-danger">{errors.silver}</p>)}
                                        </CCol>
                                    </CRow>

                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="email-input">GST</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type="text" id="gst" name="gst" placeholder="Enter price" value={gst} onChange={handleGstChange}/>
                                            {errors.gst && (<p className="is-danger">{errors.gst}</p>)}
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
