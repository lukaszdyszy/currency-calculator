<template lang="html">
    <div id="header">
        <div class="logo">
            <img src="../assets/money17-512.png" class="icon">
            Kalkulator Walut
        </div>
        <div class="r-head">
            <i class="fas fa-bars fa-2x" @click="Mopened = !Mopened"></i>
        </div>
        <div style="clear: both;"></div>
        <div class="menu" :class="{'opened': Mopened}">
            <i class="fas fa-times fa-2x" @click="Mopened = !Mopened"></i>
            <div class="links" @click="Mopened = !Mopened">
                <router-link to="/">Kalkulator</router-link>
                <router-link to="/gold">Złoto</router-link>
                <router-link to="/graphs">Wykresy</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            Mopened: false
        }
    }
}
</script>

<style lang="css" scoped>
#header{
    width: 100%;
    background-color: white;
}
.logo{
    width: 50%;
    float: left;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.5rem;
    letter-spacing: 3px;
}
img.icon{
    width: 64px;
    height: auto;
    margin: 10px;
}
.r-head{
    float: right;
    display: flex;
    justify-content: flex-end;
}
.menu{
    background-color: black;
    color: white;
    position: fixed;
    top: 0;
    right: 0;
    width: 0;
    transition: 0.85s;
    height: 100vh;
}
.opened{
    width: 500px;
    transition: 0.85s;
}

@media(max-width: 500px){
    .opened{
        width: 100vw;
    }
}

i.fa-bars{
    padding: 20px;
}
i.fa-bars:hover{
    cursor: pointer;
}

i.fa-times{
    position: absolute;
    top: 15px;
    left: 15px;
    cursor: pointer;
}
i.ico{
    padding: 10px 25px;
    opacity: 0.6;
}
i.ico:hover{
    opacity: 1;
}

a.icons{
    font-size: 1rem;
    line-height: 100%;
    padding: 0;
    letter-spacing: normal;
}

a{
    color: inherit;
    display: block;
    font-size: 2rem;
    line-height: 200%;
    padding: 0 70px;
    text-align: center;
    text-decoration: none;
    letter-spacing: 3px;
}
 .links{
    padding-top: 50px;
}
a.router-link-exact-active{
    color: rgb(36, 175, 158);
}
</style>
