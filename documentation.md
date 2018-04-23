<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Crypto for Science documentation](#crypto-for-science-documentation)
- [projects](#projects)
		- [creating projects](#creating-projects)
		- [sample project object](#sample-project-object)
		- [editing projects](#editing-projects)
		- [approving projects](#approving-projects)
		- [featuring projects](#featuring-projects)
		- [currency units](#currency-units)
		- [external funds](#external-funds)
		- [sample external fund document](#sample-external-fund-document)
		- [Countdown](#countdown)
		- [Campaign totals](#campaign-totals)
		- [contributors list](#contributors-list)
		- [project states](#project-states)
- [donation claims](#donation-claims)
		- [sample donation claim object:](#sample-donation-claim-object)
- [roles](#roles)
- [permissions](#permissions)
		- [how permissions work](#how-permissions-work)
		- [current permissions](#current-permissions)

<!-- /TOC -->


# Crypto for Science documentation

This page takes a bird's eye view of the internals of the CFS app, focusing on the main components. It does not exist to explain the source code, but to explain desired functionality, the 'why' behind the functionality, and how the functionality is implemented. Use this to know which features are implemented, which ones aren't yet, and how they all fit together.

# projects

### creating projects

In a nutshell, a researcher adds his project details + his contact data + how much he has already raised + where he wants to get paid: Bitcoin and ETH addresses.

In order to submit a `project` / campaign, the browser has to be logged in to a user account. Any user account can submit a project. When a user submits a project, they are given the group Role`researcher`, with the project id as the group. They can see the status of their project proposal from their admin page.

Projects are added to the `projects collection`. Each document is a project and its associated metadata, exclusing mutable growing information such as donations, which would have their own collection.

### sample project object

``` json
{
    "_id" : "oAX7KGsWTfQEY7sfe",
    "title" : "Cat Ecology",
    "qa" : {
        "summary" : "What is the most pleasing scratching post material for cats?",
        "whyUseful" : "It is estimated that in the global economy, cats account for billions of dollars in annual furniture damages. As many cat owners know, cats love to scratch even if they don’t have a post to do it on. This means that they’ll find something else to claw, often precious furniture. Understanding the prime materials to use in scratching posts could not only prevent billions of dollars in discarded / unwanted furniture, but also shine light on a novel use for recycled materials.",
        "howMuchTime" : "Getting this one right will require extensive cat play-time. Cats are known to be finnicky about their toys, and even though they may appear to be in love with their scratching post at first, as the scratching post wears out and changes in appearance over time, they may begin to eyeball the pristine, unscathed sofa in the living room on the way to their litter box. We estimate 10 years experimentation.",
        "howFundsWillbeSpent" : "There's no way around it- these cats are going to tear through lots of brand new furniture. Our goal is to identify a scratching post material that is so pleasing to the cats that they will no longer want to sink their claws inside a brand new leather couch. We're going to go through a lot of brand new furniture, a lot of cat food, and a lot of cat litter, for science.",
        "description" : "This was just a dummy placeholder. Please do not take this research project seriously. But if you are a scientist and would like to seek funding to complete a research project, go ahead and submit your project. We will review it and if approved it will be published on Crypto For Science for anyone to donate, without any fees."
    },
    "goals" : {
        "projectGoal" : NumberInt(80000000),
        "softGoal" : NumberInt(200000)
    },
    "raised" : {
        "totalRaised" : NumberInt(24000000)
    },
    "timePeriods" : {
        "timePeriod" : NumberInt(30),
        "startDate" : ISODate("2018-03-19T10:31:50.365+0000"),
        "endDate" : ISODate("2018-04-18T10:31:50.365+0000")
    },
    "cryptoAddresses" : {
        "ETH" : "[etherium address for the project, if this were real]",
        "BTC" : "[bitcoin address for the project, if this were real]"
    },
    "contact" : {
        "contactName" : "Sandra Johnson",
        "phone" : "9-999-999-9999",
        "email" : "asdadasd@sdgssg.com"
    },
    "createdAt" : ISODate("2018-04-10T22:31:50.238+0000"),
    "owner" : null,
    "bools" : {
        "acceptsFiat" : false,
        "reviewed" : true,
        "approved" : true,
        "isFeatured" : false,
        "softGoalReached" : false,
        "outofTime" : false
    },
    "updatedAt" : ISODate("2018-04-10T22:31:50.366+0000")
}

```

### editing projects

In order to edit a project, the browser has to be logged in to a user account with appropriate permissions. People who have permission to edit a project can edit a project via:

- the admin page
- the published project page via an edit button

A user that goes to edit a project is taken to a form similar to the one used to submit a project, where they can edit some info and submit.

### approving projects

Approved projects show up on the "projects" listing page, and their project URLs will load the project page with the project data.

You can approve a project via the admin UI with an `administrator` or `approver` role account. It implements the following update for the project in the database:

```
project.bools.approved = TRUE
```

### featuring projects

Featured projects show up on the home page.

You can feature an approved project by pressing the `feature` button via the admin UI, with an `administrator` role account. It implements the following update for the project in the database:

```
project.bools.approved = TRUE
project.bools.reviewed = TRUE
project.bools.isFeatured = TRUE
```

### currency units

All currency is tracked and ultimately translated to USD for use in the progress bar. When storing USD, units are stored in cents, so that they can be stored as ints instead of floats. We do this because floats do not behave precisely in javascript and can lead to serious math errors when using decimals. We can avoid this entire class of errors using ints.

Goals, soft goals, and total raised are all in USD, as ints.

### external funds

The money contributed to a project outside of the app, that was self-reported by the project owner goes in the `ExternalFunds` collection.

Self-reported donations occur in two scenarios:

- When a project owner first submits a project, they can indicate whether money has already been raised externally by inputting the amount that has already been raised.
- After a project proposal is submitted, a project owner may receive non-cryptocurrency donations from outside donors. For example he's contacted by Alex at his personal phone displayed in the campaign page, and they discuss it so that he receives 15k as a wire transfer (or any other method of payment). He is able to do this inside the admin page.

Self-reported external contributions count towards the fundraising goal. Each document is a single log, with:

- the amount in USD (int cents),
- the contributor name,
- and the project ID.

### sample external fund document

```json
{
    "_id" : "4Zh7sHr3vzC7pSFWq",
    "title" : "Alex",
    "amount" : NumberInt(1500000),
    "projectId" : "aRK9TNWPnszTb3iFY",
    "createdAt" : ISODate("2018-04-16T13:38:56.412+0000")
}
```

### Countdown

Projects can have a timespan of 14-60 days. Each project shows a countdown of days remaining, that decrements by one each day. The campaign ends after 0 days remain. Afterwards, all donation addresses are hidden.

The countdown is calculated primarily using the `project.timePeriods.endDate` and the current date on the server.

### Campaign totals

Each project has a progress bar that shows the current amount raised as a percentage of the campaign goal.

The campaign total is currently being calculated via spreadsheet. Use a spreadsheet for maths and conversions (tracking the crypto networks totals, and any external funds disclosed).

This campaign total is currently a updated via a manual database manipulation. In the database, for a project document: update the running total (in USD cents -- so just an int; no decimals)

    project.raised.totalRaised = int_amount_cents_USD

### contributors list

Each project can show a contributors list. The contributors list is comprised of people who have submitted a `donation claim` (no user account needed to submit a claim currently) and their claims have been approved. The list shows either the names of the donors, or whatever text they wanted to show when they submitted the donation claim.

Donors can submit a `donation claim` via a link on the project page.  

### project states

These are the project states shown in the UI

- **pending review**
  - pending review. It's not published.
  - this is the default state for a new project.
  - current implementation:
    - { project.bools.reviewed:false }
- **approved**
  - it's published.
  - current implementation:
    - { project.bools.reviewed:true, project.bools.approved:true }
- **featured**
  - it's published, and on the front page.
  - current implementation:
    - { project.bools.reviewed:true, project.bools.approved:true, project.bools.isFeatured:true }
- **denied**
  - It's not published, and won't be.
  - current implementation:
    - { project.bools.reviewed:true, project.bools.approved:false }
- **campaign ended**
  - not currently implemented
  - When the campaign's time period has lapsed. Or when the project owner has ended the campaign.

# donation claims

When someone donates cryptocurrency, their contribution is automatically reflected in the campaign total. In addition, they can claim their donation and get listed as a contributor, if they want.

Anyone can submit a `donation claim` for a project. Their claim is stored in the `donationClaims collection` and will be pending approval. The calim should go to the project owner, who will verify and approve. Only the claimant's name, or the text they want to show instead, should appear on the contributors list for the project.

### sample donation claim object:

```json
{
    "_id" : "nRmasSYDMbsriKdRF",
    "title" : "this is the text that I want people to see on the contributors list",
    "content" : "here I provide verification for te claim. how much it was, where it came from, etc.",
    "projectId" : "LjoFCMD3oftJD6vHF",
    "userId" : "NgWHaR59HJcZL8gPt",
    "reviewed" : false,
    "approved" : false,
    "createdAt" : ISODate("2018-04-23T03:18:09.416+0000")
}

```



# roles

We use the `alanning:roles` package to manage roles. All roles are Group roles. Currently the groups that are not the global group are ProjectID's.

- **Administrator**

  - role = "administrator".

  - In Global group.

  - Given to a user by CFS. Currently, to make someone an administrator, you have to edit their user document in the database and add the following:

    ```json
    "roles" : {
        "global_roles" : [
            "administrator"
        ]
    }
    ```

  - When a user has this role, anything they try to do should pass any permissions check. Can:

    - Do anything that doesn't violate the privacy policy.

- **Researcher**

  - role = "researcher".
  - In {ProjectID} group. A user is assigned this role for a particular project ID.
  - Given to a user by the app when they submit a project proposal.
  - When a user has this role, they can manage the project that they have this role for, excluding any staff-exclusive actions, such as approving a project. Can:
    - Edit project descriptions and q&a answers for the project that they have this role for
    - Cancel  / End the project (not implemented)

- **Project Approver**

  - Not yet implemented. Below is how it should work:

  - role = "approver".

  - In Global group.

  - Given to a user by CFS. To make someone an approver, you have to edit their user document in the database and add the following:

    ```  json
    "roles" : {
        "global_roles" : [
            "approver"
        ]
    }
    ```

  - When a user has this role, they can approve projects. Can:

    - see / do everything needed to approve/reject pending projects.

- **Identity Checker**

  - Not yet implemented. Below is how it should work:

  - role = "checker".

  - In Global group.

  - Given to a user by CFS. To make someone a checker, you have to edit their user document in the database and add the following:

    ```json
    "roles" : {
        "global_roles" : [
            "checker"
        ]
    }
    ```

  - When a user has this role, they can check the identity of users who have submitted a project proposal. Can:

    - See / do everything needed to check the identity of a pending project, but not approve projects.

- **Donator**

  - Currently you don't need to be logged in to submit a donation claim, so it's not yet "turned on", although it is wired up. The following is how it would work for a user role when turned on.
  - role = "donator"
  - In {ProjectID} group. A user is assigned this role for a particular project ID.
  - Given to a user by the app when their donation claim for a project is approved.



# permissions

### how permissions work

When a user tries to take an action that will manipulate the database or read from the database, we need to make sure that they have the right permissions to do so.

Permissions are based on functionality. So "isIdentityChecker" should not be a permission, but "canCheckItentiy" can be a permission. Permissions should always be in the can-do-X format, and then assigned to appropriate roles that should have those permissions. The only exception is "isAdmin", since there's lots of special things that only the administrator can do, and at least for now we may avoid defining a permission for each activity that an administrator alone might do.

Permissions are defined in `imports/modules/permissions.js`

### current permissions

- **canEditProject**(project_id)
  - This is being used as both a read and write permission.
  - permissible roles:
    - researcher(project_id)
    - administrator
- **canSubmitDonationClaim**(project_id)
  - Currently not "turned on", as anyone, logged in or not, can submit a donation claim. Below is how it should work.
  - This is intended to be a write permission. Should be restricted to workflows that write to db.
  - must be [ logged in ] and also [ not in an administrative role for this project_id ]
  - permissible roles:
    - !researcher(project_id) // aka not a researcher for this project
- **canViewAnyProject**()
  - This is intended to be a read permission. Should not be used in any methods that write to db.
  - permissible roles:
    - administrator
    - approver
    - checker
- **canApproveRejectProjects**()
  - This is intended to be a write permission. Should be restricted to workflows that write to db.
  - permissible roles:
    - administrator
    - approver
- **canFeatureProjects**()
  - This is intended to be a write permission. Should be restricted to workflows that write to db.
  - permissible roles:
    - administrator
- **isAdmin**
  - This is the only permission that is literally a role. It's basically asking if the user has the global "administrator" role. All other permissions are based on functionality, but there is lots of specific functionality that an administrator may execute that other users can't, and for now we may avoid defining a permission for each activity that an administrator might do.
  - permissible roles:
    - administrator

