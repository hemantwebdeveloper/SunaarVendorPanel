import React from 'react'
import { CFooter } from '@coreui/react'


const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="" target="_blank" rel="noopener noreferrer">
          Sunaar24
        </a>
        <span className="ms-1">&copy; 2022</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="" target="_blank" rel="noopener noreferrer">
          Sunaar24 Admin &amp; Dashboard
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
