<template lang="html">

    <div id="currency">
        <div class="container">
            <Calc v-if="ready"></Calc>

            <Recentlist v-if="ready"></Recentlist>
            <div class="lazy-loading" v-if="ready == false">
                <div class="lds-dual-ring" v-if="ready == false"></div>
            </div>
        </div>
    </div>

</template>

<script>
	import Calc from "../components/Calc.vue";
	import Recentlist from "../components/Recentlist.vue";

	export default {
		components: {
			Calc,
			Recentlist
		},
		data() {
			return {
				currencyList: [],
				currencyListG: [],
				ready: false,
				screenW: 0
			};
		},
		created() {
			let self = this;
			self.screenW = screen.width;
			window.addEventListener("resize", function() {
				self.screenW = screen.width;
			});
			var table = new XMLHttpRequest();
			table.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					self.currencyList = JSON.parse(this.responseText)[0]["rates"];
					self.currencyList.unshift({
						currency: "polski złoty",
						code: "PLN",
						mid: 1
					});
					self.addGold();
				}
			};
			table.open("GET", "http://api.nbp.pl/api/exchangerates/tables/a", true);
			table.send();
		},
		methods: {
			addGold() {
                let self = this;
				let gold = new XMLHttpRequest();
				gold.open("GET", "http://api.nbp.pl/api/cenyzlota", true);
				gold.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
                        self.currencyList.push({
                            currency: "złoto (gram)",
                            code: "GOLD",
                            mid: JSON.parse(this.responseText)[0]['cena']
                        });
                        self.ready = true;
					}
				}
				gold.send();
			}
		}
	};
</script>

<style lang="css">
</style>
