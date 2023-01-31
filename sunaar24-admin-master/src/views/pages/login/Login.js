import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import '../../../css/Style.css'
import axios from 'axios'
import { BaseUrl } from 'src/App'
import { AlertMsg } from 'src/components/Alerts'


const Login = () => {

  const navigate = useNavigate()

  const [errors, setErrors] = useState({});
  const [alertMsg, setalertMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState('')

  const [formData, setFormData] = useState({
    email: "", password: ""
  })

  const { email, password } = formData

  const handleChange = (e) => {
    setFormData(formData => ({ ...formData, [e.target.name]: e.target.value }))
    console.log(formData, 'form data')
  };


  const validate = () => {
    let errors = {};
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
    if (!email) {
      errors.email = "This Field required";
      setErrors(errors)
      return false
    }
    else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email address';
      setErrors(errors)
      return false
    }
    else if (!password) {
      errors.password = "This Field required"
      setErrors(errors)
      return false
    }
    // else if (!strongRegex.test(password)) {
    //   errors.password = 'Password must have at least 8 digits, 1 Capital letter, 1 small letter, 1 number and 1 special character.';
    //   setErrors(errors)
    //   return false
    // }
    else {
      setErrors({})
      return true;
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    if (isValid) {

      var data = new FormData();
      data.append('email', email);
      data.append('password', password);
      data.append('device_id', 'uwejrnwejwnerj2nj234');
      await axios.post(BaseUrl + '/admin_login', data, {
        headers: { "Content-type": "multipart/form-data" }
      })
        .then((response) => {
          console.log(response.data, 'admin_login api')
          if (response.data.status === 200) {
            // setalertMsg({
            //   type: 'success', title: "Login Success!", data: 'You are logged in successfully!', onPress: () => {
            //     setalertMsg(false)
            //     // navigate('/dashboard')
            //   }
            // })
            sessionStorage.setItem("idtoken", response.data.msg.id);
            navigate('/dashboard')
          }
          else {
            setalertMsg({ type: 'error', title: "Can't login!", data: response.data.msg, onPress: () => setalertMsg(false) })
          }
        })
        .catch((error) => {
          console.log(error, 'admin_login api');
        });

    }
  }

  return (
    <>
      {alertMsg ?
        <AlertMsg msg={alertMsg} /> : null
      }
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={8}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm onSubmit={(e) => handleSubmit(e)}>
                      <h1>Login</h1>
                      <p className="text-medium-emphasis">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput placeholder="Username" autoComplete="username" name='email' value={email} onChange={(e) => handleChange(e)} />
                      </CInputGroup>
                      {errors.email && (<p className="is-danger">{errors.email}</p>)}
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          name='password' value={password} onChange={(e) => handleChange(e)}
                        />
                      </CInputGroup>
                      {errors.password && (<p className="is-danger">{errors.password}</p>)}
                      <CRow>
                        <CCol xs={6}>
                          <CButton type='submit' color="primary" className="px-4">
                            Login
                          </CButton>
                        </CCol>
                        <CCol xs={6} className="text-right">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                      <Link to="/register">
                        <CButton color="primary" className="mt-3" active tabIndex={-1}>
                          Register Now!
                        </CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard> */}
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}

export default Login
