import { useHistory } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import Header from "./HeaderComponent";
import Main from "./MainComponent";
// import {Snowflake} from "./SnowflakeComponent";

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
        <div style={{position: 'static'}}>
          <p style={{ color: "white", backgroundColor: "rgb(0, 16, 107)", padding:0, margin:0 }}>
            <button onClick={handleSignOut}>Sign out</button> Welcome,{" "}
            {user?.email}!
          </p>
          <img src='https://qyctrtcwtwasdktftmuy.supabase.co/storage/v1/object/public/images/drstrange.png' alt='Dr Strange' style={{position: 'absolute', top: '1px', right:'1px', zIndex:'10', width: '300px'}}/>
          <Header campus={campus} userEmail={user?.email}></Header>
          <Main campus={campus} userEmail={user?.email} />
          {/* <Snowflake /> */}
        </div>
      </BrowserRouter>
    </div>
  );
}
