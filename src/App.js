import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import Login from './Login'
import Lists from './components/Lists'
import { auth } from './firebase'
import { signOut } from 'firebase/auth'
// import { auth } from '../firebase'
import { Modal, Button, Alert, Form } from 'react-bootstrap'
import { addDoc, serverTimestamp } from 'firebase/firestore'
import { colRef, listRef } from './firebase'
import { VscAdd } from 'react-icons/vsc'


import Header from './components/Header'
import TableInfo from './components/TableInfo'
// import { Alert, Offcanvas } from 'react-bootstrap'
// import Sidebar from './components/Sidebar'

const App = () => {
  const [deleteAlertShow, setDeleteAlertShow] = useState('')
  const [addAlertShow, setAddAlertShow] = useState('')
  const [editAlertShow, setEditAlertShow] = useState('')
  const [errorAlertShow, setErrorAlertShow] = useState('')
  const [isAuth, setIsAuth] = useState(false)
//   const [user, setUser] = useState(false)
  const [show, setShow] = useState(false)
  const [item, setItem] = useState('')
  const [time, setTime] = useState('')
  const [task, setTask] = useState('')
  const [shows, setShows] = useState(false);
  const [sho, setSho] = useState(false);

  const handleSho = () => setSho(true)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
//   const handleShows = () => setShows(true)
  const handleClo = () => setSho(false)

  const signUserOut = () => {
      signOut(auth).then(() => {
          localStorage.clear()
          setIsAuth(false)
          console.log('auth: ' , auth)
  //   console.log('provider: ' , provider)
      })
  }

  const addTask = (e) => {
    e.preventDefault()
    addDoc(colRef, {
      time: time,
      task: task,
      createdAt: serverTimestamp(),
    }).then(() => {
      setTask('')
      setTime('')
      setAddAlertShow('active')
      setTimeout(() => setAddAlertShow(''), 1700)
    })
    setShow(false)
  }

  const addListItem = (e) => {
      e.preventDefault()
    addDoc(listRef, {
     item: item,
      createdAt: serverTimestamp(),
    }).then(() => {
      setItem('')
      setAddAlertShow('active')
      setTimeout(() => setAddAlertShow(''), 1700)
    })
    setSho(false)
  }

  return (
    <Router>
     
      <Routes>
        <Route
          path="/"
          element={
              <>
               <Header title="Schedule"  setShow={setShow} icon={<VscAdd onClick={handleShow} />} shows={shows} setShows={setShows}  isAuth={isAuth} signUserOut={signUserOut} setAddAlertShow={setAddAlertShow} />
               <TableInfo
              setEditAlertShow={setEditAlertShow}
              setDeleteAlertShow={setDeleteAlertShow}
              setErrorAlertShow={setErrorAlertShow}
            />
              </>
           
          }
        />
        <Route path="/lists" element={
        <>
        <Header title="Lists" setSho={setSho} icon={<VscAdd onClick={handleSho} />} signUserOut={signUserOut} setAddAlertShow={setAddAlertShow} />
        <Lists setEditAlertShow={setEditAlertShow}
              setDeleteAlertShow={setDeleteAlertShow}
              setErrorAlertShow={setErrorAlertShow} />
        </>
        } />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
      <div>
        <div className={`addedAlertWrap ${addAlertShow}`}>
          <Alert className={`addedAlert`} variant="dark">
            Added Successfully!
          </Alert>
        </div>
        <div className={`errorAlertWrap  ${errorAlertShow}`}>
          <Alert className="errorAlert" variant="dark">
            Sorry there was a problem. Please try again :(
          </Alert>
        </div>
        <div className={`editAlertWrap ${editAlertShow}`}>
          <Alert className={`editAlert`} variant="dark">
          Edited Successfully!
          </Alert>
        </div>
        <div className={`deleteAlertWrap ${deleteAlertShow}`}>
          <Alert className="deleteAlert" variant="dark">
           Deleted Successfully!
          </Alert>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#fff', fontSize: '1.2em' }}>
            Add New Task
          </Modal.Title>
        </Modal.Header>
        <Form className="taskForm" onSubmit={e => addTask(e)}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicTime">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name={time}
                onChange={e => setTime(e.target.value)}
                placeholder="New time..."
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTask">
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="text"
                name={task}
                onChange={e => setTask(e.target.value)}
                placeholder="New task..."
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type='submit'>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={sho} onHide={handleClo} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#fff', fontSize: '1.2em' }}>
            Add New Item
          </Modal.Title>
        </Modal.Header>
        <Form className="taskForm" onSubmit={e => addListItem(e)}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicItem">
              <Form.Label>Item</Form.Label>
              <Form.Control
                type="text"
                // name={task}
                onChange={e => setItem(e.target.value)}
                placeholder="New item..."
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClo}>
              Close
            </Button>
            <Button variant="primary" type='submit'>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Router>
  )
}

export default App
