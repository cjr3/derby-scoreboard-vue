<template>
    <Clock 
        :ClockState="ClockState" 
        :ClockType="'W'" 
        :MaxSeconds="60"
        :InitTime="[0,0,60]"
        @ticked="ticked"
        class="jam-clock"/>
</template>

<script>
import Clock from './Clock'
import State from '^/store/scoreboard/state'
import Controller from './Controller'

/**
 * Large toggle button
 */
const ToggleButton = {
    computed:{
        Label:function() {
            switch(State.JamClockState) {
                case 1 : return "STOP";
                case 2 : return "READY";
                default : return "JAM";
            }
        },
    },
    render(h) {
        return h('button', {
            class:"icon",
            on:{
                click:Controller.ToggleJamClock
            }
        }, this.Label);
    }
}

/**
 * Default export
 */
const JamClock = {
    name: 'JamClock',
    components:{
        Clock
    },
    computed:{
        ClockState:function() {
            return State.JamClockState;
        }
    },
    methods:{
        ticked:function(finished) {
            if(finished) {
                State.JamClockState = 2;
                State.BreakClockState = 1;
            }
        }
    }
}

export default JamClock;
export {ToggleButton}
</script>

<style>
.jam-clock {
    font-size: 172px;
    text-align: center;
}
</style>