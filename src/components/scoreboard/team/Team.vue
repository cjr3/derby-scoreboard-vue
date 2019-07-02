<template>
    <div class="team">
        <Logo :Team="Team"/>
        <Status :Team="Team"/>
        <JamPointConfirm :Team="Team"/>
        <ScoreCounter :Team="Team" class="score"/>
        <div class="team-controls">
            <JamPointCounter :Team="Team" class="counter-piece"/>
            <TimeoutCounter :Team="Team" class="counter-piece"/>
            <ChallengeCounter :Team="Team" class="counter-piece"/>
        </div>
        <div class="controls">
            <ScoreButton :Team="Team"/>
            <LeadJamButton :Team="Team"/>
            <TimeoutButton :Team="Team"/>
            <ChallengeButton :Team="Team"/>
        </div>
    </div>
</template>

<script>
import {default as Status, LeadJamButton, TimeoutButton, ChallengeButton} from './Status'
import {default as JamPointCounter, ConfirmPanel as JamPointConfirm} from './JamPoints'
import TimeoutCounter from './Timeouts'
import ChallengeCounter from './Challenges'
import {default as ScoreCounter, ScoreButton} from './Score'
import Logo from './Logo'

/**
 * Default export
 */
const Team = {
    name:'ScoreboardTeam',
    props:{
        Team:{
            Type:Object,
            required:true
        }
    },
    components:{
        ScoreCounter,
        TimeoutCounter,
        ChallengeCounter,
        JamPointCounter,
        Status,
        ScoreButton,
        LeadJamButton,
        TimeoutButton,
        ChallengeButton,
        Logo,
        JamPointConfirm
    }
}

export default Team;
</script>

<style>
.team {
    text-align: center;
    position: relative;
}

.team .team-status {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 165px;
    z-index: 2;
    height: 50px;
    transform: translateY(50px);
    transition: transform 150ms linear, background-color 300ms linear;
}

.team .team-status.shown {
    transform: translateY(0px);
}

.team .jam-points-confirm {
    position: absolute;
    z-index: 2;
    top: 250px;
}

.logo {
    position: absolute;
    text-align: center;
    z-index: 1;
    width: 100%;
    margin: auto;
}

.logo > img {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    max-width: 200px;
    max-height: 200px;
    cursor:pointer;
}

.score {
    position: absolute;
    top: 200px;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 3;
    font-size: 128px;
    text-align: center;
    border-radius: 16px;
    border: solid 3px #FFFFFF;
    cursor: pointer;
    line-height: 128px;
    padding: 0px 0px 16px 0px;
    margin-bottom: 16px;
}

.team-controls {
    position: absolute;
    width: 100%;
    margin: auto;
    bottom: 64px;
}

.counter-piece {
    font-size: 24px;
    margin-bottom: 16px;
    max-width: 300px;
}

.controls {
    display: flex;
    flex-flow: row wrap;
}
</style>