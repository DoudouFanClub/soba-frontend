# LLM Frontend

Contains the frontend user interface required to communicate with the LLM Backend (LLM-Go) with the use of React and Axios.

## Dependencies

- Vite
- React
- React Router
- React Portal
- React Markdown
- Node.js
- Axios (net/http)
- Remark-gfm (Markdown for Links, Footers, Strikethrough, Tables, Tasklists)

## Application Controls

### Package Installation

```bash
npm install
```

### Configure Server Host Settings
Modify the `host` and `port` values if you are hosting a server to multiple clients. Also, ensure that the `IPV4` and `port number` are configured for both `inbound` and `outbound` rule inside of of `Windows Defender Firewall` and ensure that `Node.js JavaScript Runtime` for `TCP` is enabled to allow for `client -> host` connection.
```js
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    host: `192.168.0.1`,
    port: 5173
  },
  build: {
    rollupOptions: {
      input: {
        main: "src/main.tsx",
        worker: "src/worker/LoadConversationWorker.ts", // Adjust path as per your project structure
      },
    },
  },
});

```

### To Run

```bash
npm run dev
o <enter>
```

### To Quit

```bash
q <enter>
```

## Supported Functionality On Soba-Server
- Register / Login Functionality
```python
POST( http://192.168.0.1:8080/login )
POST( http://192.168.0.1:8080/logout )
```
- Create / Delete / Rename Conversations
```python
POST( http://192.168.0.1:8080/new_chat )
POST( http://192.168.0.1:8080/delete_chat )
POST( http://192.168.0.1:8080/rename_chat ) # Currently unsupported
```
- User / Server Actions
```python
POST( http://192.168.0.1:8080/load_chat )
POST( http://192.168.0.1:8080/send_message )
POST( http://192.168.0.1:8080/retrieve_convo_titles )
```
- Conversation Persistence
- Markdown Display (Code blocks default to cpp if no language is specified)