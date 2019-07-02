<template>
    <div class="scoreboard" @contextmenu.prevent>
        <ScoreboardTeamA class="team-a" :Team="TeamA"/>
        <div class="scoreboard-center">
            <JamClock class="jam-clock"/>
            <JamCounter class="jam-counter"/>
            <BreakClock class="break-clock"/>
            <BoardStatus class="board-status"/>
            <Phase class="phase"/>
            <GameClock class="game-clock"/>
            <!-- global controls -->
            <div class="jam-control">
                <JamClockButton/>
                <GameClockButton/>
            </div>
        </div>
        <ScoreboardTeamB class="team-b" :Team="TeamB"/>
        <StatusControls/>
        <PhaseControls/>
    </div>
</template>

<script>
import State from '^/store/scoreboard/state'
import Controller from './Controller'
import {default as JamClock, ToggleButton as JamClockButton} from './JamClock'
import {default as GameClock, ToggleButton as GameClockButton} from './GameClock'
import BreakClock from './BreakClock'
import JamCounter from './JamCounter'
import Team from './team/Team'
import {default as Phase, Controls as PhaseControls} from './Phase'
import {default as BoardStatus, Controls as StatusControls} from './BoardStatus'
import keycodes from '^/store/keycodes'

/**
 * Default export
 */
const Scoreboard = {
    name:'Scoreboard',
    components:{
        JamClock,
        JamClockButton,
        GameClock,
        GameClockButton,
        JamCounter,
        BreakClock,
        ScoreboardTeamA:Team,
        ScoreboardTeamB:Team,
        Phase,
        PhaseControls,
        BoardStatus,
        StatusControls
    },
    data:function() {
        return State;
    },
    mounted:function() {
        //listen to keyboard events at the document level
        document.addEventListener('keyup', this.onKeyUp);
    },
    methods:{
        onKeyUp:function(ev) {
            var listen = true;
            var prevent = false;

            if(State.JamClockState == 1) {
                listen = false;
                prevent = true;
                switch( ev.keyCode ) {
                    case keycodes.SPACEBAR :
                    case keycodes.Q :
                    case keycodes.W :
                    case keycodes.F :
                    case keycodes.LEFT :
                    case keycodes.RIGHT :
                    case keycodes.COMMA :
                    case keycodes.PERIOD :
                    case keycodes.SEMICOLON :
                    case keycodes.SINGLEQUOTE :
                    case keycodes.ESCAPE :
                        listen = true;
                        prevent = false;
                        break;
                }
            } else {
                
                switch( ev.target.tagName.toLowerCase() ) {
                    //input elements
                    //textarea
                    case "textarea" :
                    case "input" :
                        listen = false;
                        switch( ev.keyCode ) {
                            //user can press ctrl+space to start the jam clock
                            case keycodes.SPACEBAR :
                                if( ev.ctrlKey )
                                    listen = true;
                                break;
                        }
                        break;

                    case "button" :
                        listen = true;
                        ev.target.blur();
                        ev.preventDefault();
                        ev.stopPropagation();
                        break;
                }
            }

            if(!listen) {
                ev.stopPropagation();
                if(prevent)
                    ev.preventDefault();
                return false;
            }

            switch(ev.keyCode) {
                //spacebar
                case keycodes.SPACEBAR :
                case keycodes.ENTER :
                    Controller.ToggleJamClock();
                    break;

                //Team A Score
                case keycodes.LEFT :
                    State.TeamA.Score += (ev.shiftKey) ? -1 : 1;
                    break;

                //Team B Score
                case keycodes.RIGHT :
                    State.TeamB.Score += (ev.shiftKey) ? -1 : 1;
                    break;

                //Game Clock
                case keycodes.DOWN :
                    Controller.ToggleGameClock();
                    break;

                //break clock
                case keycodes.UP :
                    if(State.JamClockState != 1) {

                        if(ev.ctrlKey) {
                            //official timeout
                            State.BoardStatus = 1;
                        } else if(ev.shiftKey) {
                            //injury timeout
                            State.BoardStatus = 2;
                        }

                        Controller.ToggleBreakClock();
                    }
                    break;

                //Confirm points
                case keycodes.A :
                    Controller.ToggleConfirmPoints();
                    break;

                //lead jammer A
                case keycodes.Q :
                    if( ev.shiftKey ) {
                        Controller.ToggleTeamStatus(State.TeamA, 2);
                    } else {
                        Controller.ToggleTeamStatus(State.TeamA, 1);
                    }
                    break;

                    //lead jammer B
                case keycodes.W :
                    if( ev.shiftKey ) {
                        Controller.ToggleTeamStatus(State.TeamB, 2);
                    } else {
                        Controller.ToggleTeamStatus(State.TeamB, 1);
                    }
                    break;

                //toggle team A timeout/challenge status label
                case keycodes.OPENBRACKET :
                    if( ev.shiftKey ) {
                        Controller.ToggleTeamStatus(State.TeamA, 4);
                    } else {
                        Controller.ToggleTeamStatus(State.TeamA, 3);
                    }
                    break;

                    //toggle team B timeout/challenge status label
                case keycodes.CLOSEBRACKET :
                    if( ev.shiftKey ) {
                        Controller.ToggleTeamStatus(State.TeamB, 4);
                    } else {
                        Controller.ToggleTeamStatus(State.TeamB, 3);
                    }
                    break;

                    //increase/decrease team A timeouts
                case keycodes.COMMA :
                    if( ev.shiftKey )
                        State.TeamA.Timeouts++;
                    else
                        State.TeamA.Timeouts--;
                    break;

                    //increase/decrease team A challenges
                case keycodes.SEMICOLON :
                    if( ev.shiftKey )
                        State.TeamA.Challenges++;
                    else
                        State.TeamA.Challenges--;
                    break;

                    //increase/decrease team B timeouts
                case keycodes.PERIOD :
                    if( ev.shiftKey )
                        State.TeamB.Timeouts++;
                    else
                        State.TeamB.Timeouts--;
                    break;

                    //increase/decrease team B challenges
                case keycodes.SINGLEQUOTE :
                    if( ev.shiftKey )
                        State.TeamB.Challenges++;
                    else
                        State.TeamB.Challenges--;
                    break;

                    //phase change
                case keycodes.P :
                    if(ev.shiftKey)
                        Controller.SetPhase(State.PhaseIndex - 1);
                    else
                        Controller.SetPhase(State.PhaseIndex + 1);
                    break;

                //reset board
                case keycodes.F2 :
                    if(ev.shiftKey) {
                        ev.preventDefault();
                        State.TeamA.Score = 0;
                        State.TeamB.Score = 0;
                    }
                    break;

                default :
                    //alert(ev.keyCode)
                break;
            }
        }
    }
}

export default Scoreboard;
</script>

<style>
.scoreboard {
    background-color: #000000;
    color: #FFFFFF;
    user-select:none;
    font-family: 'Liquid Crystal', 'Arial';
    text-transform: uppercase;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
}

.scoreboard-center {
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    width: 30%;
    height: 100%;
    overflow: hidden;
}

.jam-control {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 24px;
    display: flex;
    max-width: 300px;
}

.game-clock {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 96px;
    text-align: center;
}

button.icon {
    background-color: #191919;
    color: #FFFFFF;
    text-align: center;
    width: 36px;
    height: 36px;
    line-height: 36px;
    border: solid 2px #FFFFFF;
    border-radius: 1px;
    cursor:pointer;
    font-size: 36px;
    padding: 0px;
}

button.icon:hover {
    background-color: #333333;
}

button.icon > img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    padding: 3px;
}

.team {
    position: absolute;
    margin: auto;
    top: 16px;
    width: calc(35% - 102px);
    height: calc(100% - 16px);
}

.team .controls {
    position: absolute;
    margin: auto;
    bottom: 0;
}

.team-a {
    left: 66px;
}

.team-a .controls {
    flex-flow: row-reverse;
    right: 16px;
    bottom: 24px;
}

.team-a .jam-points-confirm {
    right: 0;
    text-align: right;
    padding-right: 8px;
    transition: transform 150ms linear;
}

.team-a .jam-points-confirm.shown {
    transform: translateX(100px);
}

.team-b {
    right: 66px;
}

.team-b .controls {
    bottom: 24px;
    left: 16px;
}

.team-b .jam-points-confirm {
    left: 0;
    text-align: left;
    padding-left: 8px;
    transition: transform 150ms linear;
}

.team-b .jam-points-confirm.shown {
    transform: translateX(-100px);
}

.jam-control button:first-child {
    flex: 1;
    font-weight: bold;
    height: 48px;
}

.jam-control button:last-child {
    flex: 0 0 48px;
    height: 48px;
}

.board-status-controls {
    position: absolute;
    margin: auto;
    left: 48px;
    bottom: 24px;
}

.board-phase-controls {
    position: absolute;
    margin: auto;
    right: 48px;
    bottom: 24px;
}

.scoreboard input[type="number"] {
    background-color: #111111;
    color: #FFFFFF;
    border: solid 1px #999999;
    font-size: 24px;
}

.scoreboard .board-phase-controls input[type="number"] {
    width: 36px;
    text-align: center;
    height: 36px;
    vertical-align: top;
    border: solid 2px #999999;
}

.scoreboard input[type="number"]::-webkit-outer-spin-button,
.scoreboard input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.jam-clock {
    margin-bottom: 32px;
}

.jam-counter {
    font-size: 36px;
}

.break-clock {
    font-size: 36px;
}

.phase {
    font-size: 36px;
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    bottom: 200px;
}

.board-status {
    font-size: 24px;
    padding: 3px;
    text-align: center;
    border-radius: 5px;
}

</style>