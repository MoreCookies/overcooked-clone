# Overcooked p5.js Clone

A WIP clone of the game Overcooked built with p5.js and p5.play, designed as a protein synthesis analogy project.

## Project Overview

A static HTML/JavaScript browser game with no backend, build system, or package manager. It uses:
- **p5.js** (v1.11.4) — game rendering and logic
- **p5.play** (v3) — physics and sprite handling via planck.js
- All loaded via CDN links in `index.html`

## Project Structure

```
/
├── index.html          # Main entry point
├── main.js             # Core game logic, player, game state
├── item.js             # Item/ingredient class
├── obstacle.js         # Obstacle class with collision
├── dialogue.js         # Cutscene dialogue
├── endscene.js         # End screen logic
├── style.css           # Game styles
└── assets/             # All game sprites and images (PNG/JPG)
```

## Running the Project

The app is served as a static site using the `serve` package (installed globally):

- **Workflow:** "Start application" — runs `serve . -l 5000`
- **Port:** 5000
- **Output type:** webview

## Deployment

Configured as a **static** deployment with `publicDir: "."`.
