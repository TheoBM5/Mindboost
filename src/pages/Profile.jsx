import {useAuth} from '../context/AuthContext'

function Profile() {
    const {user} = useAuth()
    return (
    <div>
        {JSON.stringify(user)}
    </div>
    )
}
export default Profile