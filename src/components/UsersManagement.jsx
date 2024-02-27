import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import UserCard from "./UserCard";

const UsersManagement = () => {
    const auth = useContext(AuthContext);

    return <div className="flex h-full w-full flex-row shadow ">
        <div className='flex flex-col justify-start w-1/2 max-h-[20rem] p-4 '>
            <h2 className="font-medium text-lg">Active Users: </h2>
            <div className="flex-grow h-full flex flex-col gap-1 overflow-auto">
                {auth?.data?.users?.unblocked.length ?
                    auth?.data?.users?.unblocked.map((user, i)=> <UserCard key={i} userId={user.id} type={'blocked'} username={user.name} option={"block"} />)
                    : <div className="h-full text-red-600 font-medium w-full flex justify-center items-center border">No User Found</div>}
            </div>
        </div>
        <div className='flex flex-col justify-start w-1/2 max-h-[20rem] p-4 '>
            <h2 className="font-medium text-lg">Blocked Users: </h2>
            <div className="flex-grow h-full flex flex-col gap-1 overflow-auto">
                {auth?.data?.users?.blocked?.length ?
                    auth?.data?.users?.blocked.map((user, i)=> <UserCard key={i} userId={user.id} type={'unblocked'} username={user.name} option={"unblock"} />)
                    : <div className="h-full text-red-600 font-medium w-full flex justify-center items-center border">No User Found</div>}

               
            </div>
        </div>
    </div>
}

export default UsersManagement;