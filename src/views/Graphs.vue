<template lang="html">

    <div class="wrapper">
        <div class="list">
            <ul v-if="listReady">
                <li v-for="(item, index) in currencyList">
                    <label class="check">
                        <input type="checkbox" v-model="marked[index]">
                        {{ item['currency'] }} ({{ item['code'] }})
                    </label>
                </li>
            </ul>
            <div class="lazy-loading" v-if="listReady == false">
                <div class="lds-dual-ring"></div>
            </div>
        </div>
        <div class="graph-pane">
            <div class="form">
                <div>
                    <label for="start">Od daty:</label>
                    <br>
                    <input type="date" id="start" v-model="dates[0]">
                </div>
                <div>
                    <label for="end">Do daty: </label>
                    <br>
                    <input type="date" id="end" v-model="dates[1]">
                </div>
                <div>
                    <input type="submit" @click="drawGraph()" value="Zapytaj">
                </div>
            </div>
            <p v-if="badDates">Błędny zakres dat</p>
            <vue-chart type="line" :data="chartData" responsive="true"></vue-chart>
        </div>
    </div>

</template>

<script>
import VueChart from 'vue-chart-js'
import API from "../api.js";

export default {
    components: {
        VueChart
    },
    data(){
        return {
            currencyList: [],
            marked: [],
            listReady: false,
            dates: [],
            chartData: {
                labels: [],
                datasets: []
            },
            badDates: false
        }
    },
    created(){
        let self = this;

        let time = new Date();
        let day = time.getDate();
        if(day < 10){day = '0'+day;}
        let year = time.getFullYear();
        let month = time.getMonth()+1;
        if(month < 10){month = '0'+month;}
        let today = year+'-'+month+'-'+day;
        self.dates = [today, today];

        var table = new XMLHttpRequest();
        table.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                self.currencyList = JSON.parse(this.responseText)[0]['rates'];
                for(let i=0; i<self.currencyList.length; i++){
                    self.marked.push(false);
                }
                self.listReady = true;
            }
        };
        table.open("GET", API + 'exchangerates/tables/a', true);
        table.send();
    },
    methods: {
        drawGraph(){
            let self = this;
            self.chartData.labels = [];
            self.chartData.datasets = [];
            for(let i=0; i<=self.marked.length; i++){
                if(self.marked[i] == true){
                    let code = self.currencyList[i]['code'];
                    var query = new XMLHttpRequest();

                    query.onreadystatechange = function(){
                        if (this.readyState == 4 && this.status == 200) {
                            self.badDates = false;
                            let response = JSON.parse(this.responseText);

                            let labels = [];
                            let data = [];
                            for (let j=0; j<response['rates'].length; j++) {
                                data.push(response['rates'][j]['mid']);
                                labels.push(response['rates'][j]['effectiveDate']);
                            }
                            self.chartData.labels = labels;
                            self.chartData.datasets.push({
                                label: response['code'],
                                data: data,
                                fill: false,
                                borderColor: self.randColor()
                            });
                        } else {
                            self.badDates = true;
                        }
                    }

                    query.open("GET", API + 'exchangerates/rates/a/'+code+'/'+self.dates[0]+'/'+self.dates[1], false);
                    query.send();
                }
            }
        },
        randColor(){
            let hex1 = Math.floor(Math.random()*256);
            let hex2 = Math.floor(Math.random()*256);
            let hex3 = Math.floor(Math.random()*256);

            let rgb = 'rgb('+hex1+','+hex2+','+hex3+')';

            return rgb;
        }
    }
}
</script>

<style lang="css" scoped>

.wrapper{
    display: flex;
}
.list{
    flex: 1;
    background-color: rgb(55, 55, 55);
    color: rgb(182, 182, 182);
}
.graph-pane{
    flex: 3;
    padding: 15px;
}

ul{
    list-style-type: none;
    margin: 0;
    padding: 0;
}
ul li{
    padding: 0;
    line-height: 200%;
}
.list ul li:hover{
    background-color: black;
    cursor: pointer;
}

label.check{
    width: 100%;
    padding: 0 15px;
    display: block;
}


/* form */
.form{
    background-color: black;
    border-radius: 15px;
    color: white;
    padding: 30px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 25px;
}
.form div{
    flex: 1;
    margin: 20px;
}
input[type=date]{
    width: 100%;
}
input[type=submit]{
    width: 100%;
    height: 100%;
    padding: 10px;
}
@media (max-width: 900px) {
    .wrapper{
        flex-direction: column-reverse;
    }
    .list{
        height: 300px;
        overflow: auto;
    }
    .form{
        padding: 10px;
        flex-direction: column;
    }
    .form div{
        width: 100%;
        margin: 7px;
    }
    input[type=submit]{
        margin-top: 10px;
    }
}

/* chart */
vue-chart{
    max-width: 500px;
    height: auto;
}

</style>
