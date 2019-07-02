<template>
    <Counter 
        :Min="0" 
        :Max="999" 
        :InitAmount="Score"
        :bus="CounterBus"
        :style="TeamStyle"
        />
</template>

<script>
import Counter from '^/components/scoreboard/Counter'
import Icon from '^/components/scoreboard/Icon'
import State from '^/store/scoreboard/state'
import Vue from 'vue'

/**
 * Score Button
 */
const ScoreButton = {
    name:'ScoreButton',
    components:{
        Icon
    },
    props:{
        Team:{
            type:Object,
            required:true
        }
    },
    render(h) {
        return h('Icon', {
            props:{src:'plus.png'},
            on:{
                click:() => { this.Team.Score++; },
                contextmenu:() => { this.Team.Score--; }
            }
        });
    }
}

/**
 * Default Export
 */
const Score = {
    components:{
        Counter
    },
    props:{
        Team:{
            type:Object,
            required:true
        }
    },
    created:function() {
        this.CounterBus = new Vue();
        this.CounterBus.$on('added', this.added);
        this.CounterBus.$on('subtracted', this.subtracted);
    },
    computed:{
        Score:function() {
            return this.Team.Score;
        },
        TeamStyle:function() {
            return  {
                backgroundColor:State.Teams[this.Team.Index].Color
            };
        }
    },
    watch:{
        Score:function(next, prev) {
            if(next == 0) {
                this.CounterBus.$emit('set', this.Team.Score);
            }
            else if(next > prev)
                this.CounterBus.$emit('add');
            else if(next < prev)
                this.CounterBus.$emit('subtract');
        }
    },
    methods:{
        added:function() {
            this.Team.JamPoints++;
        },
        subtracted:function() {
            this.Team.JamPoints--;
        }
    }
}

export default Score;
export {ScoreButton};

</script>