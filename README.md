# Roller Derby Scoreboard
I build software for banked track roller derby, and this is an experiment into working with the Vue.js framework. This is a very slimmed down version of what I have created, a full a/v production software suite.

### Keyboard Controls
This supports various keyboard controls:

- **SPACE/ENTER** - Starts / Stop / Ready the Jam clock. (The main control for the board.)
- **LEFT** - Increase left-side score. (Shift+Left to decrease)
- **RIGHT** - Increase right-side score.
- **DOWN** - Start/Stop Game Clock
- **UP** - Start/Stop Break Clock
- **A** - Confirm jam Points (for in-field refs)
- **Q** - Lead Jammer Left-Side (Shift+Q for Power Jam)
- **W** - Lead Jammer Right-Side

### Instructions

Banked Track Roller Derby is played in 60-second jams. As the Scoreboard operator, you control the flow of the clocks, scores, timeouts, challenges, and quarter. There are three main states for the scoreboard:

1. Ready (default)
2. Jamming (jam clock is running)
3. Stopped (jam has finished)

The label on the JAM button tells you what state you will enter when you press SPACE/ENTER. 

- When labeled 'JAM', press, and you'll start the Jam Clock
- When labeled 'STOP', press, and you'll stop the Jam Clock
- When labeled 'READY', press and you'll reset the Jam Clock to 60 seconds.

READY -> JAM -> STOP -> READY -> JAM ...

### Jam Clock Control

The Jam Clock is controlled with the above instructions. 
The main button is the large, central button, at the bottom of the screen.

### Game Clock Control

- The Game Clock runs when the jam clock is running. 
- The Game Clock time be set with the lower-right controls.
- The Game Clock starts/stops when you press DOWN on the keyboard.
- The Game Clock starts/stops when you click it.
- The Game Clock cannot be stopped when the Jam Clock is running.

### Break Clock Control

- The Break Clock runs immediately when the Jam Clock stops.
- The Break Clock can only start and be reset; it cannot be continued mid-point.
- The Break Clock lasts for 30 seconds.
- The Break Clock stops and resets when the Jam Clock starts.
- The Break Clock can be stopped/started by pressing UP on the keyboard.
- The Break Clock can be stopped/started with the toggle buttons, or by clicking on it.

### Jam Counter

- The Jam Counter, labeled 'Jam #', tracks the current jam number.
- Increase the jam # by clicking the '+' icon, or the jam number itself.
- Decrease the jam # by clicking the '-' icon, or right-clicking the jam number itself.

### Score

- Increase a team's score by clicking it.
- Decrease a team's score by right-clicking it.
- LEFT increases the left-side team's score.
- RIGHT increases the right-side team's score.
- Holding SHIFT + LEFT (or SHIFT + RIGHT) will decrease the team's score.
- Adjusting the score when the jam clock is not running, will adjust the Jam Points accordingly.

### Jam Points

- Jam Points are calculated automatically when adjusting score.
- Jam Points are not changed during a Jam.
- Jam Points can be adjusted between -99 and 99
- Jam Points can be manually adjusted, without affecting score, by clicking / right-clicking the Jam Points value.

### Timeouts
- Timeouts are adjusted manually by clicking the associate team's Timeout value.
- Clicking the 'NO' icon on a team's side will change their status to TIMEOUT.

### Challenges
- Challenges are adjusted manually by clicking the associate team's challenge value.
- Clicking the 'NO' icon on a team's side will change their status to CHALLENGE.

### Lead Jammer / Power Jam
- CLick the lightning bolt icon on a team to set it as Lead Jammer
- Right-click the lightning bolt icon on a team for a Power Jam
- **Q** sets the left-side team as lead jammer
- **W** sets the right-side team as lead jammer
- SHIFT + Q/W sets the team as Power jam

Note: A Power Jam occurs when one of the team's Jammers is in the penalty box from a previous Jam.

### Official Timeout
- CTRL+UP will call an official Timeout
- Clicking the 'OT' icon will call an official timeout.

### Injury
- Clicking the 'first aid' icon will call an injury timeout.

### Confirm Points
It can be difficult for in-field refs to communicate with the Scoreboard operator by voice. Clicking the 'checkmark' icon in the lower-left will display the jam points in the center of the screen. Once confirmed, they should be hidden.

The confirm points are hidden when a jam starts.

### Phase / Quarter
- Click the phase/quarter label to advance it.
- Right-click the phase/quarter label to change to the previous phase/quarter.
- The fast-forward icon in the lower right works the same way.
- Changing Phase/Quarter automatically populates the phase Minute and Second, but does NOT affect the game clock. 
- The Game Clock time must be manually set by clicking the 'Checkmark' icon in the lower-right.

### Setting Game Time
To adjust the game clock manually, enter a minutes and seconds in the lower-right, and then click the checkmark icon. This can only be done when the game clock is stopped.

### Change Teams
You can change teams by clicking the logo, or right-clicking the logo.

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
