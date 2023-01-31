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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

// import axios from 'axios';

import '../../css/Style.css'
// import { BaseUrl } from 'src/App';

const ViewMembers = () => {


    return (
        <>

            <CRow>
                <CCol xs="12" md="12">
                    <CCard>
                        <CCardHeader>
                            View Staff
                        </CCardHeader>
                        <CCardBody>

                            <CTable hover>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Class</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    <CTableRow>
                                        <CTableHeaderCell scope="row">1</CTableHeaderCell>
                                        <CTableDataCell>Mark</CTableDataCell>
                                        <CTableDataCell>Otto</CTableDataCell>
                                        <CTableDataCell>@mdo</CTableDataCell>
                                    </CTableRow>
                                    <CTableRow>
                                        <CTableHeaderCell scope="row">2</CTableHeaderCell>
                                        <CTableDataCell>Jacob</CTableDataCell>
                                        <CTableDataCell>Thornton</CTableDataCell>
                                        <CTableDataCell>@fat</CTableDataCell>
                                    </CTableRow>
                                    <CTableRow>
                                        <CTableHeaderCell scope="row">3</CTableHeaderCell>
                                        <CTableDataCell colSpan="2">Larry the Bird</CTableDataCell>
                                        <CTableDataCell>@twitter</CTableDataCell>
                                    </CTableRow>
                                </CTableBody>
                            </CTable>

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

export default ViewMembers;
