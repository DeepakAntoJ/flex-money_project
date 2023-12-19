import { useState } from 'react'
import { useUsersContext } from "../hooks/useUsersContext"


const UserForm = () => {

    const { dispatch } = useUsersContext()

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [batch, setBatch] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = {name, age, email, batch}
        
        const response = await fetch('/api/yogauser', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
        })
        const json = await response.json()

        if (!response.ok) {
        setError(json.error)
        setEmptyFields(json.emptyFields || [])
        }
        if (response.ok) {
        setEmptyFields([])    
        setError(null)
        setName('')
        setAge('')
        setEmail('')
        setBatch('')
        dispatch({type: 'CREATE_USER', payload: json})
        console.log('Payment Successful:', json)
        }

    }

    return (
        <form className="create" onSubmit={handleSubmit}> 
        <h3>Fill the Enrollment Form</h3>

        <label>User Name:</label>
        <input 
            type="text" 
            onChange={(e) => setName(e.target.value)} 
            value={name}
            className={emptyFields.includes('name') ? 'error' : ''}
        />

        <label>Age:</label>
        <input 
            type="number" 
            onChange={(e) => setAge(e.target.value)} 
            value={age}
            className={emptyFields.includes('age') ? 'error' : ''}
        />

        <label>Email:</label>
        <input 
            type="text" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email}
            className={emptyFields.includes('email') ? 'error' : ''}
        />

        <label>Payment (500/- Rs INR):</label>
        <input 
            type="number" 
            value={500}
            readOnly
        />

        <label>Select a Batch:</label>
        {/* <input 
            type="text" 
            onChange={(e) => setBatch(e.target.value)} 
            value={batch} 
        /> */}
        <select onChange={(e) => setBatch(e.target.value)} value={batch} className={emptyFields.includes('batch') ? 'error' : ''}>
            <option value="">Select Any one</option>
            <option value="6-7AM">6-7AM</option>
            <option value="7-8AM">7-8AM</option>
            <option value="8-9AM">8-9AM</option>
            <option value="5-6PM">5-6PM</option>
        </select>

        <button>Complete the Payment</button>
        {error && <div className="error">{error}</div>}
        </form>
    )
}

export default UserForm