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
    CSpinner,
    CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import axios from 'axios';

import '../../css/Style.css'
import { BaseUrl } from 'src/App';
import { AlertMsg } from 'src/components/Alerts';

const AddCategory = () => {
    const [errors, setErrors] = useState({});
    const [successMsg, setSuccessMsg] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')
    const [loading, setloading] = useState(false)

    const vendorid = sessionStorage.getItem('idtoken');

    const [formData, setFormData] = useState({
        catName: "",
        status: "1",
        category: "0",
        image: ''
    })
    const { catName, status, category,image } = formData


    const [data, setData] = useState()
    const [alertMsg, setalertMsg] = useState(false);

    const getApiData = async () => {
        await axios.post(BaseUrl + '/get_all_category')
            .then((response) => {
                console.log(response.data.msg, 'get_all_category api')
                if (response.data.status === 200) {
                    setData(response.data.msg)
                }
                else {
                    setalertMsg({ type: 'error', title: "No Data found!", data: 'Category data not available.', onPress: () => setalertMsg(false) })
                }
            })
            .catch((error) => {
                console.log(error, 'get_all_category api');
            });
    }


    useEffect(() => {
        getApiData()
    }, [])



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
        if (!catName) {
            errors.catName = "This field is required";
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
            form.append('cat_name', catName);
            form.append('parent_cat_id', category);
            form.append('status', status);
            form.append('cat_img', image);
            await axios.post(BaseUrl + "/add_category", form)
                .then((response) => {
                    setloading(false)
                    console.log(response, 'API add_category Post method successful')
                    if (response.data.status === 200) {
                        setalertMsg({
                            type: 'success', title: "Category Added!", data: response.data.msg, onPress: () => {
                                setalertMsg(false)
                                setFormData({
                                    catName: "",
                                    status: "1",
                                    category: "0"
                                })
                            }
                        })
                    }
                    else setalertMsg({ type: 'error', title: "Can't add category", data: response.data.msg, onPress: () => setalertMsg(false) })
                })
                .catch((error) => {
                    setloading(false)
                    console.log(error, 'error in post method with api add_category')
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
                            Add new category
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
                                            <CFormLabel htmlFor="text-input">Category name</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput id="name" className={`${errors.catName && 'help'}`} name="catName" placeholder="Name" value={catName} onChange={e => onchange(e)} />
                                            {errors.catName && (<p className="is-danger">{errors.catName}</p>)}
                                        </CCol>
                                    </CRow>

                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="select">Category</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormSelect name="category" id="selectcat" value={category} onChange={e => onchange(e)}>
                                                <option value="0">--Select--</option>
                                                {data ? data.map((item, index) =>
                                                    <option value={item.cat_id} key={index}>{item.category_name}</option>
                                                ) : null}
                                            </CFormSelect>
                                            {errors.category && (<p className="is-danger">{errors.category}</p>)}
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
                                            <CFormLabel htmlFor="email-input">Image</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type="file" id="image" name="image" accept=".jpeg, .jpg, .png" onChange={e => onchange(e)} />
                                            {errors.image && (<p className="is-danger">{errors.image}</p>)}
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

export default AddCategory
