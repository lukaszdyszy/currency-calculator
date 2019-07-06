<template lang="html">
    <div id="app">
        <Menu></Menu>
        <router-view />
    </div>
</template>

<script>
import Menu from './components/Menu.vue';

export default {
    components: {
        Menu
    }
}
</script>

<style lang="css">

*{
    box-sizing: border-box;
    font-family: sans-serif;
}

body{
    font-size: 18px;
    padding: 0;
    margin: 0;
    background-color: rgb(227, 227, 227);
}

.container{
    max-width: 1100px;
    margin: 25px auto;
    padding: 8px;
}

/* loading */
.lds-dual-ring {
    display: inline-block;
    width: 64px;
    height: 64px;
}
.lds-dual-ring:after {
    content: " ";
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
.lazy-loading{
    text-align: center;
}


</style>
