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
  CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

// import axios from 'axios';

import '../../css/Style.css'
// import { BaseUrl } from 'src/App';

const AddMember = () => {
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState('')

  const vendorid = sessionStorage.getItem('idtoken');

  const [staff, setStaff] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "order"
  })
  const { name, email, mobile, password, role } = staff

  const onchange = (e) => {
    setStaff(staff => ({ ...staff, [e.target.name]: e.target.value }))
    console.log(staff, '--staff members')
  };


  const validate = () => {
    let errors = {};
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
    if (!staff.name) {
      errors.name = "This Field required";
      setErrors(errors)
      return false
    }
    else if (!staff.email) {
      errors.email = "This Field required";
      setErrors(errors)
      return false
    }
    else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email address';
      setErrors(errors)
      return false
    }
    else if (!staff.mobile) {
      errors.mobile = "This Field required";
      setErrors(errors)
      return false
    }
    else if (!/^[0]?[789]\d{9}$/.test(mobile)) {
      errors.mobile = 'Invalid mobile no';
      setErrors(errors)
      return false
    }
    else if (!staff.password) {
      errors.password = "This Field required"
      setErrors(errors)
      return false
    }
    else if (!strongRegex.test(password)) {
      errors.password = 'Password must have at least 8 digits, 1 Capital letter, 1 small letter, 1 number and 1 special character.';
      setErrors(errors)
      return false
    }
    else if (!role) {
      errors.role = "This Field required"
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
      // form.append('staff_name', name)
      // form.append('staff_email', email)
      // form.append('staff_mobile', mobile)
      // form.append('staff_pass', password)
      // form.append('flag', role)
      // await axios.post(BaseUrl + "/addStaff", form)
      //   .then((response) => {
      //     console.log(response, 'API addStaff Post method successful')
      //     if (response.data.status === 200) {
      //       setSuccessMsg(true)
      //     }
      //     else {
      //       setErrorMsg(response.data.msg)
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error, 'error in post method with api addStaff')
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
              Add new Staff
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
                      <CFormLabel htmlFor="email-input">Password</CFormLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CFormInput type="text" id="password" name="password" placeholder="Enter Password" value={password} onChange={e => onchange(e)} />
                      {errors.password && (<p className="is-danger">{errors.password}</p>)}
                    </CCol>
                  </CRow>

                  <CRow className="mb-3">
                    <CCol md="3">
                      <CFormLabel htmlFor="select">Role</CFormLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CFormSelect name="role" id="selectcat" value={role} onChange={e => onchange(e)}>
                        <option value="order">Order fulfilment</option>
                        <option value="store">Store management</option>
                        <option value="support">Support</option>
                        <option value="inventory">Warehouse & inventory</option>
                      </CFormSelect>
                      {errors.role && (<p className="is-danger">{errors.role}</p>)}
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

export default AddMember;
