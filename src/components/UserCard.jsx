import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import axios from "axios";

const UserCard = ({username, type, option, userId}) => {
    const { token, refresh } = useContext(AuthContext);
    const handler = () => {
        
        const url = 'http://localhost:3000/api/users/update/user/status';
            let data = {
                userId: userId,
                status: type
            };
            axios.patch(url, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((response) => {
                    refresh();
                    console.log('Success:', response.data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
    }
    return <div className="w-full py-2 flex justify-between items-center h-auto px-3 border">
        <h2>{username}</h2>
        <button onClick={handler} className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {option}
        </button>
        
        
    </div>
}

export default UserCard;