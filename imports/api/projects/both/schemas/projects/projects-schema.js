import SimpleSchema from "simpl-schema"

import { Projects } from "/imports/api/projects/both/project-collection.js"

// ***************************************************************
// Projects schema
// ***************************************************************

const convertToSlug = (Text)=>{
	return Text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
}

const randomChars = (len)=>{
	return Math.random().toString(36).substr(2, len);
}

const projectContactSchema = new SimpleSchema({
	contactName:{
		type: String,
    label: "Contact's Name (will be public)",
    min: 1,
    optional: false
	},
	phone: {
    type: String,
    label: "Contact's Phone Number (will be public)",
    min: 7,
    optional: false
  },
	email: {
    type: String,
    label: "Contact's Email Address (will be public)",
    // min: 350,
    optional: false
  },
})

const projectCryptoAddressesSchema = new SimpleSchema({
	ETH: {
    type: String,
    label: "Ethereum Address (Required)",
    min: 10,
    optional: false
  },
	BTC: {
    type: String,
    label: "Bitcoin Address (Optional)",
    min: 10,
    optional: true
  },
})

const projectQaSchema = new SimpleSchema({
	whyUseful: {
    type: String,
    label: "Why is this useful? (100 Characters Minimum)",
    min: 100,
    optional: false
  },
	howMuchTime: {
    type: String,
    label: "Approximately, how much time of research will this cover? (100 Characters Minimum)",
    min: 100,
    optional: false
  },
	howFundsWillbeSpent: {
    type: String,
    label: "How will the funds be spent? (100 Characters Minimum)",
    min: 100,
    optional: false
  },
	summary: {
    type: String,
    label: "Summary (300 Characters Maximum)",
    max: 350,
    optional: false
  },
	description: {
    type: String,
    label: "Description (300 Characters Minimum)",
    min: 300,
    optional: false
  },
})

const projectBoolsSchema = new SimpleSchema({
	acceptsFiat : {
		type: Boolean,
		autoValue : function() {
			if (this.isInsert) {
        return false;
      }
		}
	},
	reviewed: {
		type: Boolean,
		autoValue : function() {
			if (this.isInsert) {
        return false;
      }
		}
	},
	approved: {
		type: Boolean,
		autoValue : function() {
			if (this.isInsert) {
        return false;
      }
		}
	},
	isFeatured : {
		type: Boolean,
		autoValue : function() {
			if (this.isInsert) {
        return false;
      }
		}
	},
	softGoalReached: {
		type: Boolean,
		autoValue : function() {
			if (this.isInsert) {
        return false;
      }
		}
	},
	outofTime: {
		type: Boolean,
		autoValue : function() {
			if (this.isInsert) {
        return false;
      }
		}
	},
})

const projectTimePeriodSchema = new SimpleSchema({
	// softTimePeriod:{
	// 	type: Number,
  //   label: "Soft goal time (14-60 days)",
	// 	min: 14,
  //   max: 60,
  //   optional: false
	// },
	timePeriod:{
		type: Number,
    label: "Fundraising Period (14-60 days)",
		min: 14,
    max: 60,
    optional: false
	},
	startDate : {
		type: Date,
    optional: true,
    denyInsert: true
	},
	endDate : {
		type: Date,
    optional: true,
    denyInsert: true
	},
})

const projectGoalsSchema = new SimpleSchema({
	projectGoal:{
		type: Number,
    label: "Fundraising Goal (USD) (no commas)",
		min: 1,
    optional: false
	},
	softGoal:{
		type: Number,
    label: "Soft goal (Minimum amount needed) (USD) (no commas)",
		min: 1,
    optional: false
	},
})

const projectRaisedSchema = new SimpleSchema({
	totalRaised: {
		type: Number,  // cents, USD
    label: "If you have already raised some external funds, how much have you raised? (USD) (no commas)",
		min: 0,
    optional: false,
		defaultValue : 0,
		// autoValue : function() {
		// 	if (this.isInsert) {
    //     return 0;
    //   }
		// }
	},
	// percentRaised: {
	// 	type: Number,  // in percent, rounded to 10/100
  //   label: "Percent Raised",
	// 	min: 0,
	// 	max: 100,
  //   optional: true,
	// 	// defaultValue : 0
	// 	autoValue : function() {
	// 		if (this.isInsert) {
  //       return 0;
  //     }
	// 	}
	// }
})

const ProjectsSchema = new SimpleSchema({
	_id: {
		type: String,
    optional: true
	},
	title: {
    type: String,
    label: "Title",
    max: 120,
    optional: false
  },
	slug: {
		type: String,
		optional: true,
		denyUpdate: true,
		autoValue : function() {
			if (this.isInsert) {
				if (this.field('title').isSet) {
					let slugStringInit = convertToSlug( (this.field('title').value).toLowerCase() );
					let slugStringFinal = slugStringInit;
					while( !!Projects.findOne({"slug" : slugStringFinal}) ){
						console.log("slug is not not unique.. trying to make unique.");
						slugStringFinal = ""+slugStringInit+"-"+randomChars(3);
					}
					return slugStringFinal;
				}
			}
		}
	},
	// key: { // the idea here is to use this key for the URL so that it's a bit shorter than using the document ID
	// 	type: String,
	// 	optional: true,
	// 	denyUpdate: true,
	// 	autoValue : function() {
	// 		if (this.isInsert) {
	// 			// get the latest key, possibly using findAndModify to auto-inc the counter avoiding duplicates
	// 		}
	// 	}
	// },
	timePeriods :{
		type : projectTimePeriodSchema,
	},
	goals : {
		type : projectGoalsSchema,
	},
	raised : {
		type : projectRaisedSchema,
		// optional: true,
	},
	qa : {
		type : projectQaSchema,
	},
	cryptoAddresses : {
		type : projectCryptoAddressesSchema,
	},
	contact : {
		type : projectContactSchema,
	},
	bools : {
		type : projectBoolsSchema,
		optional: true,
	},
	createdAt: {
    type: Date,
    optional: true,
    denyUpdate: true,
    autoValue: function() {
      if (this.isInsert) {
        return new Date()
      }
    }
  },
  updatedAt: {
    type: Date,
    optional: true,
    denyInsert: true,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date()
      }
    }
  },
	owner : {
		type: String,
		optional: true,
		autoValue : function() {
			if (this.isInsert) {
				//*
				// return Meteor.user()._id;
				return this.userId // TODO: if I have this, then what will happen when there is no user? fail?
				//*/
      }
		}
	}
})



export default ProjectsSchema
