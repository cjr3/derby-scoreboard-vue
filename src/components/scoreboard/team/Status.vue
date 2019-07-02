<template>
    <div :class="Classes">{{StatusText}}</div>
</template>

<script>
import Icon from '^/components/scoreboard/Icon'
import Controller from '^/components/scoreboard/Controller'

/**
 * Status values
 * text - label
 * name - css class name (for styling)
 */
const status = [
    {text:'', name:''},
    {text:'Lead Jammer', name:'lead-jammer'},
    {text:'Power Jam', name:'power-jam'},
    {text:'Timeout', name:'timeout'},
    {text:'Challenge', name:'challenge'},
    {text:'Injury', name:'injury'}
];

/**
 * Icon to toggle lead / power jam status.
 */
const LeadJamButton = {
    name:'LeadJamButton',
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
            props:{src:'bolt.png'},
            on:{
                click:() => {
                    Controller.ToggleTeamStatus(this.Team, 1);
                },
                contextmenu:() => { 
                    Controller.ToggleTeamStatus(this.Team, 2);
                }
            }
        });
    }
}

/**
 * Icon to toggle timeouts
 */
const TimeoutButton = {
    name:'TimeoutButton',
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
            props:{src:'no.png'},
            on:{
                click:() => {
                    Controller.ToggleTeamStatus(this.Team, 3);
                },
                contextmenu:() => { 
                    Controller.SetTeamStatus(this.Team, 0);
                }
            }
        });
    }
}

/**
 * Icon to toggle challenge status
 */
const ChallengeButton = {
    name:'ChallengeButton',
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
            props:{src:'flag.png'},
            on:{
                click:() => {
                    Controller.ToggleTeamStatus(this.Team, 4);
                },
                contextmenu:() => { 
                    Controller.SetTeamStatus(this.Team, 0);
                }
            }
        });
    }
}

/**
 * Default export
 */
const Status =  {
    name:'TeamStatus',
    props:{
        Team:{
            type:Object,
            required:true
        }
    },
    computed:{
        Classes:function() {
            var classes = ['team-status'];
            if(this.Team.Status) {
                classes.push('shown')
                classes.push(status[this.Team.Status].name);
            }
            return classes;
        },
        StatusText:function() {
            if(status[this.Team.Status])
                return status[this.Team.Status].text;
            return '';
        }
    }
}

export default Status;
export {LeadJamButton, ChallengeButton, TimeoutButton}

</script>

<style>
.team-status {
    border: solid 2px #FFFFFF;
    border-radius: 16px 16px 0px 0px;
    font-size: 28px;
}

.team-status.timeout,
.team-status.challenge
{
    background-color: #990000;
}

.team-status.injury {
    background-color: #006699;
}

.team-status.lead-jammer {
    background-color: #009900;
}

.team-status.power-jam {
    background-color: #CC9900;
}
</style>