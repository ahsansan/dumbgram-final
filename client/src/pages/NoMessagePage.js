import MessageList from "../component/MessageList";
import Header from "../component/Header";
import NoMessage from "../component/NoMessage";

function NoMessagePage() {
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
              <NoMessage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoMessagePage;
