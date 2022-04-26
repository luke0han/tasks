import React, { useEffect, useState } from 'react'
import { Modal, Button, Table, Form } from 'react-bootstrap'
import { IoIosTrash } from 'react-icons/io'
import { q, db, colRef } from '../firebase'
import {
  onSnapshot,
  deleteDoc,
  updateDoc,
  getDocs,
  doc,
} from 'firebase/firestore'

const TableInfo = ({
  setDeleteAlertShow,
  setEditAlertShow,
}) => {
  const [tasksList, setTasksList] = useState([])
  const [show, setShow] = useState(false)
  const [editTask, setEditTask] = useState('')
  const [editTime, setEditTime] = useState('')
  const [editId, setEditId] = useState('')
  // const [idList, setIdList] = useState([])
  // const [count, setCount] = useState(0)

  // const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  // let authCheck = localStorage.getItem("isAuth")
  useEffect(() => {
        // console.log(authCheck)
    onSnapshot(q, snapshot => {
      let tasks = []
      snapshot.docs.forEach(doc => {
        tasks.push({ ...doc.data(), id: doc.id })
      })
      setTasksList(tasks)
    })
  }, [])

  const EditOpen = id => {
    const docRef = doc(db, 'tasks', id)
    onSnapshot(docRef, doc => {
      setEditTask(doc.data().task)
      setEditTime(doc.data().time)
      setEditId(doc.id)
    })
    setShow(true)
  }

  const onEditTask = (e, id) => {
    e.preventDefault()
    const docRef = doc(db, 'tasks', id)
    updateDoc(docRef, {
      task: editTask,
      time: editTime,
    })
    setShow(false)
    setEditAlertShow('active')
    setTimeout(() => setEditAlertShow(''), 1700)
    setEditId('')
    setEditTask('')
    setEditTime('')
  }

  const onDelete = id => {
    const docRef = doc(db, 'tasks', id)
    deleteDoc(docRef)
    setDeleteAlertShow('active')
    setTimeout(() => setDeleteAlertShow(''), 1700)
  }

  const onDeleteAll = () => {
    getDocs(colRef).then(snapshot => {
      snapshot.docs.map(docu => {
        const docRef = doc(db, 'tasks', docu.id)
        deleteDoc(docRef)
      })
    })
  }

  return (
    <div>
      <Table striped hover variant="dark">
        <thead>
          <tr>
            <th>Time</th>
            <th>Task</th>
            <th>{''}</th>
          </tr>
        </thead>
        <tbody>
          {tasksList.map((task, i) => {
            return (
                <tr  key={task.id}>
                  <td className="time">{task.time}</td>
                  <td onClick={() => EditOpen(task.id)} className="task">
                    {task.task}
                  </td>
                  <td className="deleteBtn" onClick={() => onDelete(task.id)}>
                    <IoIosTrash />
                  </td>
                </tr>
            )
          })}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#fff', fontSize: '1.2em' }}>
            Edit Task
          </Modal.Title>
        </Modal.Header>
        <Form className="taskForm" onSubmit={e => onEditTask(e, editId)}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicTime">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                onChange={e => setEditTime(e.target.value)}
                value={editTime}
                placeholder="New time..."
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTask">
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="text"
                onChange={e => setEditTask(e.target.value)}
                value={editTask}
                placeholder="New task..."
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Button onClick={onDeleteAll} className="clearAllBtn">
        Clear All Tasks
      </Button>
    </div>
  )
}

export default TableInfo
