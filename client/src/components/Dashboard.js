import { useHistory } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import Header from "./HeaderComponent";
import Main from "./MainComponent";

export function Dashboard() {
  // Get current user and signOut function from context
  const { user, signOut } = useAuth();

  const history = useHistory();

  async function handleSignOut() {
    // Ends user session
    await signOut();

    // Redirects the user to Login page
    history.push("/login");
  }

  const campus = Header.campus;

  return (
    <div>
      <BrowserRouter>
        <div>
          <p style={{ color: "blue", backgroundColor: "rgb(200, 200, 200)", padding:0, margin:0 }}>
            <button onClick={handleSignOut}>Sign out</button> Welcome,{" "}
            {user?.email}!
          </p>
          <Header campus={campus} userEmail={user?.email}></Header>
          <Main campus={campus} userEmail={user?.email} />
        </div>
      </BrowserRouter>
    </div>
  );
}
