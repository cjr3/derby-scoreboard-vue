<template>
    <Counter 
        :Min="0" 
        :Max="3" 
        :InitAmount="3" 
        :ShowButtons="false"
        :Label="'Timeouts'"
        :bus="CounterBus"
        />
</template>

<script>
import Counter from '^/components/scoreboard/Counter'
import Vue from 'vue'

/**
 * Default export
 */
const Timeouts = {
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
        Timeouts:function() {
            return this.Team.Timeouts;
        }
    },
    watch:{
        Timeouts:function(next, prev) {
            if(next > prev)
                this.CounterBus.$emit('add');
            else if(next < prev)
                this.CounterBus.$emit('subtract');
        }
    }
}

export default Timeouts;
</script>