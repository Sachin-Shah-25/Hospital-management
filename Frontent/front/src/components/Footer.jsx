import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer>
      <div id="footer">
        <div className="footer_left">
          <span>Excellence Center</span>
          <ul>
            <li>Orthopedics</li>
            <li>Cardology</li>
            <li>ENT</li>
            <li>Radiology</li>
            <li>Physology</li>
            
          </ul>
        </div>
        <div className="footer_mid">
          <span id='add'>Address</span>
            <ul>
              <li> <span>Stree - </span>  <span>1530 Blake St</span></li>
              <li> <span>Town - </span>  <span>Denver</span></li>
              <li> <span>Region - </span>  <span>Colorado</span></li>
              <li> <span>Postal Code - </span>  <span>80202</span></li>
              <li> <span>Phone Number - </span>  <span>(303) 298-5000</span></li>
              <li> <span>Country - </span>  <span>United States</span></li>
             
            </ul>
        </div>
        <div className="footer_third">
          <span>Our Branches</span>
          <ul>
            <li>Mumbai</li>
            <li>Indore</li>
            <li>Benglaru</li>
            <li>Bhopal</li>
            <li>Karntaka</li>
            <li>Punjab</li>
            <li>West Bengal</li>
            <li>JodhPur</li>
          </ul>
        </div>
        <div className="footer_fourth">
          <span>You Know</span>
        <p>A hospital is a healthcare institution that provides medical, surgical, and specialized care to patients. It is equipped with facilities like emergency rooms, operating theaters, diagnostic labs, and inpatient wards. Staffed by doctors, nurses, and other healthcare professionals, hospitals offer treatments ranging from routine checkups to critical care.</p>
        </div>
      </div>
      <div id='last'>Copyright © SYS, New Delhi, All rights reserved.</div>
    </footer>
  )
}

export default Footer
