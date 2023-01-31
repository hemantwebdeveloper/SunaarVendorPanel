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
    CInput,
    CInputFile,
    CInputCheckbox,
    CInputRadio,
    CInputGroup,
    CInputGroupAppend,
    CInputGroupPrepend,
    CDropdown,
    CInputGroupText,
    CLabel,
    CSelect,
    CRow,
    CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { DocsLink } from 'src/reusable'

import axios from 'axios';
import { Animated } from "react-animated-css";
import '../../css/Style.css'
import { BaseUrl, BaseUrl2 } from 'src/App';

const getBadge = status => {
    switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
        default: return 'primary'
    }
}

// list category
const EditMember = ({edit,setEdit,member}) => {
    const vendorid = sessionStorage.getItem('idtoken');
    const [successMsg, setSuccessMsg] = useState(false)
    const [errors, setErrors] = useState({});
    const [staff, setStaff] = useState({
        name: member.staff_name,
        email: member.staff_email,
        mobile: member.staff_mobile,
        password: member.staff_pass,
        role: member.flag

    });
    const { name, email, mobile, password, role } = staff;

    console.log(staff)

    const onchange = (e) => {
        setStaff(staff => ({ ...staff, [e.target.name]: e.target.value }))
        console.log(staff, '--staff members')
    };


    const validate = (staff) => {
        let errors = {};
        if (!staff.name) {
            errors.name = "This Field required";
            return errors;
        }
        if (!staff.email) {
            errors.email = "This Field required";
            return errors;
        }

        if (!staff.password) {
            errors.password = "This Field required";
            return errors;
        }

        if (!staff.mobile) {
            errors.mobile = "This Field required";
            return errors;
        }
        if (!role) {
            errors.role = "This Field required";
            return errors;
        }

        return true;

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(validate(staff));
        if (validate(staff) == true) {

            let form = new FormData();
            form.append('vendor_id', vendorid)
            form.append('id', edit)
            form.append('staff_name', name)
            form.append('staff_email', email)
            form.append('staff_mobile', mobile)
            form.append('staff_pass', password)
            form.append('flag', role)
            await axios.post(BaseUrl2 + "/editStaff", form)
                .then((response) => {
                    console.log(response, 'API addStaff Post method successful')
                    setSuccessMsg(true)
                })
                .catch((error) => {
                    console.log(error, 'error in post method with api addStaff')
                })
        }
    };

    function Alertsuccess() {
        return (
            successMsg === true ?
                setTimeout(
                    () => {
                        window.location.reload()
                    },
                    3500
                ) &&
                < Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true} animationInDuration={1100} >
                    <div className='successMsgContainer'>
                        <span class="material-icons msgSuccessSign">
                            check_circle
                        </span>
                        <span className='successMsg'>Member Updated Successfully!</span>
                        <span class="material-icons clearMsg" onClick={() => {
                            window.location.reload()
                            setSuccessMsg(false)
                        }}>
                            clear
                        </span>
                    </div>
                </Animated >
                : null
        )
    }

    return (
        <>
            <CRow style={{ width: '100%', }}>
                <CCol xs="12" lg="12" style={{ width: '100%' }}>
                    <CCard>
                        <div className='closePopUp' onClick={() => setEdit('')}>X</div>
                        <CCardHeader>
                            Update Staff
                        </CCardHeader>
                        <CCardBody>


                            <CForm encType="multipart/form-data" className="form-horizontal" onSubmit={e => handleSubmit(e)}>

                                <CCol lg="8" >
                                    <Alertsuccess />
                                    <CFormGroup row>
                                    </CFormGroup>
                                    <CFormGroup row>
                                        <CCol md="3">
                                            <CLabel htmlFor="text-input">Name</CLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CInput id="name" className={`${errors.name && 'help'}`} name="name" placeholder='Name' value={name} onChange={e => onchange(e)} />
                                            {errors.name && (<p className="is-danger">{errors.name}</p>)}
                                        </CCol>
                                    </CFormGroup>



                                    <CFormGroup row>
                                        <CCol md="3">
                                            <CLabel htmlFor="email-input">Email Id</CLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CInput type="email" className={`${errors.email && 'help'}`} id="email" name="email" placeholder="email" value={email} onChange={e => onchange(e)} />
                                            {errors.short_desc && (<p className="is-danger">{errors.email}</p>)}
                                            <CFormText className="help-block">Please enter email id</CFormText>
                                        </CCol>
                                    </CFormGroup>




                                    <CFormGroup row>
                                        <CCol md="3">
                                            <CLabel htmlFor="email-input">Mobile</CLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CInput type="text" id="mobile" name="mobile" placeholder="mobile" value={mobile} onChange={e => onchange(e)} />
                                            {errors.mobile && (<p className="is-danger">{errors.mobile}</p>)}
                                            <CFormText className="help-block">Please enter mobile number</CFormText>
                                        </CCol>
                                    </CFormGroup>

                                    <CFormGroup row>
                                        <CCol md="3">
                                            <CLabel htmlFor="email-input">Password</CLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CInput type="text" id="password" name="password" placeholder="password" value={password} onChange={e => onchange(e)} />
                                            {errors.password && (<p className="is-danger">{errors.password}</p>)}
                                            <CFormText className="help-block">Please enter Password</CFormText>
                                        </CCol>
                                    </CFormGroup>

                                    <CFormGroup row>
                                        <CCol md="3">
                                            <CLabel htmlFor="select">Role</CLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CSelect name="role" id="selectcat" value={role} onChange={e => onchange(e)}>
                                                <option>None</option>
                                                <option>Order management</option>
                                                <option>Store management</option>
                                                <option>Sales & payment</option>
                                                <option>Warehouse & inventory</option>
                                            </CSelect>
                                            {errors.role && (<p className="is-danger">{errors.role}</p>)}
                                        </CCol>
                                    </CFormGroup>

                                </CCol>
                                <CCardFooter>
                                    <CButton type="submit" size="lg" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>

                                </CCardFooter>

                            </CForm>
                        </CCardBody>
                        <br></br>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default EditMember
