<template lang="html">

    <div id="monitor">
        <div class="title">
            <h2>Aktualna cena</h2>
            <span class="c-date">({{ currentPrice['data'] }})</span>
        </div>
        <div class="price">
            <span class="c-price">{{ currentPrice['cena'] }} zl</span>
            <span class="c-date">(cena 1g zlota w próbie 1000)</span>
        </div>
    </div>

</template>

<script>
export default {
    data(){
        return {
            currentPrice: {}
        }
    },
    created(){
        let self = this;
        
        var price = new XMLHttpRequest();
        price.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                self.currentPrice = JSON.parse(this.responseText)[0];
            }
        };
        price.open("GET", 'http://api.nbp.pl/api/cenyzlota', true);
        price.send();
    }
}
</script>

<style lang="css" scoped>
#monitor{
    display: flex;
    padding-bottom: 30px;
    border-bottom: 1px solid rgba(7, 96, 75, 0.78);
}
.title{
    flex: 1;
    text-align: center;
}
.price{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
h2{
    font-size: 1.65rem;
    padding: 5px 0;
    margin: 0;
    letter-spacing: 3px;
}
span.c-date{
    font-size: 0.9rem;
}
span.c-price{
    font-size: 1.3rem;
    font-weight: 600;
}
</style>
