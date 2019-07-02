<template>
    <div class="board-status" :style="StatusStyle">{{StatusText}}</div>
</template>

<script>
import State from '^/store/scoreboard/state'
import Controller from './Controller'
import Icon from './Icon'

/**
 * Official Timeout Button
 */
const OTOButton = {
    components:{
        Icon
    },
    render(h) {
        return h('Icon', {
            props:{src:'oto.png'},
            on:{
                click:() => {
                    Controller.SetBoardStatus(1);
                }
            }
        })
    }
}

/**
 * Injury Button
 */
const InjuryButton = {
    components:{
        Icon
    },
    render(h) {
        return h('Icon', {
            props:{src:'injury.png'},
            on:{
                click:() => {
                    Controller.SetBoardStatus(2);
                }
            }
        })
    }
}

/**
 * Points Confirmation Button
 */
const ConfirmButton = {
    components:{
        Icon
    },
    render(h) {
        return h('Icon', {
            props:{src:'check.png'},
            on:{
                click:() => {
                    Controller.ToggleConfirmPoints();
                }
            }
        })
    }
}

/**
 * Button to reset the board.
 * Should be control-clicked!
 */
const ResetButton = {
    components:{
        Icon
    },
    render(h) {
        return h('Icon', {
            props:{src:'reset.png'},
            on:{
                click:function(ev) {
                    if(ev.ctrlKey) {
                        Controller.Reset();
                    }
                }
            }
        })
    }
}

/**
 * Board Status Controls
 */
const Controls = {
    components:{
        OTOButton,
        InjuryButton,
        ConfirmButton,
        ResetButton
    },
    render(h) {
        return h('div', {class:"board-status-controls"}, [
            h('OTOButton'),
            h('InjuryButton'),
            h('ConfirmButton'),
            h('ResetButton')
        ]);
    }
}

/**
 * Default export
 */
const BoardStatus = {
    name:"BoardStatus",
    computed:{
        StatusStyle:function() {
            var color = "transparent";
            switch(State.BoardStatus) {
                case 1 : 
                    color = "#990000";
                    break;
                case 2 :
                    color = "#006699";
                    break;
            }
            return {
                backgroundColor:color
            }
        },
        StatusText:function() {
            var text = "";
            switch(State.BoardStatus) {
                case 1 : 
                    text = "OFFICIAL TIMEOUT";
                    break;
                case 2 :
                    text = "INJURY TIMEOUT";
                    break;
            }
            return text;
        }
    }
}

export default BoardStatus;
export {Controls}

</script>