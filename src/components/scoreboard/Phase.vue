<template>
    <div class="phase" @click.stop="next" @contextmenu.prevent="prev">{{PhaseName}}</div>
</template>

<script>
import State from '^/store/scoreboard/state'
import keycodes from '^/store/keycodes'
import Controller from './Controller'
import Icon from './Icon'

/**
 * Button that can be used optionally to control the phase
 */
const PhaseButton = {
    components:{
        Icon
    },
    computed:{
        src:function() {
            return require("@/assets/icons/fastforward.png");
        }
    },
    render(h) {
        return h('Icon', {
            props:{src:'fastforward.png'},
            on:{
                click:() => {Controller.SetPhase(State.PhaseIndex + 1);},
                contextmenu:() => {Controller.SetPhase(State.PhaseIndex - 1);}
            }
        })
    }
}

/**
 * Button to apply phase time to the game clock.
 */
const ClockButton = {
    components:{
        Icon
    },
    render(h) {
        return h('Icon', {
            props:{src:'check.png'},
            on:{
                click:() => {
                    //set game clock time
                    if(State.JamClockState != 1 && State.GameClockState != 1) {
                        [State.GameHour, State.GameMinute, State.GameSecond] = [State.PhaseHour, State.PhaseMinute, State.PhaseSecond];
                    }
                },
                contextmenu:() => {
                    //copy game clock time
                    [State.PhaseHour, State.PhaseMinute, State.PhaseSecond] = [State.GameHour, State.GameMinute, State.GameSecond];
                }
            }
        })
    }
}

/**
 * Text input for phase minutes.
 */
const PhaseMinute = {
    computed:{
        Amount:function() {
            return State.PhaseMinute;
        }
    },
    render(h) {
        var that = this;
        return h('input', {
            domProps:{
                value:that.Amount
            },
            on:{
                keyup:(ev) => {ev.stopPropagation();},
                keydown:(ev) => {
                    if(ev.keyCode == keycodes.SPACEBAR) {
                        ev.target.blur();
                    } else {
                        ev.stopPropagation();
                    }
                },
                input:(ev) => {
                    State.PhaseMinute = ev.target.value;
                }
            },
            attrs:{type:'number',min:0,max:59}
        })
    }
}

/**
 * Text input for phase seconds.
 */
const PhaseSecond = {
    computed:{
        Amount:function() {
            return State.PhaseSecond.toString().padStart(2,'0');
        }
    },
    render(h) {
        var that = this;
        return h('input', {
            domProps:{value:that.Amount},
            on:{
                keyup:(ev) => {
                    ev.stopPropagation();
                },
                keydown:(ev) => {
                    if(ev.keyCode == keycodes.SPACEBAR) {
                        ev.target.blur();
                    } else {
                        ev.stopPropagation();
                    }
                },
                input:(ev) => {
                    State.PhaseSecond = parseInt(ev.target.value);
                },
                focus:(ev) => {ev.target.select();}
            },
            attrs:{type:'number',min:0,max:59,maxlength:2}
        })
    }
}

/**
 * Controls for the phase
 */
const Controls = {
    name:'PhaseControls',
    components: {
        PhaseButton,
        PhaseMinute,
        PhaseSecond,
        ClockButton
    },
    render(h) {
        return h('div', {class:"board-phase-controls"}, [
            h('PhaseButton'),
            h('PhaseMinute'),
            ":",
            h('PhaseSecond'),
            h('ClockButton')
        ])
    }
}

/**
 * Default export
 */
const Phase =  {
    name:'Phase',
    computed:{
        PhaseName:function() {
            return State.Phases[State.PhaseIndex].Name;
        }
    },
    methods:{
        next:function() {
            Controller.SetPhase(State.PhaseIndex + 1);
        },
        prev:function() {
            Controller.SetPhase(State.PhaseIndex - 1);
        }
    }
}

export default Phase
export {Controls}

</script>

<style>
.phase {
    cursor:pointer;
}
.phase:hover {
    background-color: #222222;
}
</style>