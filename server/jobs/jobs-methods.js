import { Jobs } from 'meteor/msavin:sjobs'

import { Projects } from "/imports/api/projects/both/project-collection.js"
import { ExternalFunds } from "/imports/api/externalFunds/both/externalFunds-collection.js"

let rescheduleJob = (job, numSeconds)=>{ // this is the function you call to reschedule a job
	let timeObject = new Date();
	let futureTime = new Date(timeObject.getTime() + (numSeconds * 1000));
	job.reschedule({
		on: {
			year: futureTime.getFullYear(),
			month: futureTime.getMonth(),
			day: futureTime.getDate(),
			hour: futureTime.getHours(),
			minute: futureTime.getMinutes(),
			second: futureTime.getSeconds(),
			millisecond: futureTime.getMilliseconds(),
		}
	})
}

Jobs.configure({
    autoStart: true,
    interval: 2 * 1000,
    startupDelay: 1000,
    maxWait: 5 * 60 * 1000
})

Jobs.register({
    "testJob": function (message) {
			let self = this;
			// console.log("");
			console.log("Jobs.testJob called");
			console.log("message:");
      console.log(message);

			self.success();

    }
});

const getCoinTotal = (project, coin) => { // for a given project's coin and address, get its total received amount to date
	try{
		let call = "";
		switch (coin){
			case "ETH":
				call = HTTP.get("https://api.blockcypher.com/v1/eth/main/addrs/" + project.cryptoAddresses.ETH + "/balance");
				break;
			case "BTC":
				call = HTTP.get("https://api.blockcypher.com/v1/btc/main/addrs/" + project.cryptoAddresses.BTC + "/balance");
				break;
		}

		if (call.statusCode === 200) {
				console.log(coin + " result:")
				console.log(call.data)
				// k get the call.data.total_received and store that in project and convert that to USD for later use
				let coinTotal = call.data.total_received;
				return {
					success: true,
					total: coinTotal,
					rescheduled: false
				}
		}
		else if(call.statusCode === 429){ // rate limiting is the cause of the error, try again as soon as possible
			return {
				success: false,
				rescheduled: true
			}
		}
		else{
			return {
				success: false,
				rescheduled: false,
				call : call
			}
		}
	}
	catch(e){
		console.log("error when trying getCoinTotal");
		console.log(project._id + " " + coin + " result:")
		console.log(e.response.content);
		return {
			success: false,
			rescheduled: false
		}
	}
}

const convertToUSD = (project, coin, total) => { // convert a coin's amount to current USD
	/*
		TODO: add cryptocompare attribution
		https://www.cryptocompare.com/api/#
		You can use our data for free under a Creative Commons Attribution-NonCommercial
		3.0 Unported (CC BY-NC 3.0) license ( https://creativecommons.org/licenses/by-nc/3.0/ ).
		Please make sure you credit us with a link if you use our data on your
		website or app. Storage and redistribution of CryptoCompare data is
		strictly prohibited without a commercial license agreement ( contact
		support for more info ). YOUR CLIENTS SHOULD DIRECTLY USE OUR APIS IF
		POSSIBLE. (THE HEADER Access-Control-Allow-Origin: * is only set on
		min-api paths)
	*/

	try{
		let call = "";
		switch (coin){
			case "ETH":
				call = HTTP.get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD");
				break;
			case "BTC":
				// "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD"
				call = HTTP.get("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD");
				break;
		}

		if (call.statusCode === 200) {
				console.log(coin + " result:")
				console.log(call.data)
				// k get the call.data.total_received and store that in project and convert that to USD for later use
				let coinTotal = call.data["USD"] * total;
				return {
					success: true,
					USD: coinTotal,
					rescheduled: false
				}
		}
		else{
			return {
				success: false,
				rescheduled: false,
				call : call
			}
		}

	}
	catch(e){
		console.log("error when trying convertToUSD");
		console.log(project._id + " " + coin + " result:")
		console.log(e.response.content);
		return {
			success: false,
			rescheduled: false
		}
	}
}

const updateProjectTotalAmounts = (projectId, totalUSD) => {
	Projects.update(
		projectId,
		{
			$set: {
				"raised.totalRaised": totalUSD,
			}
		},
		function(error, result) {
			if (error) {
				throw new Meteor.Error(500, "Server error")
			}
		}
	);
}

Jobs.register({
	"updateProjectTotals": function (project) {
		let self = this;
		// console.log("");
		console.log("Jobs.updateProjectTotals called");
		console.log("project:");
		console.log(project);

		// self.set("project_id", project._id);

		// TODO check crypto totals in project.cryptoAddresses and update
		let total_received_ETH = 0;
		let total_received_BTC = 0;
		let proceed = true;
		let failedproceedMessage = "";

		if(project.cryptoAddresses && !!project.cryptoAddresses.ETH){
			let tryGetETH = getCoinTotal(project, "ETH");
			if(tryGetETH.success == true){
				total_received_ETH = tryGetETH.total;
			}
			else{
				if (tryGetETH.rescheduled == true){
					rescheduleJob(self, 10);
					proceed = false;
					failedproceedMessage+= "\n could not get ETH total, probably due to rate limiting"
				}
				else{
					self.failure(tryGetETH.call);
				}
			}
		}

		if(project.cryptoAddresses && !!project.cryptoAddresses.BTC){
			let tryGetBTC = getCoinTotal(project, "BTC");
			if(tryGetBTC.success == true){
				total_received_BTC = tryGetBTC.total;
			}
			else{
				if (tryGetBTC.rescheduled == true){
					rescheduleJob(self, 10);
					proceed = false;
					failedproceedMessage+= "\n could not get BTC total, probably due to rate limiting"
				}
				else{
					self.failure(tryGetBTC.call);
				}
			}
		}

		if(!proceed){ // fail early
			console.log("could not proceed");
			console.log(failedproceedMessage);
			return false;
		}

		// TODO take total_received_ETH and total_received_BTC to get their USD value
		// use cryptocompare or something similar
		let eth_USD = 0;
		if(total_received_ETH > 0){ // convert ETH to USD
			let tryConvertETHtoUSD = convertToUSD(project, "ETH", total_received_ETH);
			if(tryConvertETHtoUSD.success == true){
				eth_USD = tryConvertETHtoUSD.USD;
			}
			else{
				self.failure("tryConvertETHtoUSD");
			}
		}

		let btc_USD = 0;
		if(total_received_BTC > 0){ // convert BTC to USD
			let tryConvertBTCtoUSD = convertToUSD(project, "BTC", total_received_BTC);

			if(tryConvertBTCtoUSD.success == true){
				btc_USD = tryConvertBTCtoUSD.USD;
			}
			else{
				self.failure("tryConvertBTCtoUSD");
			}
		}

		if(!proceed){ // fail often
			console.log("could not proceed");
			console.log(failedproceedMessage);
			return false;
		}

		// TODO check externalRaised totals
		let externalRaised = ExternalFunds.find({projectID : project._id}).fetch();
		let totalExternalRaised = 0;
		externalRaised.forEach((externalDoc,k)=>{
			// console.log(v);
			totalExternalRaised += externalDoc.amount;
		});


		// by this point we have in memory all BTC, ETH, their USD conversion totals, and externalRaised..
		// TODO sum everything up and update project.raised.totalRaised


		let totalUSDRaised = totalExternalRaised + btc_USD + eth_USD;
		let totalUSDRaised_Cents = totalUSDRaised * 100;

		console.log("updating coin totals");

		try{
			updateProjectTotalAmounts(project._id, totalUSDRaised_Cents)
		}
		catch(e){
			console.log("error when trying updateProjectTotalAmounts");
			console.log("project._id: " + project._id)
			console.log(e);
			return;
		}

		// NOTE THEN DONE k, success. try again in one hour
		rescheduleJob(self, 3600);
	}
});
