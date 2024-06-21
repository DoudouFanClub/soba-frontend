// src/App.tsx
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomeView } from "./views/HomeView";
import { UserLogoutView } from "./views/UserLogoutView";
import { ConversationView } from "./views/ConversationView";

import "./App.css";

/* Copy Paste This into DB to test Markdown Syntax
To create a Python function that adds two numbers, you can define a function using the `def` keyword and then return the sum of the two numbers. Here's a simple example:
```python
def add_two_numbers(a, b):
    # My Comment
    return a + b

# Example usage
result = add_two_numbers(3, 5)
print(result)
# Output: 8
```
*/

function App() {
  const [username, setUsername] = useState("");

  const updateUsername = (userName: string) => {
    setUsername(userName);
    console.log(username);
  };

  // Change the views tomorrow
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<HomeView setUsernameCallback={updateUsername} />} />
          {/* <Route
            path="/login"
            element={<UserLoginView setUsernameCallback={updateUsername} />}
          /> */}
          {/* <Route path="/register" element={<UserRegisterView />} /> */}
          <Route path="/conversations" element={<ConversationView />} />
          {/* <Route
            path="/new_chat"
            element={<NewChatView username={username} />}
          /> */}
          <Route path="/logout" element={<UserLogoutView setUsernameCallback={updateUsername} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
