/**
 * Main controller class for the scoreboard.
 * This file was created to have a single source of functionality
 * for the Scoreboard component.
 */

import State from '^/store/scoreboard/state'

const Controller = {
    /**
     * Toggles the jam clock.
     * This is the primary function of the scoreboard
     * 
     * If called when the jam clock is ready (default), 
     * the game clock is started
     * 
     * When the jam clock is running, the 
     */
    ToggleJamClock() {
        if(State.JamClockState == 0) {
            //start jam clock, game clock
            State.JamClockState = 1;
            State.GameClockState = 1;

            //increase jam number
            State.JamCounter++;

            //stop break clock, reset statuses
            State.BreakClockState = 0;
            State.BoardStatus = 0;
            State.ConfirmStatus = false;

            State.TeamA.JamPoints = 0;
            State.TeamB.JamPoints = 0;

            //reset team status if its not a power jam
            if(State.TeamA.Status != 2)
                State.TeamA.Status = 0;

            if(State.TeamB.Status != 2)
                State.TeamB.Status = 0;

        } else if(State.JamClockState == 1) {
            State.JamClockState = 2;
            State.BreakClockState = 1;
        } else if(State.JamClockState == 2) {
            State.JamClockState = 0;
        }
    },

    /**
     * Toggles the game clock.
     * The clock on stops/starts, and only resets when using the phase controls.
     * 
     * The clock cannot be turned off when the jam clock is running.
     * 
     */
    ToggleGameClock() {
        if(State.JamClockState == 1) {
            State.GameClockState = 1;
        } else {
            if(State.GameClockState == 1) {
                State.GameClockState = 0;
            } else {
                State.GameClockState = 1;
            }
        }
    },

    /**
     * Toggles the break clock.
     * 
     * When stopped, the break clock resets.
     * 
     * The break clock cannot be started when the jam clock is running.
     */
    ToggleBreakClock() {
        if(State.JamClockState == 1) {
            State.BreakClockState = 0;
        } else {
            if(State.BreakClockState == 0) {
                State.BreakClockState = 1;
            } else {
                State.BreakClockState = 0;
            }
        }
    },

    /**
     * Toggles the confirm points status, which can be used
     * to signal to in-field refs to confirm the jam points earned.
     */
    ToggleConfirmPoints() {
        State.ConfirmStatus = !State.ConfirmStatus;
    },

    /**
     * Toggles the team status.
     * If the current stats is passed in, then the status is removed.
     * 
     * @param {Object} team The team to change the status for
     * @param {Number} status The status value
     */
    ToggleTeamStatus(team, status) {
        if(team.Status == status)
            this.SetTeamStatus(team, 0);
        else {
            this.SetTeamStatus(team, status);
        }
    },

    /**
     * Sets the status of the board.
     * 
     * The status of the board cannot be changed when the jam clock is running.
     * 
     * @param {Number} status The status value
     */
    SetBoardStatus(status) {
        if(status > 0 && status == State.BoardStatus) {
            State.BoardStatus = 0;
            return;
        }

        if(State.JamClockState != 1)
            State.BoardStatus = status;
            
        switch(status) {
            case 1 : 
            case 2 :
                if(State.JamClockState != 1) {
                    State.BreakClockState = 0;
                    State.GameClockState = 0;
                }
            break;
        }
    },

    /**
     * Sets the phase of the scoreboard.
     * 
     * The phase minutes and seconds are updated, and can then be
     * manually applied to the game clock.
     * 
     * @param {Number} index The key in the State.Phases array
     */
    SetPhase(index) {
        if(index >= State.Phases.length)
            index = 0;
        else if(index < 0)
            index = State.Phases.length - 1;

        if(State.Phases[index]) {
            [State.PhaseHour, State.PhaseMinute, State.PhaseSecond] = State.Phases[index].Duration;
            State.PhaseIndex = index;
        }
    },

    /**
     * Sets the status of the given team.
     * 
     * Unlike ToggleTeamStatus, this adjusts the status of the 
     * opposite team, as no two teams can share the same status.
     * 
     * That is, only one lead jammer, one power jam, one timeout/challenge.
     * 
     * The exception might be injury, but in which case, use the Board Status instead.
     * 
     * @param {Object} team The team to change
     * @param {Number} status Status value
     */
    SetTeamStatus(team, status) {
        if(team.Status == status)
            team.Status = 0;
        else {
            team.Status = status;
        }

        if(team.Status != 0) {
            if(Object.is(team, State.TeamA)) {
                State.TeamB.Status = 0;
            } else {
                State.TeamA.Status = 0;
            }
        }
    },

    /**
     * Sets the team's icon, color, and name.
     * @param {Object} team The team to change
     * @param {Number} index The index of the State.Teams array
     */
    SetTeam(team, index) {
        if(index >= State.Teams.length)
            index = 0;
        else if(index < 0)
            index = State.Teams.length - 1;
        team.Index = index;
    },

    Reset() {
        //ignore if jam clock or game clock is running
        if(this.JamClockState == 1 || this.GameClockState == 1) {
            return;
        }

        //reset teams
        State.TeamA.Score = 0;
        State.TeamA.JamPoints = 0;
        State.TeamA.Timeouts = 3;
        State.TeamA.Challenges = 3;
        State.TeamA.Status = 0;

        State.TeamB.Score = 0;
        State.TeamB.JamPoints = 0;
        State.TeamB.Timeouts = 3;
        State.TeamB.Challenges = 3;
        State.TeamB.Status = 0;

        //reset board details
        State.BoardStatus = 0;
        State.ConfirmStatus = 0;
        State.JamCounter = 0;
        
        State.BreakClockState = 0;
        State.JamClockState = 0;
        State.GameClockState = 0;

        this.SetPhase(0);
        State.GameHour = State.PhaseHour;
        State.GameMinute = State.PhaseMinute;
        State.GameSecond = State.PhaseSecond;
    }
}

export default Controller;