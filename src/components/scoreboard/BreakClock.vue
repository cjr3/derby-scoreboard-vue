<template>
    <div class="break-clock">
        <span>Break</span>
        <Clock 
            :ClockState="ClockState" 
            :ClockType="ClockType" 
            :MaxSeconds="MaxSeconds"
            :InitTime="[0,0,MaxSeconds]"
            @clicked="clicked"
            @ticked="ticked"
            class="clock"/>
        <ToggleButton/>
    </div>
</template>

<script>
import Clock from './Clock'
import State from '^/store/scoreboard/state'
import Controller from './Controller'
import Icon from './Icon'

/**
 * Toggle button for the game clock.
 */
const ToggleButton = {
    components:{
        Icon
    },
    computed:{
        src:function() {
            if(State.BreakClockState == 0)
                return 'play.png';
            return 'pause.png';
        }
    },
    render(h) {
        return h('Icon', {
            props:{src:this.src},
            on:{
                click:() => {Controller.ToggleBreakClock();}
            }
        });
    }
}

/**
 * Default export
 */
const BreakClock = {
    name: 'BreakClock',
    components:{
        Clock,
        ToggleButton
    },
    data:function() {
        return {
            MaxSeconds:30,
            ClockType:"W"
        }
    },
    computed:{
        ClockState:function() {
            return State.BreakClockState
        }
    },
    methods:{
        clicked:Controller.ToggleBreakClock,
        ticked:function(finished) {
            if(finished) {
                if(State.JamClockState == 0)
                {
                    State.BreakClockState = 0;
                    State.GameClockState = 0;
                }
            }
        }
    }
}

export default BreakClock;
</script>

<style>
.break-clock {
    display: flex;
    flex-flow: row wrap;
}

.break-clock > span:first-child {
    flex: 1;
}

.break-clock .clock {
    flex: 0 0 134px;
    cursor:pointer;
}

.break-clock button.icon {
    flex: 0 0 32px;
    height: 32px;
}
</style>