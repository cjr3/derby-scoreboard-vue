<template>
    <button 
        @click.left.stop="$emit('click', $event)" 
        @contextmenu.prevent="$emit('contextmenu')"
        @focus.prevent="focused"
        class="icon" 
        >
        <img :src="ImageSource"/>
    </button>
</template>

<script>
/**
 * Default export
 */
const Icon = {
    props:{
        src:{
            type:String,
            required:true
        }
    },
    computed:{
        ImageSource:function() {
            return require('@/assets/icons/' + this.src);
        }
    },
    methods:{
        focused:function(ev) {
            ev.preventDefault();
            ev.target.blur();
        }
    }
}

export default Icon
</script>