# Overview
A basic clone of the game Overcooked in p5.js with p5.play, and our protein synthesis analogy project for Biology 12!

The simplified game has the following features: 

Player
- Click to move movement
- Pick up objects
- Drop objects
- Interact with tools
- collision with obstacles, interaction FOV hitbox

Item class
- Interactables → can be chopped, can be cooked…
- Sprite
- Combining to make dishes

Game
- Game state → “cutscene”, “finish”, “game”
- Orders system → display, update
- Analogy explanation cutscene
- End scene

Obstacle class
- Collision
- Interaction
- Display

Dialogue → explanation of protein synthesis analogy

# Analogy
## Transcription
DNA → All the monsters - orders combined \
mRNA → All the orders on 1 ticket, which go from the cashier to the kitchen \
RNA polymerase → Cashier (sends recipe and prints an mRNA) \
Methyl Cap → Heading of order ticket → “[restaurant name] Order #..." \
Poly-A Tail → Extra paper at end of receipt to "protect" it \
Introns/Exons → Filler stuff on the order ticket 
- e.g. Customer requests “no pickles on the burger please”, or “put happy birthday on the box” or “50% ice less sugar” \
ATCG vs. AUCG → menu orders vs. way the kitchen receives orders 

## Translation
Cytoplasm → restaurant floor 
 
Ribosomes →  the kitchens \
rRNA → countertop/kitchen appliances \
Ribosome sites:
- A site (acceptor) → worker spawnpoint, player changes appearance after every "amino acid", hence different trna per codon  
- P site (peptidyl) → hand in area 

tRNA → player \
Amino acid → each dish (coded for by codons) \
Proteins → One completed order - all of the dishes combined \
Golgi → potato king distributes dishes to the people 

Release factor → timer end buzz \
Codons → order ID → some dish (e.g. tomato soup is AUU, or etc.) 

Stop codon → last order made on receipt \
Start codon → first order made on receipt 
