const ChatWindow = () =>{
    return (
      <div>
        <div className="col-md-9">
          <div className="p-3 border-bottom">
            <h5>Group Chat</h5>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Messages
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Participants
                </a>
              </li>
            </ul>
          </div>
          <div
            className="chat-window p-3"
            style={{ height: "400px", overflowY: "auto" }}
          >
            <div className="mb-3">
              <strong>Kate Johnson</strong>{" "}
              <small className="text-muted">11:24 AM</small>
              <p>
                Recently I saw properties in a great location that I did not pay
                attention to before 😄
              </p>
            </div>
            <div className="mb-3">
              <strong>Evan Scott</strong>{" "}
              <small className="text-muted">11:25 AM</small>
              <p>Ooo, why don't you say something more</p>
            </div>
            <div className="mb-3">
              <strong>You</strong> <small className="text-muted">11:26 AM</small>
              <p>He creates an atmosphere of mystery 😄</p>
            </div>
            <div className="mb-3">
              <strong>Evan Scott</strong>{" "}
              <small className="text-muted">11:34 AM</small>
              <p>Robert, don't be like that and say something more :) 😄</p>
            </div>
            <div className="text-muted">Robert is typing...</div>
          </div>
          <div className="input-group mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Write your message..."
            />
            <button className="btn btn-primary" type="button">
              Send
            </button>
          </div>
        </div>
      </div>
    );
};
export default ChatWindow;