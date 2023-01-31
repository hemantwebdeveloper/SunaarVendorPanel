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

const ChangePassword = () => {
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState('')

  const vendorid = sessionStorage.getItem('idtoken');

  const [formDetails, setformDetails] = useState({
    confPassword: "",
    password: "",
  })
  const { confPassword, password, } = formDetails

  const onchange = (e) => {
    setformDetails(formDetails => ({ ...formDetails, [e.target.name]: e.target.value }))
    console.log(formDetails, '--formDetails members')
  };


  const validate = () => {
    let errors = {};
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
   
    if (!password) {
      errors.password = "This Field required"
      setErrors(errors)
      return false
    }
    else if (!strongRegex.test(password)) {
      errors.password = 'Password must have at least 8 digits, 1 Capital letter, 1 small letter, 1 number and 1 special character.';
      setErrors(errors)
      return false
    }
    else if (password !== confPassword) {
      errors.confPassword = "Password not matched."
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
              Change Password
            </CCardHeader>
            <CCardBody>


              <CForm
                encType="multipart/form-data"
                className="form-horizontal"
                onSubmit={(e) => handleSubmit(e)}>
                <CCol lg="8" >
                
                  <CRow className="mb-3">
                    <CCol md="3">
                      <CFormLabel htmlFor="email-input">Password</CFormLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CFormInput type="password" id="password" name="password" placeholder="Enter Password" value={password} onChange={e => onchange(e)} />
                      {errors.password && (<p className="is-danger">{errors.password}</p>)}
                    </CCol>
                  </CRow>

                  <CRow className="mb-3">
                    <CCol md="3">
                      <CFormLabel htmlFor="email-input">Confirm Password</CFormLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CFormInput type="password" id="password" name="confPassword" placeholder="Enter confirm password" value={confPassword} onChange={e => onchange(e)} />
                      {errors.confPassword && (<p className="is-danger">{errors.confPassword}</p>)}
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

export default ChangePassword;
