import React, { useContext } from 'react'
import { Contex } from '../Cont/Contex.jsx'
function Home() {
  return (
    <div className='home'>
      <div className="home-container">

        <div className="home_side_box">
          <div className="home_left">
            <img id='firstImage' src="/img/docBack1.jpg" alt="" />
            <img src="/img/docBack1.jpg" alt="" />
            <img src="/img/docBack2.jpg" alt="" />
            <img src="/img/docBack3.jpg" alt="" />
            <img src="/img/docBack1.jpg" alt="" />
            <img src="/img/docBack2.jpg" alt="" />
            <img src="/img/docBack3.jpg" alt="" />
            <img src="/img/docBack1.jpg" alt="" />
            <img src="/img/docBack2.jpg" alt="" />
            <img src="/img/docBack3.jpg" alt="" />
          </div>
          <div className="home_right">
        <div className="home_right_side">
          <div className="right_side">
            <div className="right_side_span">
              Hi,
              <p> How are you feeling ?</p>
            </div>
            <img src="img/doc5.png" id='doc5' alt="" />
            <img src="img/doc3.png" id='doc3' alt="" />
          </div>
          <div className="one">
            <div className="two">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur nihil corrupti excepturi eius impedit eveniet accusantium vitae. Similique, quam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum quam iusto quos praesentium magnam aliquid. Fugit voluptatibus magni sed asperiores. </p>
          </div>
          </div>
        </div>

          </div>
        </div>
       
        </div>

      <div id='second_home_container'>
      <div className="second_heading">
        <p>What Should We do ? </p>
      </div>

        <div className="second_box">
          <div className="a">
            <div className="b">
              <div className="type_name">
                <span>Fever</span>
              </div>
          <div className="health_type">
           <p>Rest, stay hydrated, and take fever-reducing medications like paracetamol if needed</p>
          </div>
          </div>
          </div>
          <div className="a">
            <div className="b">
              <div className="type_name">
                <span>Cough</span>
              </div>
          <div className="health_type">
           <p>Stay hydrated, and try warm fluids like honey and lemon tea to soothe your throat</p>
          </div>
          </div>
          </div>
          <div className="a">
            <div className="b">
              <div className="type_name">
                <span>Diarrhea</span>
              </div>
          <div className="health_type">
           <p>Stay hydrated by drinking plenty of water, oral rehydration solutions, or clear broths. Avoid heavy or greasy foods</p>
          </div>
          </div>
          </div>
          <div className="a">
            <div className="b">
              <div className="type_name">
                <span>body aches</span>
              </div>
          <div className="health_type">
           <p>Rest, stay hydrated, and use over-the-counter pain relievers like ibuprofen or paracetamol to ease discomfor</p>
          </div>
          </div>
          </div>
            
          
        </div>
      </div>

    </div>
  )
}

export default Home
