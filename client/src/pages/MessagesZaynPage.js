import MessageList from "../component/MessageList";
import Header from "../component/Header";
import MessageZayn from "../component/MessageZayn";

function MessageZaynPage() {
  return (
    <div>
      <Header />
      <div className="nav-container">
        <div className="home-left">
          <MessageList />
        </div>
        <div className="home-right">
          <div>
            <div className="d-flex justify-content-center">
              <MessageZayn />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageZaynPage;
