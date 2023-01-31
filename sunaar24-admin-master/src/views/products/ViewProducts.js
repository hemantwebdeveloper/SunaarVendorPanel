import React, { useState, useEffect } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableCaption,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CModal,
    CModalBody,
    CModalContent,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CModalDialog,
    CSpinner,
    CForm,
    CFormTextarea,
    CFormInput,
    CFormLabel,
    CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    cilArrowThickToTop,
} from '@coreui/icons'
// cil-arrow-thick-to-top
import axios from 'axios';

import '../../css/Style.css'
import { BaseUrl } from 'src/App';
import { AlertMsg } from 'src/components/Alerts';
import EditProduct from './EditProduct';

const ViewProducts = () => {

    // const[price,setpricevalue]=useState()



    const [data, setData] = useState()
    const [alertMsg, setalertMsg] = useState(false);
    const [loading, setloading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [visible3, setVisible3] = useState(false)
    const [refresh, setrefresh] = useState(false)
    const [selectedItem, setselectedItem] = useState(false)
    const [errors, setErrors] = useState({});
    const [gold, setGold] = useState()
    const [diamond, setDiamond] = useState()
    const [silver, setSilver] = useState()
    const [gst, setGst] = useState()
    const [state, setState] = useState()
    const [initialValue, setintialValue] = useState()
    const [makingcharge, setmakingCharge] = useState()
    const [total, settotalPrice] = useState()
    const [gold_1, setGold_1] = useState()
    const [diamond_1, setDiamond_1] = useState()
    const [silver_1, setSilver_1] = useState()
    const [gst_1, setGst_1] = useState()


    const [imageFormData, setimageFormData] = useState({
        images: "",
    })
    const { images } = imageFormData

    const maxFileSize = 1 * 1024 * 1024

    const handleChange = e => {
        let i
        if (e.target.files) {
            for (i = 0; i < e.target.files.length; i++) {
                if (e.target.files[i].size > maxFileSize) {
                    window.alert('File size is too big. File size must be less than 1 MB.')
                    setTimeout(() => window.location.reload(), 1500)
                }
            }
            if (e.target.files.length > 5) {
                window.alert('You can not upload more than 7 files.')
                setTimeout(() => window.location.reload(), 1500)
            }
            else {
                console.log(e.target.files);
                setimageFormData(imageFormData => ({
                    ...imageFormData,
                    images: e.target.files
                }));
            }
        }
    }


    const getApiData = async () => {
        await axios.post(BaseUrl + '/get_all_products')
            .then((response) => {
                console.log(response.data.msg, 'get_all_products api')
                if (response.data.status === 200) {
                    setData(response.data.msg)
                }
                else {
                    setData([])
                    setalertMsg({ type: 'error', title: "No Data found!", data: 'Product data not available.', onPress: () => setalertMsg(false) })
                }
            })
            .catch((error) => {
                console.log(error, 'get_all_products api');
            });
    }


    useEffect(() => {
        getApiData()
    }, [refresh,])


    const validate = () => {
        let errors = {};
        if (!images) {
            errors.images = "This field is required";
            setErrors(errors)
            return false
        }
        else {
            setErrors({})
            return true;
        }
    }

    const handleImageSubmit = async (e) => {
        e.preventDefault()
        console.log('submitted')
        const isValid = validate()
        if (isValid) {
            setloading(true)
            let form = new FormData();
            form.append('product_id', selectedItem?.product_id);
            for (let i = 0; i < images.length; i++) {
                form.append('files[]', images[i])
            }
            await axios.post(BaseUrl + "/add_product_imgs", form)
                .then((response) => {
                    setloading(false)
                    console.log(response, 'API add_product_imgs Post method successful')
                    if (response.data.status === 200) {
                        setalertMsg({
                            type: 'success', title: "Image Added!", data: response.data.msg, onPress: () => {
                                setalertMsg(false)
                                setimageFormData({
                                    images: "",
                                })
                                getApiData()
                            }
                        })
                    }
                    else setalertMsg({ type: 'error', title: "Can't add image", data: response.data.msg, onPress: () => setalertMsg(false) })
                })
                .catch((error) => {
                    setloading(false)
                    console.log(error, 'error in post method with api add_product_imgs')
                })
        }
    };

    const handleRefresh = () => setrefresh(!refresh)

    const deleteProduct = async (id) => {
        // if (window.confirm('Delete delete?')) {
            setloading(id)
            let form = new FormData()
            form.append('product_id',id)
            await axios.post(BaseUrl + '/delete_product', form)
                .then((response) => {
                    setloading(false)
                    console.log(response.data.msg, 'delete_product api')
                    if (response.data.status === 200) {
                        getApiData()
                        setalertMsg({
                            type: 'success', title: 'Deleted!', data: response.data.msg, onPress: () => {
                                
                            }
                        })
                    }
                    else {
                        setalertMsg({ type: 'error', title: 'Not Deleted!', data: response.data.msg, onPress: () => setalertMsg(false) })
                    }
                })
                .catch((error) => {
                    setloading(false)
                    console.log(error, 'delete_category api');
                });
        // }
    }

   

    const price = async () => {
        setloading(true)
        await axios.post(BaseUrl + '/get_all_category')
            .then((response) => {
                setloading(false)
                console.log(response.data.msg, 'get_all_category api')
                if (response.data.status === 200) {
                    setData(response.data.msg)
                }
                else {
                    setalertMsg({ type: 'error', title: "No Data found!", data: 'Category data not available.', onPress: () => setalertMsg(false) })
                }
            })
            .catch((error) => {
                setloading(false)
                console.log(error, 'get_all_category api');
            });
    }


    const [formData, setFormData] = useState({
       
        id: ''
        
   
    })
    const {id} = formData


    const handleSubmit = async (e) => {
        // console.log(selectedItem)
        e.preventDefault()
       
        
        setloading(true)
        let form = new FormData();
        form.append('gold_price', gold_price)
        // form.append('diamond_price', diamond_price)
        form.append('silver_price', silver_price)
        form.append('making_charge', MakingCharge)
        form.append('product_id', selectedItem)
        form.append('gst', gst_price)
        form.append('total', total_price)
        await axios.post(BaseUrl + "/save_product_price", form)
            .then((response) => {
                setloading(false)
                console.log(response.data, 'API save_price Post method successful')
                if (response.data.status === 200) {
                    setalertMsg({
                        type: 'success', title: "price Added!", data: response.data.msg, onPress: () => {
                            setalertMsg(false)
                            setFormData({
                                
                                id: "",
                               
                                
                            })

                        }
                    })
                }
                else setalertMsg({ type: 'error', title: "Can't add price", data: response.data.msg, onPress: () => setalertMsg(false) })
            })
            .catch((error) => {
                setloading(false)
                console.log(error, 'error in post method with api save_price')
            })

    };


 

    const getApiValue = async () => {
       
        await axios.post(BaseUrl + '/get_market_rates')
            .then((response) => {
                setloading(false)
                console.log(response.data, 'get_all_market_rates api')
                if (response.data.status === 200) {

                    setGold_1(response.data.gold)
                    
                    setSilver_1(response.data.silver)
                    setDiamond_1(response.data.diamond)
                    setGst_1(response.data.gst)
                }
                else {
                    setalertMsg({ type: 'error', title: "No Data found!", data: response.data.msg, onPress: () => setalertMsg(false) })
                }
            })
            .catch((error) => {
                console.log(error, 'get_all_market_rates api');
                setloading(false)
            });
    }
    useEffect(() => {
        getApiValue()
        console.log(gold_1)
        // handleSubmit()
    }, []);



    const handleGoldChange = (e) => {
        console.log('submitted')
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
    const handelMakingChargeChange=(e)=>{
        setmakingCharge(e.target.value)
    }
  


    const gold_price = gold * gold_1 || 0;

    const diamond_price = diamond * diamond_1 || 0;

    const silver_price = silver * silver_1 || 0;

    const MakingCharge = gold_price + diamond_price + silver_price || 0;

    const gst_price = MakingCharge * gst / 100 




    const total_price = MakingCharge + gst_price || 0

   


    return (
        <>
            {alertMsg ?
                <AlertMsg msg={alertMsg} /> : null
            }

            <CModal visible={visible} onClose={() => setVisible(false)}
                backdrop={'static'}
                keyboard={false}
                portal={false}
                scrollable>
                <CModalHeader>
                    <CModalTitle>Add Images</CModalTitle>
                </CModalHeader>
                {alertMsg ?
                    <CAlert color={alertMsg.type == 'success' ? 'success' : 'danger'}>
                        {alertMsg.data}
                    </CAlert>
                    : null}
                <CForm
                    encType="multipart/form-data"
                    className="form-horizontal"
                    onSubmit={(e) => handleImageSubmit(e)}>
                    <CModalBody>

                        <CRow className="mb-3">
                            <CCol md="3">
                                <CFormLabel htmlFor="email-input">Product Image</CFormLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CFormInput type="file" id="images" name="images" accept=".jpeg, .jpg, .png" multiple onChange={e => handleChange(e)} />
                                {errors.images && (<p className="is-danger">{errors.images}</p>)}
                            </CCol>
                        </CRow>

                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisible(false)}>
                            Close
                        </CButton>
                        {loading ? <CButton color="primary" disabled>
                            <CSpinner component="span" size="sm" aria-hidden="true" />
                            Submit
                        </CButton> :
                            <CButton type="submit" color="primary"> Submit</CButton>
                        }
                    </CModalFooter>
                </CForm>

            </CModal>

            <CRow>
                <CCol xs="12" md="12">
                    <CCard>
                        <CCardHeader>
                            View products
                            {loading ? <CSpinner color="primary" size="sm" style={{ marginLeft: 10 }} /> : null}
                        </CCardHeader>
                        <CCardBody>

                            <CTable align="middle" className="mb-0 border" hover responsive>
                                <CTableHead color="light">
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Offer Price</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Created At</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">price</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
                                        {/* <CTableHeaderCell scope="col">Size</CTableHeaderCell> */}
                                        <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {data ? data.map((item, index) =>
                                        <CTableRow key={index}>
                                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                            <CTableDataCell>{item.product_name}</CTableDataCell>
                                            <CTableDataCell>{item.product_price}</CTableDataCell>
                                            <CTableDataCell>{item.product_offer_price}</CTableDataCell>
                                            <CTableDataCell>{item.product_status == 1 ? 'Active' : 'Inactive'}</CTableDataCell>
                                            <CTableDataCell>
                                                {item.images ? item.images.map((image, idx) =>
                                                    <img src={image} key={idx} alt='idx' style={{ height: 50, width: 50, objectFit: 'contain', margin: 1 }} />
                                                ) : null}
                                                <CIcon icon={cilArrowThickToTop} onClick={() => {
                                                    setselectedItem(item)
                                                    setVisible(true)
                                                }} style={{ cursor: 'pointer', color: '#321fdb', textAlign: 'center' }} />
                                            </CTableDataCell>





                                            <CTableDataCell>{item.created_at}</CTableDataCell>

                                            <CTableDataCell><CButton size="sm" color='primary'
                                                onClick={() => {
                                                    setselectedItem(item.product_id)
                                                    setVisible3(true)
                                                }}>Price</CButton></CTableDataCell>

                                            <CTableDataCell><CButton size="sm" color='info'
                                                onClick={() => {
                                                    setselectedItem(item)
                                                    setVisible2(true)
                                                }}>Edit</CButton></CTableDataCell>

                                                {/* <CTableDataCell><CButton size="sm" color='info'
                                              
                                                    >Size</CButton></CTableDataCell> */}


                                            <CTableDataCell>
                                                {loading === item.product_id ? <CButton size="sm" color='danger'>
                                                    <CSpinner component="span" size="sm" aria-hidden="true" />
                                                    Deleting
                                                </CButton> :
                                                    <CButton size="sm" color='danger'
                                                        onClick={() => deleteProduct(item.product_id)}>Delete</CButton>
                                                }
                                            </CTableDataCell>
                                        </CTableRow>
                                    ) : null}
                                </CTableBody>
                            </CTable>

                        </CCardBody>
                        <CCardFooter>
                        </CCardFooter>
                    </CCard>

                </CCol>
            </CRow>


            {/* edit product */}

            <CModal visible={visible2} onClose={() => setVisible2(false)}
                backdrop={'static'}
                keyboard={false}
                portal={false}
                scrollable>
                <CModalHeader>
                    <CModalTitle>Edit {selectedItem.product_name}</CModalTitle>
                </CModalHeader>

                <EditProduct item={selectedItem} visible={visible2} setVisible={setVisible2} setRefresh={handleRefresh} />

            </CModal>

            {/* price */}
            <CModal visible={visible3} onClose={() => setVisible3(false)}
                backdrop={'static'}
                keyboard={false}
                portal={false}
                scrollable>
                <CModalHeader>
                    <CModalTitle>Wieght Price</CModalTitle>
                </CModalHeader>

                <CForm
                    encType="multipart/form-data"
                    className="form-horizontal"
                    onSubmit={(e) => handleSubmit(e)}>
                    <CModalBody>

                        <CRow className="mb-3">
                            <CCol md="2">
                                <CFormLabel htmlFor="email-input">Gold</CFormLabel>
                            </CCol>
                            <CCol xs="12" md="7">
                                <CFormInput type="text" placeholder='weight in gm' value={gold} onChange={handleGoldChange} />

                            </CCol>
                            <CCol xs="12" md="3">
                               
                                <span style={{ paddingLeft: "30px" }}>Rs.{gold_price}</span>



                            </CCol>
                        </CRow>

                        {/* <CRow className="mb-3">
                            <CCol md="2">
                                <CFormLabel htmlFor="email-input">Diamond</CFormLabel>
                            </CCol>
                            <CCol xs="12" md="7">
                                <CFormInput type="text" placeholder='weight in gm' value={diamond} onChange={handleDiamondChange} />

                            </CCol>
                            <CCol xs="12" md="3">

                                <span style={{ paddingLeft: "30px" }}>Rs.{diamond_price}</span>

                            </CCol>
                        </CRow> */}

                        <CRow className="mb-3">
                            <CCol md="2">
                                <CFormLabel htmlFor="email-input">Silver</CFormLabel>
                            </CCol>
                            <CCol xs="12" md="7">
                                <CFormInput type="text" placeholder='weight in gm' value={silver} onChange={handlSilverChange} />

                            </CCol>
                            <CCol xs="12" md="3">
                                {/* <CFormInput type="text" /> */}
                                <span style={{ paddingLeft: "30px" }}>Rs.{silver_price}</span>

                            </CCol>
                        </CRow>

                        <CRow className="mb-3">
                            <CCol md="2">
                                <CFormLabel htmlFor="email-input">Making Charge</CFormLabel>
                            </CCol>
                            <CCol xs="12" md="7">
                               

                                <CFormInput type="text" className='hidden'  placeholder={MakingCharge} onChange={handelMakingChargeChange}/>
                              
                            </CCol>
                            <CCol xs="12" md="3">
                               
                                <span style={{ paddingLeft: "30px" }}>Rs. {makingcharge}</span>

                            </CCol>
                        </CRow>

                        <CRow className="mb-3">
                            <CCol md="2">
                                <CFormLabel htmlFor="email-input">GST</CFormLabel>
                            </CCol>
                            <CCol xs="12" md="7">

                               
                                <CFormInput type="text" placeholder='gst in %' onChange={handleGstChange}  />

                            </CCol>
                            <CCol xs="12" md="3">
                               
                            <span style={{ paddingLeft: "30px" ,display:"none"}} >Rs. {gst_price}</span>

                            </CCol>
                        </CRow>

                        <CRow className="mb-3">
                            <CCol md="2">
                                <CFormLabel htmlFor="email-input">Total</CFormLabel>
                            </CCol>
                            <CCol xs="12" md="7">
                                <div className='border' style={{ padding: "8px 8px" }} >
                                    <span>Rs.{total_price}/-</span>
                                </div>

                            </CCol>
                            <CCol xs="12" md="3">
                           
                                <span style={{ paddingLeft: "30px" }}></span>

                            </CCol>
                        </CRow>

                    </CModalBody>

                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisible3(false)}>
                            Close
                        </CButton>
                        {/* {loading ? <CButton color="primary" disabled>
                            <CSpinner component="span" size="sm" aria-hidden="true" />
                            Submit
                        </CButton> :
                            <CButton type="submit" color="primary"> Submit</CButton>
                        } */}
                        {loading ? <CButton size="lg" color="primary" disabled>
                                    <CSpinner component="span" size="sm" aria-hidden="true" />
                                    Submit
                                </CButton> :
                                    <CButton type="submit" size="lg" color="primary"> Submit</CButton>
                                }
                    </CModalFooter>

                </CForm>

              

            </CModal>



            <br></br>
            <br></br>
            <br></br>
        </>
    )

}

export default ViewProducts
