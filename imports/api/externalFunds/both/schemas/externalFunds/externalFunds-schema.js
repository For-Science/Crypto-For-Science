import SimpleSchema from "simpl-schema"

// ***************************************************************
// EXTERNALFUNDS schema
// ***************************************************************

const ExternalFundsSchema = new SimpleSchema({
	_id: {
		type: String,
    optional: true,
		denyUpdate: true,
		// denyInsert: true,
	},
  title: {
    type: String,
    label: "The name of the external contribution.",
    optional: false,
  },
  amount: {
		type: Number,  // cents, USD
    label: "The total amount (USD) (no commas)",
		min: 0,
    optional: false,
  },
	projectId: {
		type: String,
    optional: false
  },
	// userId: {
	// 	type: String,
	// 	optional: true // for now it's optional to have a userId
  // },
	// reviewed : {
	// 	type: Boolean,
	// 	optional:true,
	// 	autoValue: function() {
  //     if (this.isInsert) {
  //       return false
  //     }
  //   }
	// },
	// approved : {
	// 	type: Boolean,
	// 	optional:true,
	// 	autoValue: function() {
  //     if (this.isInsert) {
  //       return false
  //     }
  //   }
	// },
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
  }
})

export default ExternalFundsSchema
