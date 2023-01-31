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
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CModal,
    CModalBody,
    CModalContent,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CModalDialog,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'


export const AlertMsg = ({ msg }) => {

    const { type, title, data, onPress } = msg

    useEffect(() => {
        console.log(msg, 'msg here')
    }, [])

    return (
        // setTimeout(
        //     () => {
        //         // window.location.reload()
        //         setMsg('')
        //     },
        //     3500
        // ) &&
        <CModal visible={msg ? true : false} onClose={() => onPress()}
            // backdrop={'static'}
            keyboard={false}
            portal={false}
            scrollable
        >
            <CModalHeader
                style={{ backgroundColor: type == 'error' ? '#f00' : '#4BB543' }}
            >
                <CModalTitle style={{ color: '#fff' }}>{title}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                {data}
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => onPress()}>
                    Close
                </CButton>
                {/* <CButton color="primary">Save changes</CButton> */}
            </CModalFooter>
        </CModal>
    )
}