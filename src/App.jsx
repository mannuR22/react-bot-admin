import FormPage from "./pages/FormPage";
import { AuthContext } from "./contexts/AuthContext";
import AdminPanel from "./pages/AdminPanel";
import { useContext, useState } from "react";
function App() {

  const auth = useContext(AuthContext);
  console.log(auth.token);
  // const [isLoggedIn, setIsLoggedIn] = useState(token? true: false);

  return (<>
    {auth.token ? <AdminPanel /> : <FormPage />}
  </>)
}

export default App
