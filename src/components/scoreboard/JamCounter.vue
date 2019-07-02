<template>
    <Counter 
        :Min="0" 
        :Max="99"
        :InitAmount="JamCounter" 
        :ShowButtons="true"
        :Padding="2"
        :Label="'Jam #'"
        :bus="CounterBus"
        />
</template>

<script>
import Counter from './Counter'
import Vue from 'vue';
import State from '^/store/scoreboard/state'

/**
 * Default export
 */
const JamCounter = {
    name:'JamCounter',
    components:{
        Counter
    },
    created:function() {
        this.CounterBus = new Vue();
    },
    computed:{
        JamCounter:function() {
            return State.JamCounter;
        }
    },
    watch:{
        JamCounter:function(next, prev) {
            if(next == 0) {
                this.CounterBus.$emit('set', State.JamCounter);
            }
            else if(next > prev)
                this.CounterBus.$emit('add');
            else if(next < prev)
                this.CounterBus.$emit('subtract');
        }
    }
}

export default JamCounter
</script>
<style>
.jam-counter .counter-value {
    flex: 0 0 150px;
}

.jam-counter .counter-label {
    flex: 1;
}
</style>