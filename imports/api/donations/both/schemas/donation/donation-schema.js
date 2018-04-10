import SimpleSchema from "simpl-schema"

// ***************************************************************
// DONATION schema
// ***************************************************************

const DonationSchema = new SimpleSchema({
	_id: {
		type: String,
    optional: true,
		denyUpdate: true,
		// denyInsert: true,
	},
  title: {
    type: String,
    label: "Your name, or the the text you want to show in the donor list.",
    optional: false,
  },
  content: {
    type: String,
    label: `If you donated cryptocurrency, enter the coin name, the crypto-address it was sent from, and the amount.
						If you made a wire transfer, enter where it came from, and the amount.`,
    optional: false
  },
	projectId: {
		type: String,
    optional: false
  },
	userId: {
		type: String,
		optional: true // for now it's optional to have a userId
  },
	reviewed : {
		type: Boolean,
		optional:true,
		autoValue: function() {
      if (this.isInsert) {
        return false
      }
    }
	},
	approved : {
		type: Boolean,
		optional:true,
		autoValue: function() {
      if (this.isInsert) {
        return false
      }
    }
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
  }
})

export default DonationSchema
