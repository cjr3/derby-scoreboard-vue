<template>
    <Counter 
        :Min="-99" 
        :Max="99"
        :InitAmount="JamPoints" 
        :ShowButtons="false"
        :Label="'Jam Points'"
        :bus="CounterBus"
        />
</template>

<script>
import Counter from '^/components/scoreboard/Counter'
import Vue from 'vue'
import State from '^/store/scoreboard/state'

/**
 * Component for confirming jam points with in-field refs.
 */
const ConfirmPanel = {
    props:{
        Team:{
            type:Object,
            required:true
        }
    },
    computed:{
        Amount:function() {
            return this.Team.JamPoints.toString().padStart(2,'0');
        },
        Classes:function() {
            var classes = ['jam-points-confirm'];
            if(State.ConfirmStatus == true)
                classes.push('shown');
            return classes;
        },
        TeamStyle:function() {
            return {backgroundColor:State.Teams[this.Team.Index].Color};
        }
    },
    render(h) {
        var that = this;
        return h('div', {
            class:that.Classes,
            style:this.TeamStyle
        }, [this.Amount])
    }
}

/**
 * Default export
 */
const JamPoints = {
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
    },
    computed:{
        JamPoints:function() {
            return this.Team.JamPoints;
        }
    },
    watch:{
        //watch for changes on the team's jam points
        JamPoints:function(next, prev) {
            if(next == 0) {
                this.CounterBus.$emit('set', this.Team.JamPoints);
            }
            else if(next > prev)
                this.CounterBus.$emit('add');
            else if(next < prev)
                this.CounterBus.$emit('subtract');
        }
    }
}

export default JamPoints;
export {ConfirmPanel}
</script>
<style>
.jam-points-confirm {
    border: solid 3px #FFFFFF;
    border-radius: 6px;
    width: 140px;
    height: 80px;
    font-size: 64px;
    text-align: center;
}

</style>