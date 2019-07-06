<template lang="html">

    <div id="graph">
        <vue-chart type="line" :data="chartData"></vue-chart>
        <table>
            <tr>
                <th>Lp</th>
                <th>Waluta</th>
                <th>Kod</th>
                <th>Ostatnio opublikowany kurs</th>
            </tr>
            <tr v-for="(currency, index) in this.$parent.currencyListG">
                <td><input type="checkbox" v-model="checked[index]"></td>
                <td>{{ currency['currency'] }}</td>
                <td>{{ currency['code'] }}</td>
                <td>{{ currency['mid'] }}</td>
            </tr>
        </table>
    </div>

</template>

<script>
import VueChart from 'vue-chart-js'

export default {
    components: {
        VueChart
    },
    data(){
        return {
            checked: [],
            dataForChart: [],
            chartData: {
                labels: [],
                datasets: []
            }
        }
    },
    created(){
        let self = this;
        for(let i=0; i<self.$parent.currencyListG.length; i++){
            self.checked[i] = false;
            var last = new XMLHttpRequest();
            let response;
            last.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    response = JSON.parse(this.responseText);
                    let label = response['code'];
                    let chartLabels = [];
                    let data = [];
                    for(let j=0; j<response['rates'].length; j++){
                        data.push(response['rates'][j]['mid']);
                        chartLabels.push(response['rates'][j]['effectiveDate']);
                    }
                    self.dataForChart.push({
                        label: label,
                        data: data,
                        fill: false,
                        borderColor: self.randColor()
                    });
                    self.chartData['labels'] = chartLabels;
                }
            }
            last.open("GET", 'http://api.nbp.pl/api/exchangerates/rates/a/'+self.$parent.currencyListG[i]['code']+'/last/10', false);
            last.send();
        }
    },
    watch: {
        checked(){
            let self = this;
            self.chartData['datasets'] = [];
            for(let i=0; i<self.checked.length; i++){
                if(self.checked[i] == true){
                    self.chartData['datasets'].push(self.dataForChart[i]);
                }
            }
        }
    },
    methods: {
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

table{
    width: 100%;
    border: 3px solid black;
    border-radius: 15px;
    border-collapse: collapse;
    box-sizing: border-box;
}
table tr:first-child{
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
}
table tr:last-child{
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
}
table td, th{
    padding: 10px;
    text-align: center;
    border: 1px solid black;
}
table th{
    background-color: rgb(36, 36, 36);
    color: rgb(193, 193, 193);
}
table tr:nth-child(odd){
    background-color: rgb(194, 241, 250);
}
table tr:nth-child(even){
    background-color: rgb(242, 242, 242);
}
table tr:hover{
    background-color: rgb(137, 198, 209);
}

</style>
