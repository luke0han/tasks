import React, { useState, useEffect } from 'react'
import {
  Table,
  Button,
  Modal,
  Form,
} from 'react-bootstrap'
import { IoIosTrash } from 'react-icons/io'
import { q2, db, listRef } from '../firebase'
import {
  onSnapshot,
  doc,
  deleteDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore'

const Lists = ({
  setDeleteAlertShow,
  setEditAlertShow,
}) => {
  const [items, setitems] = useState([])
  const [show, setShow] = useState(false)
  const [editItem, setEditItem] = useState('')
  const [editId, setEditId] = useState('')

  useEffect(() => {
    onSnapshot(q2, snapshot => {
      let items = []
      snapshot.docs.forEach(doc => {
        items.push({ ...doc.data(), id: doc.id })
        // console.log(doc.id)
      })
      setitems(items)
    })
  }, [])

  const handleClose = () => setShow(false)

  const onOpenEdit = id => {
    const docRef = doc(db, 'lists', id)
    onSnapshot(docRef, doc => {
      setEditItem(doc.data().item)
      setEditId(doc.id)
    })
    setShow(true)
  }

  const onEditItem = (e, id) => {
    e.preventDefault()
    const docRef = doc(db, 'lists', id)
    updateDoc(docRef, {
      item: editItem,
    })
    setShow(false)
    setEditAlertShow('active')
    // setItem(editItem)
    setTimeout(() => setEditAlertShow(), 1700)
  }

  const deleteItem = id => {
    const docRef = doc(db, 'lists', id)
    deleteDoc(docRef)
    setDeleteAlertShow('active')
    setTimeout(() => setDeleteAlertShow(''), 1700)
  }

  const onDeleteAll = () => {
    getDocs(listRef).then(snapshot => {
      snapshot.docs.map(docu => {
        const docRef = doc(db, 'lists', docu.id)
        deleteDoc(docRef)
      })
    })
  }

  return (
    <>
      <div>
        <Table striped variant="dark">
          <thead>
            <tr>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {items.map(i => {
              return (
                <tr key={i.id}>
                  <td onClick={() => onOpenEdit(i.id)} className="items-wrap">
                    {i.item}
                  </td>
                  <td className="delete-icon-wrap">
                    <IoIosTrash onClick={() => deleteItem(i.id)} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        <Button onClick={onDeleteAll} className="clearAllBtn">
          Clear List
        </Button>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#fff', fontSize: '1.2em' }}>
            Edit Item
          </Modal.Title>
        </Modal.Header>
        <Form className="itemForm" onSubmit={e => onEditItem(e, editId)}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicItem">
              <Form.Label>Item</Form.Label>
              <Form.Control
                type="text"
                // name={task}
                onChange={e => setEditItem(e.target.value)}
                value={editItem}
                placeholder="Edit item..."
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
    </>
  )
}

export default Lists
