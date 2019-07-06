<template lang="html">

    <div id="query-gold">
        <h2>Zobacz ceny złota</h2>
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
                <input type="submit" @click="Query()" value="Zapytaj" :disabled="badDates">
            </div>
        </div>
        <table v-if="tableReady">
            <tr>
                <th>Data</th>
                <th>Cena</th>
            </tr>
            <tr v-for="day in data">
                <td>{{ day['data'] }}</td>
                <td>{{ day['cena'] }}</td>
            </tr>
        </table>
        <p v-if="error">Błędny zakres dat</p>
        <div class="lazy-loading" v-if="loading">
            <div class="lds-dual-ring" v-if="loading"></div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            dates: [],
            badDates: false,
            data: [],
            tableReady: false,
            loading: false,
            error: false
        }
    },
    created(){
        let time = new Date();
        let day = time.getDate();
        if(day < 10){day = '0'+day;}
        let year = time.getFullYear();
        let month = time.getMonth()+1;
        if(month < 10){month = '0'+month;}
        let today = year+'-'+month+'-'+day;
        this.dates = [today, today];
    },
    methods: {
        Query(){
            let self = this;

            this.tableReady = false;
            this.loading = true;

            let start = this.dates[0];
            let end = this.dates[1];

            var query = new XMLHttpRequest();
            query.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    self.data = JSON.parse(this.responseText);

                    self.loading = false;
                    self.tableReady = true;
                    self.error = false;
                } else {
                    self.loading = false;
                    self.error = true;
                }
            }
            query.open("GET", 'http://api.nbp.pl/api/cenyzlota/'+start+'/'+end, true);
            query.send();
        }
    },
    watch: {
        dates(){
            let st = new Date(this.dates[0]);
            let en = new Date(this.dates[1]);
            if(st >= en){
                this.badDates = true;
            } else {
                this.badDates = false;
            }
        }
    }
}
</script>

<style lang="css" scoped>
h2{
    margin-top: 50px;
}
.form{
    background-color: black;
    border-radius: 15px;
    color: white;
    padding: 30px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
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


table{
    width: 500px;
    border: 3px solid black;
    border-radius: 15px;
    border-collapse: collapse;
    box-sizing: border-box;
    margin: 20px auto;
}
table td, th{
    padding: 10px;
    text-align: center;
    border: 1px solid black;
}
table tr:nth-child(odd){
    background-color: rgb(226, 226, 226);
}
table tr:nth-child(even){
    background-color: rgb(255, 255, 255);
}
table tr:first-child{
    background-color: rgb(60, 60, 60);
    color: rgb(223, 223, 223);
}
table tr:hover{
    background-color: rgb(159, 146, 96);
}

@media(max-width: 500px){
    table{
        width: 100%;
    }
}
@media (max-width: 425px) {
    .form{
        flex-direction: column;
        padding: 15px;
    }
    .form div{
        width: 100%;
        margin: 7px;
    }
    input[type=submit]{
        margin-top: 10px;
    }
}
</style>
