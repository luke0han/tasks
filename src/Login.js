import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { auth, provider } from './firebase';
import { signInWithPopup } from 'firebase/auth';

import { ImGoogle3 } from "react-icons/im";
import { useNavigate } from 'react-router-dom';

const Login = ({setIsAuth}) => {


    let navigate = useNavigate()
    const signInWithGoogle =() => {
        signInWithPopup(auth, provider).then(result => {
            localStorage.setItem('isAuth', true)
            setIsAuth(true)
            navigate('/')
            console.log('auth: ', auth)
            console.log('provider: ' , provider)
        })
    }
  return (
    <div className='login-wrap'>
        <ImGoogle3 onClick={signInWithGoogle} />
      {/* <Card>
        <Card.Header>Login</Card.Header>
        <Card.Body>
            <ImGoogle3 /> */}
        {/* <Form className="taskForm" >
          
            <Form.Group className="mb-3" controlId="formBasicTime">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                // onChange={e => setEditTime(e.target.value)}
                // value={editTime}
                placeholder="New time..."
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTask">
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="text"
                // onChange={e => setEditTask(e.target.value)}
                // value={editTask}
                placeholder="New task..."
              />
            </Form.Group>
        </Form> */}
          {/* <Button variant="primary">Go somewhere</Button> */}
        {/* </Card.Body>
      </Card> */}
    </div>
  )
}

export default Login
