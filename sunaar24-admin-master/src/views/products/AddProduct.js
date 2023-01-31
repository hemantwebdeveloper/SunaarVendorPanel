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
    CSwitch,
    CFormTextarea,
    CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import axios from 'axios';

import '../../css/Style.css'
import { BaseUrl } from 'src/App';
import { AlertMsg } from 'src/components/Alerts';

const AddProducts = () => {
    const [errors, setErrors] = useState({});
    const [successMsg, setSuccessMsg] = useState(false);
    const [loading, setloading] = useState(false)

    const vendorid = sessionStorage.getItem('idtoken');

    const [formData, setFormData] = useState({
        p_name: "",
        product_sku_no: "",
        price: "",
        offerPrice: "",
        quantity: "",
        // shortDesc: "",
        desc: "",
        // image: "",
        category: "",
        stockOut: "0",
        minQuantity: "",
        maxQuantity: "",
        status: '1',
        vendor: '',
        desc:"",
        vendor_id:"",
        metal:""
    })
    const { p_name,product_sku_no, vendor,
        maxQuantity, minQuantity, quantity, status, stockOut,
        desc, category,vendor_id,price,offerPrice,metal} = formData

    const [data, setData] = useState()
    const [vendors, setvendors] = useState()
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

    const getVendors = async () => {
        setloading(true)
        await axios.post(BaseUrl + '/get_all_vendors')
            .then((response) => {
                setloading(false)
                console.log(response.data.msg, 'get_all_vendors api')
                if (response.data.status === 200) {
                    setvendors(response.data.msg)
                }
                else {
                    setalertMsg({ type: 'error', title: "No Data found!", data: response.data.msg, onPress: () => setalertMsg(false) })
                }
            })
            .catch((error) => {
                console.log(error, 'get_all_vendors api');
                setloading(false)
            });
    }


    useEffect(() => {
        getApiData()
        getVendors()
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
        if (!p_name) {
            errors.p_name = "This field is required";
            setErrors(errors)
            return false
        }
        else if (!price) {
            errors.price = "This field is required";
            setErrors(errors)
            return false
        }
        else if (!desc) {
            errors.desc = "This field is required"
            setErrors(errors)
            return false
        }
        else if (!vendor) {
            errors.vendor = "This field is required"
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
       
        const isValid = validate()
        if (isValid) {
            setloading(true)
            let form = new FormData();
            form.append('product_name', p_name);
            form.append('product_sku_no', product_sku_no);
            form.append('product_desc', desc);
            form.append('product_qty', quantity);
            form.append('regular_price', price);
            form.append('offer_price', offerPrice);
            form.append('out_of_stock', stockOut);
            form.append('product_min_qty', minQuantity);
            form.append('product_max_qty', maxQuantity);
            form.append('status', status);
            form.append('cat_id', category);
            form.append('metal', metal);
            form.append('vendor_id', vendor_id)
            
            await axios.post(BaseUrl + "/add_product", form)
                .then((response) => {
                    setloading(false)
                    console.log(response, 'API add_product Post method successful')
                    if (response.data.status === 200) {
                        setalertMsg({
                            type: 'success', title: "Product Added!", data: response.data.msg, onPress: () => {
                                setalertMsg(false)
                                setFormData({
                                    p_name: "",
                                    product_sku_no: "",
    
                                    quantity: "",
                                    desc: "",
                                    price:"",
                                    offerPrice:"",
                                    category: "",
                                    stockOut: "0",
                                    minQuantity: "",
                                    maxQuantity: "",
                                    status: '1',
                                    vendor_id:"",
                                    metal:""
                                })
                            }
                        })
                    }
                    else setalertMsg({ type: 'error', title: "Can't add product!", data: response.data.msg, onPress: () => setalertMsg(false) })
                })
                .catch((error) => {
                    setloading(false)
                    console.log(error, 'error in post method with api add_product')
                })
        }
    };


    const Loader = () => (
        <CSpinner color="primary" size="sm" />
    )


    return (
        <>
            {alertMsg ?
                <AlertMsg msg={alertMsg} /> : null
            }
            <CRow>
                <CCol xs="12" md="12">
                    <CCard>
                        <CCardHeader>
                            Add new product
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
                                            <CFormLabel htmlFor="text-input">Product name</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput id="name" className={`${errors.p_name && 'help'}`} name="p_name" placeholder="Name" value={p_name} onChange={e => onchange(e)} />
                                            {errors.p_name && (<p className="is-danger">{errors.p_name}</p>)}
                                        </CCol>
                                    </CRow>

                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="email-input">Product Sku</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type="text" id="product_sku_no" name="product_sku_no" placeholder="Product Sku" value={product_sku_no} onChange={e => onchange(e)} />
                                            {errors.product_sku_no && (<p className="is-danger">{errors.product_sku_no}</p>)}
                                        </CCol>
                                    </CRow>

                                    
                                   


                                    {/* <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="select">Carat</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormSelect name="category" id="selectcat" value={category} onChange={e => onchange(e)}>
                                                <option value="0">--Select Carat--</option>
                                                {data ? data.map((item, index) =>
                                                    <option value={item.cat_id} key={index}>{item.category_name}</option>
                                                ) : null}
                                            </CFormSelect>
                                            {errors.category && (<p className="is-danger">{errors.category}</p>)}
                                        </CCol>
                                    </CRow> */}

                                    {/* <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="select">Gender</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormSelect name="category" id="selectcat" value={category} onChange={e => onchange(e)}>
                                                <option value="0">--Select Gender--</option>
                                                {data ? data.map((item, index) =>
                                                    <option value={item.cat_id} key={index}>{item.category_name}</option>
                                                ) : null}
                                            </CFormSelect>
                                            {errors.category && (<p className="is-danger">{errors.category}</p>)}
                                        </CCol>
                                    </CRow>
                                     */}




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
                                            <CFormLabel htmlFor="email-input">Price</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type="number" id="price" name="price" placeholder="Price" value={price} onChange={e => onchange(e)} />
                                            {errors.price && (<p className="is-danger">{errors.price}</p>)}
                                        </CCol>
                                    </CRow> 

                                     <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="email-input">Offer Price</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type="number" id="offerPrice" name="offerPrice" placeholder="Offer Price" value={offerPrice} onChange={e => onchange(e)} />
                                            {errors.offerPrice && (<p className="is-danger">{errors.offerPrice}</p>)}
                                        </CCol>
                                    </CRow> 

                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="email-input">Quantity</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type="number" id="quantity" name="quantity" placeholder="Quantity" value={quantity} onChange={e => onchange(e)} />
                                            {errors.quantity && (<p className="is-danger">{errors.quantity}</p>)}
                                        </CCol>
                                    </CRow>

                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="email-input">Minimum Quantity</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type="number" id="minQuantity" name="minQuantity" placeholder="Minimum Quantity" value={minQuantity} onChange={e => onchange(e)} />
                                            {errors.minQuantity && (<p className="is-danger">{errors.minQuantity}</p>)}
                                        </CCol>
                                    </CRow>

                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="email-input">Maximum Quantity</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type="number" id="maxQuantity" name="maxQuantity" placeholder="Maximum Quantity" value={maxQuantity} onChange={e => onchange(e)} />
                                            {errors.maxQuantity && (<p className="is-danger">{errors.maxQuantity}</p>)}
                                        </CCol>
                                    </CRow>


                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="email-input">Description</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormTextarea type="text" id="desc" name="desc" placeholder="Long Description" value={desc} onChange={e => onchange(e)} />
                                            {errors.desc && (<p className="is-danger">{errors.desc}</p>)}
                                        </CCol>
                                    </CRow>

                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="select">Out of stock</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormSelect name="stockOut" id="selectcat" value={stockOut} onChange={e => onchange(e)}>
                                                <option value="0">False</option>
                                                <option value="1">True</option>
                                            </CFormSelect>
                                            {errors.stockOut && (<p className="is-danger">{errors.stockOut}</p>)}
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
                                            <CFormLabel htmlFor="email-input">Metal</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type="text" id="metal" name="metal" placeholder="metal" value={metal} onChange={e => onchange(e)} />
                                            {/* {errors.product_sku_no && (<p className="is-danger">{errors.product_sku_no}</p>)} */}
                                        </CCol>
                                    </CRow>

                                    <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="select">Vendor</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormSelect name="vendor" id="selectcat" value={vendor} onChange={e => onchange(e)}>
                                                <option value="0">--Select--</option>
                                                {vendors ? vendors.map((item, index) =>
                                                    <option value={item.vendor_id} key={index}>{item.vendor_name}</option>
                                                ) : null}
                                            </CFormSelect>
                                            {errors.vendor && (<p className="is-danger">{errors.vendor}</p>)}
                                        </CCol>
                                    </CRow>
                                    {/* <CRow className="mb-3">
                                        <CCol md="3">
                                            <CFormLabel htmlFor="email-input">Product Image</CFormLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CFormInput type="file" id="image" name="image" accept=".jpeg, .jpg, .png" onChange={e => onchange(e)} />
                                            {errors.image && (<p className="is-danger">{errors.image}</p>)}
                                        </CCol>
                                    </CRow> */}

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

export default AddProducts
