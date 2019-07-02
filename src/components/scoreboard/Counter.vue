<template>
    <div class="counter">
        <span v-if="Label" class="counter-label">
            {{Label}}
        </span>
        <span @click.left="add" @contextmenu.prevent="subtract" class="counter-value">{{AmountText}}</span>
        <span v-if="ShowButtons" class="buttons">
            <Icon @click="add" :src="IconAdd"/>
            <Icon @click="subtract" :src="IconSub"/>
        </span>
    </div>
</template>

<script>
import Icon from './Icon'

const Counter = {
    components:{
        Icon
    },
    name:'Counter',
    props:{
        InitAmount:{
            type:Number,
            default:0
        },
        Min:{
            type:Number,
            default:0
        },
        Max:{
            type:Number,
            default:999
        },
        Label:{
            type:String,
            default:''
        },
        ShowButtons:{
            type:Boolean,
            default:false
        },
        Padding:{
            type:Number,
            default:0
        },
        bus:{
            type:Object,
            default:null
        }
    },
    data:function() {
        var amount = this.InitAmount;
        if(amount > this.Max)
            amount = this.Max;
        else if(amount < this.Min)
            amount = this.Min;
        return {
            Amount:amount,
            IconAdd:'plus.png',
            IconSub:'minus.png'
        };
    },
    created:function() {
        if(this.bus != null)
        {
            this.bus.$on('add', this.add);
            this.bus.$on('subtract', this.subtract);
            this.bus.$on('reset', this.reset);
            this.bus.$on('set', this.set);
        }
    },
    methods:{
        add:function() {
            if((this.Amount + 1) > this.Max)
                this.Amount = this.Max;
            else
                this.Amount++;
            if(this.bus != null)
                this.bus.$emit('added', this.Amount);
        },
        subtract:function() {
            if((this.Amount - 1) < this.Min)
                this.Amount = this.Min;
            else
                this.Amount--;
            if(this.bus != null)
                this.bus.$emit('subtracted', this.Amount);
        },
        reset:function() {
            this.Amount = this.InitAmount;
            if(this.bus != null)
                this.bus.$emit('reseted', this.Amount);
        },
        set:function(amount) {
            if(amount < this.Min)
                amount = this.Min;
            else if(amount > this.Max)
                amount = this.Max;
            this.Amount = amount;
            if(this.bus != null)
                this.bus.$emit('changed', this.Amount);
        }
    },
    computed:{
        AmountText:function() {
            return this.Amount.toString().padStart(this.Padding, '0');
        }
    }
}

export default Counter;
</script>

<style>
.counter {
    display: flex;
    flex-flow: row wrap;
}

.counter .counter-value {
    text-align: center;
    flex: 1;
    cursor: pointer;
}

.counter .counter-label {
    flex: 1;
}

.counter .buttons {
    flex: 0 0 72px;
    text-align: right;
}

.counter .buttons > button {
    padding: 0px;
    position: relative;
    width: 32px;
    height: 32px;
}

.counter .buttons > button > img {
    width: 32px;
    height: 32px;
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
}
</style>