# Brussels Tribunal — Setup Guide

**No accounts. No configuration. Just two commands.**

---

## Requirements

- **Node.js 18+** — download from [nodejs.org](https://nodejs.org) (choose the LTS version)
- A laptop with Wi-Fi — students connect from their phones on the same network

---

## First-time setup (do this once)

1. Unzip the `brussels-tribunal.zip` file
2. Open a terminal / command prompt in that folder
3. Run:
   ```
   npm install
   ```
   This downloads dependencies. Takes 1–3 minutes. Wait for the cursor to return.

---

## Running the game (every class)

```
npm run dev
```

This starts two things at once:
- The **game server** on port 3001 (handles teams, answers, scoring)
- The **web app** on port 5173 (the interface)

Open your browser to: **http://localhost:5173**

---

## Classroom flow

1. Open `http://localhost:5173` on your laptop → click **"New Game"** → show the 6-letter code on the projector
2. Students open the same URL on their phones (use your laptop's local IP, e.g. `http://192.168.1.42:5173/join`)  
   *You'll see the exact URL to share on the presenter lobby screen*
3. Once all teams have joined → click **Start Round**
4. Teams answer on their phones, you see live answer bars on the presenter screen
5. Click **Reveal** → discuss → **Bonus** → **Leaderboard**

---

## Finding your laptop's local IP (for students to join)

**Windows:** Open Command Prompt → type `ipconfig` → look for "IPv4 Address"  
**Mac:** System Settings → Wi-Fi → Details → IP Address  
**Linux:** `ip addr` or `hostname -I`

The app also shows the full join URL on the presenter lobby screen.

---

## Stopping the game

Press `Ctrl + C` in the terminal. All game data is in memory — nothing is saved to disk.

---

## ⚠️ Image note

`public/tenant-blacklist.png` is the **redacted** classroom version.  
The original image contains a real passport scan — **do not use or distribute it**.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| "Port 3001 already in use" | Another copy of the server is running. Close all terminals, reopen one, run `npm run dev` again. |
| Students can't connect | Make sure they're on the same Wi-Fi. Check the IP address — it changes if you switch networks. |
| Blank screen | Hard-refresh the browser (Ctrl+Shift+R). Make sure `npm run dev` is still running. |
| "Cannot find module" | Run `npm install` again in the project folder. |
