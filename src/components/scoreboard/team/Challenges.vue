<template>
    <Counter 
        :Min="0" 
        :Max="3" 
        :InitAmount="3" 
        :ShowButtons="false"
        :Label="'Challenges'"
        :bus="CounterBus"
        />
</template>

<script>
import Counter from '^/components/scoreboard/Counter'
import Vue from 'vue'

const Challenges = {
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
        Challenges:function() {
            return this.Team.Challenges;
        }
    },
    watch:{
        Challenges:function(next, prev) {
            if(next > prev)
                this.CounterBus.$emit('add');
            else if(next < prev)
                this.CounterBus.$emit('subtract');
        }
    }
}

export default Challenges;
</script>