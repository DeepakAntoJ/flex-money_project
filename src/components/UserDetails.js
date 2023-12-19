import { format } from 'date-fns';

const UserDetails = ({ user }) => {

    return (
        <div className="user-details">
        <h4>{user.name}</h4>
        <p><strong>Age : </strong>{user.age}</p>
        <p><strong>Batch Timings: </strong>{user.batch}</p>
        <p><strong>Email: </strong>{user.email}</p>
        <p><strong>Joined Date: </strong>{format(new Date(user.createdAt), 'dd/MM/yyyy')}</p>
        </div>
    )
}

export default UserDetails