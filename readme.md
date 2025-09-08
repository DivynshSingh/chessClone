# Online Chess Platform

An **online multiplayer chess platform** built with **TypeScript**, **React (Vite)**, and a WebSocket backend. This project enables real-time chess games played in the browser, paired dynamically via WebSocket connections.

---

## Features

- Real-time two-player chess games via WebSocket
- Backend manages game state and move validation using `chess.js`
- Players are automatically paired for games once ready
- React frontend for a responsive, interactive chessboard UI
- Move history display with alternating player moves
- Clean UI styled with Tailwind CSS for modern look and responsiveness
- Simple and efficient codebase structured with TypeScript

---

## Architecture Overview

### Backend

- Uses `ws` WebSocket library to handle client connections
- Backend hosted on render
- `GameManager` class pairs users ready to play and manages active games
- Each `Game` instance represents a chess match between two clients
- Chess rules and move validation handled with the `chess.js` library
- Moves and game status are exchanged in JSON messages tagged by type, such as `INIT_GAME`, `MOVE`, `GAME_OVER`
- When a game ends, both clients receive a `GAME_OVER` notification with the winner

### Frontend

- React app bootstrapped with Vite (`tsx` files)
- React Router manages pages:
  - `/` Landing page prompting user to start
  - `/game` game screen with live chessboard
- Custom React hook `useSocket` manages WebSocket connection lifecycle
- `ChessBoard` component renders board squares and pieces, handles click-to-move interaction, sends moves via WebSocket
- `MovesList` component displays a scrollable list of moves with player indicators (`W` or `B`)
- State is managed using React `useState` and `useEffect` hooks
- Moves are validated backend-side; UI state updates on move confirmation
- Tailwind CSS classes provide styling

---
### Some Visuals

![Alt text](<front_end/public/Screenshot 2025-09-07 202210.png>)

![Alt text](<front_end/public/Screenshot 2025-09-07 202322.png>)

![Alt text](<front_end/public/Screenshot 2025-09-07 202422.png>)
  
