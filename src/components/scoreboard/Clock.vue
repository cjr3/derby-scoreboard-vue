<template>
    <div
        @contextmenu.prevent="ShowTenths = !ShowTenths"
        @click="clicked"
        class="clock"
        :style="ClockStyle"
        >{{ClockTime}}</div>
</template>

<script>

/**
 * Default export
 */
const Clock = {
    name:"Clock",
    props:{
        ClockType:{
            Type:String,
            default:'C'
        },
        MaxSeconds:{
            Type:Number,
            default:0
        },
        InitTime:{
            type:Array,
            default:function(){return [0,0,0];}
        },
        ClockState:{
            type:Number,
            default:0
        },
        bus:{
            type:Object,
            default:null
        }
    },
    data:function() {
        return {
            ShowTenths:false,
            Hour:0,
            Minute:0,
            Second:0,
            Tenths:0
        };
    },
    created:function() {
        this.Timer = null;
        if(this.ClockType === 'W') {
            this.Second = this.MaxSeconds;
        }
        this.Hour = this.InitTime[0];
        this.Minute = this.InitTime[1];
        this.Second = this.InitTime[2];

        if(this.bus != null) {
            this.bus.$on('set', this.set)
        }
    },
    computed:{
        ClockTime:function() {
            var str = "";
            if(this.ClockType == 'C') {
                if(this.Hour > 0)
                    str = this.pad(this.Hour) + ":";
                str += this.pad(this.Minute) + ":";
            }

            str += this.pad(this.Second);

            if(this.ShowTenths)
                str += "." + this.Tenths;

            return str;
        },
        ClockStyle:function() {
            var color = "#FFFFFF";
            switch(this.ClockState) {
                case 1 : 
                    color = "#33CCFF"; 
                    if(this.Hour <= 0 && this.Minute <= 0) {
                        if(this.Second <= 4 || (this.Second === 5 && this.Tenths === 0))
                            color = "#FF9900";
                        else if(this.Second <= 9 || (this.Second === 10 && this.Tenths === 0))
                            color = "#FFCC00";
                    }
                    break;
                case 2 : color = "#DDDDDD"; break;
            }
            return {
                color:color
            };
        },
        finished:function() {
            if(this.Hour <= 0 && this.Minute <= 0 && this.Second <= 0 && this.Tenths <= 0)
                return true;
            return false;
        }
    },
    watch:{
        ClockState:function(next, prev) {
            if(next == 1 && prev == 0) {
                this.start();
            } else if(next == 2 && prev == 1) {
                this.stop();
            } else if(next == 0 && prev == 2) {
                this.reset();
            } else if(next === 0 && prev === 1) {
                if(this.ClockType == 'W')
                    this.reset();
                else
                    this.stop();
            }
        }
    },
    methods:{
        clicked:function() {
            this.$emit('clicked');
        },
        pad:function(s) {
            return s.toString().padStart(2,'0');
        },
        set:function(hour, minute, second) {
            if(this.ClockState != 1) {
                this.Hour = hour;
                this.Minute = minute;
                this.Second = second;
                this.Tenths = 0;
            }
        },
        tick:function() {
            this.clear();

            var hour = this.Hour;
            var minute = this.Minute;
            var second = this.Second;
            var tenths = this.Tenths;

            tenths--;
            if(tenths < 0) {
                tenths = 9;
                second--;
                if(second < 0) {
                    second = 59;
                    minute--;
                    if(minute < 0) {
                        hour--;
                        minute = 59;
                        if(hour < 0) {
                            second = 0;
                            minute = 0;
                        }
                    }
                }

                this.Tenths = tenths;
                this.Second = second;
                this.Minute = minute;
                this.Hour = hour;
                this.$emit('ticked', this.finished, this.ClockState);

                if(!this.finished && this.ClockState == 1) {
                    this.Timer = setTimeout(this.tick, 100);
                }
            }
            else {
                this.Tenths = tenths;
                this.$emit('ticked', this.finished, this.ClockState);
                if(!this.finished && this.ClockState == 1) {
                    this.Timer = setTimeout(this.tick, 100);
                }
            }
        },
        start:function() {
            this.tick();
        },
        stop:function() {
            this.clear();
        },
        reset:function() {
            this.clear();
            this.Tenths = 0;
            this.Hour = this.InitTime[0];
            this.Minute = this.InitTime[1];
            this.Second = this.InitTime[2];
        },
        clear() {
            try {
                if(typeof(this.Timer) === "number")
                    clearTimeout(this.Timer);
            }
            catch(er) {
                throw er;
            }
        }
    }
}

export default Clock;
</script>