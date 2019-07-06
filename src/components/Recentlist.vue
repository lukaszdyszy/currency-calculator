<template lang="html">
    
    <div id="recent-list">
        <table>
            <tr>
                <th>Nazwa</th>
                <th>Kod</th>
                <th>Najnowszy kurs</th>
            </tr>
            <tr v-for="(currency, index) in this.$parent.currencyList" v-if="index > 0">
                <td>{{ currency['currency'] }}</td>
                <td>{{ currency['code'] }}</td>
                <td>{{ currency['mid'] }}</td>
            </tr>
        </table>
    </div>

</template>

<script>
export default {
}
</script>
<style lang="css" scoped>
#recent-list{
    width: 100%;
    overflow-x: auto;
}
table{
    width: 100%;
    border: 3px solid black;
    border-radius: 15px;
    border-collapse: collapse;
    box-sizing: border-box;
    overflow-x: auto;
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
@media(max-width: 400px){
    table td, th{
        padding: 4px;
    }
}
</style>
