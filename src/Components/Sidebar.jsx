import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
const Sidebar = () => {
    const {getUsers, users, selectedUsers, setSelectedUsers} = useChatStore();
    useEffect(()=>{
        getUsers()
    },[getUsers])
    return (
      <div
        className="col-md-4 col-lg-3 bg-light border-end"
        style={{ height: "100vh" }}
      >
        <div class="p-3">
          <h5>Search or start a new chat</h5>
          <input
            type="text"
            class="form-control mb-3"
            placeholder="Search..."
          />
          <h6>Contacts</h6>
            {users.map((user)=>(
                <button 
                key={user.id}
                onClick={()=>setSelectedUsers(user)}
                className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${selectedUsers?.id === user.id ? 'active' : ''}`}
                >
                  {user.name}
                </button>
            ))}
          
        </div>
      </div>
    );
}

export default Sidebar;