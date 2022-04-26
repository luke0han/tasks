import React, { useState, useEffect } from 'react'
// import { Navbar, Button } from 'react-bootstrap'
// import { VscListFlat } from 'react-icons/vsc'
import { Link, useNavigate } from 'react-router-dom'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import { Button, Offcanvas} from 'react-bootstrap'
// import { addDoc, serverTimestamp } from 'firebase/firestore'
// import { colRef } from '../firebase'

const Header = ({title, signUserOut,  icon, userId}) => {
//   const [show, setShow] = useState(false)
  const [user, setUser] = useState('')
//   const [time, setTime] = useState('')
//   const [task, setTask] = useState('')
  const [shows, setShows] = useState(false);


//   const handleShow = () => setShow(true)
//   const handleClose = () => setShow(false)
//   const handleShows = () => setShows(true)
  const handleCloses = () => setShows(false)
  
//   const handleSideShow = () => setShow(true)
//   const handleSideClose = () => setShow(false)
//   const toggleShow = () => setShow((s) => !s);
let navigate = useNavigate()



  const signOut = () => {
    signUserOut()
    handleCloses()
  }
  return (
      
    <div className="header-wrap">
      <Button onClick={() => setShows(true)} />
      <h1>{title}</h1>
      {icon}
      
      {/* <Offcanvas show={sideShow} onHide={handleSideClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas> */}
      <Offcanvas show={shows} onHide={handleCloses}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{"menu" }</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
         <ul className='offcanvas-list'>
         <Link onClick={handleCloses} to='/lists'><li>Lists</li></Link>
         <Link onClick={handleCloses} to='/'><li>Schedule</li></Link>
         </ul>
         <Link onClick={signOut} to='/login'><Button className="logout-btn" >logout</Button></Link>
        </Offcanvas.Body>
      </Offcanvas>
      
    </div>
  )
}

export default Header
