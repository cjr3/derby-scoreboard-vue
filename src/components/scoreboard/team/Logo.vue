<template>
    <div class="logo" @click="next" @contextmenu.prevent="prev">
        <img :src="LogoSource"/>
    </div>
</template>

<script>
import Controller from '^/components/scoreboard/Controller'
import State from '^/store/scoreboard/state'

/**
 * Default Export
 */
const Logo = {
    props:{
        Team:{
            type:Object,
            required:true
        }
    },
    computed:{
        LogoSource:function() {
            return require("@/assets/logos/" + State.Teams[this.Team.Index].Logo);
        }
    },
    methods:{
        next:function() {
            Controller.SetTeam(this.Team, this.Team.Index+1);
        },
        prev:function() {
            Controller.SetTeam(this.Team, this.Team.Index-1);
        }
    }
}

export default Logo;
</script>