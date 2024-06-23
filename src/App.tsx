// src/App.tsx
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

/*
  We need to add functioanlity such that when we toggle between chats, we still send the current title in to save the current chat
*/

function App() {
  // Change the views tomorrow
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/conversations" element={<ConversationView />} />
          <Route path="/logout" element={<UserLogoutView />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
