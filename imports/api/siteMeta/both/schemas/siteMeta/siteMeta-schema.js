import SimpleSchema from "simpl-schema"

// ***************************************************************
// SITE META schema
// ***************************************************************

const facebookOpenGraphSchema = new SimpleSchema({
	description:{
		type: String,
    label: "description",
    optional: false
	}
})

const crawlersSchema = new SimpleSchema({
	facebookOpenGraph : {
		type : facebookOpenGraphSchema,
		optional: true,
	},
})

const SiteMetaSchema = new SimpleSchema({
	_id: {
		type: String,
    optional: true,
		denyUpdate: true,
		// denyInsert: true,
	},
	crawlers : {
		type : crawlersSchema,
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
  }
})

export default SiteMetaSchema
