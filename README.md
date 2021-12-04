# Pomodoro-Timer
Custom Exotic Pomodoro Timer 

by Team Goblin Shark
sAram Krakirian, Harvey Nwynn, Joey Ma, Ulrich Neujahr and Victor Wang

1. What is the problem you’re solving?
- Time / Work Management.
- People often encounter distractions during work that reduce productivity and struggle to find the time to rest.
2. What is the solution?
- Custom Exotic Pomodoro.
- Customizable, modular timer (for work & rest, among other things).
3. What is the MVP scope? (core features you must get working)
- Implement CRUD:
    - Create new customized preset timers for any task
    - Read from preset timers stored in the database
    - Update customized timer options
    - Delete customized timers
- Save timers specific to users?
    - Could be done with a log-in feature 
    - Could be just storing on the page (db)  
4. What are the tough technical challenges involved with solving this problem?
- Create an enjoyable UI/UX.
- Implement Database.
- How to keep track of time?
    - https://www.npmjs.com/package/react-countdown
5. What are the stretch goals?
- Implement different UI/UX themes for users to choose from.
- Tracking of time and of tasks.
- Add a stopwatch feature.
- Simultaneous running of timer/stopwatch.
- Make API calls to retrieve quotes/music/etc. when the timer expires.
- Port app as Chrome/VS Code extension.
- Allow the timer to go off even if the user leaves the web page. (cookie, local storage).
6. What is the technology stack?
- MERN (MongoDB, Express, React, Node)
7. Team Responsibility breakdown: Who’s working on which part?
- Joey: React / Front-End -> Hybrid
- Aram: Backend
- Victor: Back-end / Auth_Session
- Harvey: React hooks / back-end
- Ulrich: React / Front-end

