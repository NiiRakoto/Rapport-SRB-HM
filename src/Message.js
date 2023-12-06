import { useState } from "react";


import "./App.css";

import AuthPage from "./AuthPage";
import ChatsPage from "./ChatsPage";

function Chat() {
  const [user, setUser] = useState(undefined);

  if (!user) {
    return <AuthPage onAuth={(user) => setUser(user)} />;
  } else {
    return <ChatsPage user={user} />;
  }
}

export default Chat;