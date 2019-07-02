<template>
    <Clock 
        :ClockState="ClockState" 
        :InitTime="InitTime"
        :bus="ClockBus"
        @clicked="clicked"
        @ticked="ticked"
        class="game-clock"
        />
</template>

<script>
import Clock from './Clock'
import State from '^/store/scoreboard/state'
import Controller from './Controller'
import Icon from './Icon'
import Vue from 'vue'

/**
 * Toggle button for the game clock.
 */
const ToggleButton = {
    components:{
        Icon
    },
    computed:{
        src:function() {
            if(State.GameClockState == 0)
                return 'play.png';
            return 'pause.png';
        }
    },
    render(h) {
        return h('Icon', {
            props:{src:this.src},
            on:{
                click:() => {Controller.ToggleGameClock()}
            }
        });
    }
}

/**
 * Default export
 */
const GameClock = {
    name:'GameClock',
    components:{
        Clock
    },
    created:function() {
        this.ClockBus = new Vue();
    },
    computed:{
        ClockState:function() {
            return State.GameClockState;
        },
        InitTime:function() {
            return [State.GameHour, State.GameMinute, State.GameSecond]
        },
        GameMinute:function() {
            return State.GameMinute
        },
        GameSecond:function() {
            return State.GameSecond;
        }
    },
    watch:{
        GameMinute:function() {
            this.ClockBus.$emit('set', State.GameHour, State.GameMinute, State.GameSecond);
        },
        GameSecond:function() {
            this.ClockBus.$emit('set', State.GameHour, State.GameMinute, State.GameSecond);
        }
    },
    methods:{
        clicked:Controller.ToggleGameClock,
        ticked:function(finished) {
            if(finished) {
                State.GameClockState = 0;
            }
        }
    }
}

export default GameClock;
export {ToggleButton}

</script>

<style>
.game-clock {
    font-size: 96px;
    cursor:pointer;
}
.game-clock:hover {
    background-color: #222222;
}
</style>