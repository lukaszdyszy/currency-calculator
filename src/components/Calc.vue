<template lang="html">

    <div id="calc">
        <div class="currency-field">
            <select class="curr-select" v-model="curr1">
                <option v-for="(currency, index) in this.$parent.currencyList" :value="index">{{ currency['currency'] }}</option>
            </select>
            <input type="number" step="0.01" min="0" v-model="val1">
        </div>
        <div class="rev" @click="reverse()">
            <img v-if="orientation == 'landscape'" src="~../assets/rev.png" alt="odwróć">
            <img v-else src="~../assets/rev2.png" alt="odwróć">
        </div>
        <div class="currency-field">
            <select class="curr-select" v-model="curr2">
                <option v-for="(currency, index) in this.$parent.currencyList" :value="index">{{ currency['currency'] }}</option>
            </select>
            <input type="number" step="0.01" min="0" :value="calculatedVal" disabled>
        </div>
    </div>

</template>

<script>
export default {
    data(){
        return {
            curr1: 0,
            val1: 1,
            curr2: 2,
            orientation: 'landscape'
        }
    },
    mounted(){
        let self = this;
        this.orientation = this.orient();
        window.addEventListener('resize', function(){
            self.orientation = self.orient();
        });
    },
    computed: {
        calculatedVal(){
            let toPln = this.val1 * this.$parent.currencyList[this.curr1]['mid'];
            let result = toPln / this.$parent.currencyList[this.curr2]['mid'];
            return result.toFixed(2);
        }
    },
    methods: {
        reverse(){
            let tmp = this.curr1;
            this.curr1 = this.curr2;
            this.curr2 = tmp;
        },
        orient(){
            if(window.innerHeight > window.innerWidth){
                return 'portrait';
            } else {
                return 'landscape';
            }
        }
    }
}
</script>

<style lang="css" scoped>

#calc{
    display: flex;
    justify-content: space-between;
    margin: 30px 0;
}
.currency-field{
    flex: 2;
    border: 1px solid rgb(52, 150, 147);
    border-radius: 15px;
    background-color: white;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.currency-field input, .currency-field select{
    padding: 7px;
    margin: 15px;
}
.currency-field select{
    text-align: center;
}
.currency-field input{
    text-align: right;
}

.rev{
    flex: 1;
    display: flex;
    padding: 25px;
    justify-content: center;
    align-items: center;
}

.rev img{
    width: 100%;
    height: auto;
}

.rev:hover{
    cursor: pointer;
}

@media(max-width: 900px) and (orientation: landscape){
    .currency-field, .rev{
        padding: 5px;
    }
    .currency-field{
        border-radius: 8px;
    }
    .currency-field input, .currency-field select{
        padding: 3px;
        margin: 5px 0;
        width: 100%;
    }
}

@media(orientation: portrait){
    #calc{
        flex-direction: column;
    }
    .rev{
        padding: 5px;
    }
    .rev img{
        width: 100%;
        height: auto;
    }
}


</style>
