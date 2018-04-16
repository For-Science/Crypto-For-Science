# Crypto-For-Science

Crypto For Science is a crowdfunding platform that uses the spirit of cryptocurrency in order to fund scientific research: no fees and no intermediaries - all the funds go directly to the researchers.

The code from this repository will be online at: [https://cryptoforscience.com](https://cryptoforscience.com)

## Usage
1. `git clone https://github.com/For-Science/Crypto-For-Science.git ./cryptoforscience`
2. `cd cryptoforscience`
3. `meteor npm install --save`
4. `meteor`

### Default admin account

- email: app_admin@cryptoforscience.com
- password: app_admin-password

## How it works

Basically, a researcher adds his project + his contact data + how much he has already raised + where he wants to get paid: Bitcoin and ETH addresses. For any other type of payment, he’d have to be contacted personally and, after receiving the funds, he’d add the contribution manually.

An interesting feature will be funds recycling: if someone doesn't get funded at the soft cap in the time chosen by him (translated: with the minimum funds that he needs), it's his own responsibility to choose other projects from the website, and donate everything that he's received until then to them. Afterwards, he's allowed to restart the campaign while disclosing that this has happened in the description. Similarly, if he receives more money (for example because some cryptocurrency that he received went up a lot in value)... it's his own responsibility to donate the surplus to other projects.

A big advantage is that I have a marketing company, and I’ll promote the campaigns posted on the website in perpetuity, for free. In order to keep costs low, I’ll try to make all the processes as non-bureaucratic as possible:
- The website will be open source.
- I won’t create a non-profit to support this.
- I won’t be policing the platform (for example, by checking that recycling of funds has been done accordingly). The only approval process will be when a researcher applies to have an account created, and then at his first campaign. All his ulterior campaigns will just be posted directly, without going through approval. (note that this is how we do it in the MVP, but final version will have [a much better system](https://trello.com/c/oWhIqOTx/7-this-is-the-coolest-idea-ever-in-the-final-version-add-two-new-types-of-members-project-approver-and-identity-checker))
- I won’t hold any funds as an intermediary or an escrow, I won’t ask for any help for covering costs like website development and hosting.
- etc.

Our public Trello board: [https://trello.com/b/QDlYTHye/cryptoforsciencecom](https://trello.com/b/QDlYTHye/cryptoforsciencecom), which should be updated with features that we're working on.

How you can help:
- Submit pull requests, help with our code!
- Check the security of the website.
- Donate weekly to the projects that you like.
- In the final version, become an Identity Checker or a Project Approver (the feature is described here https://trello.com/c/oWhIqOTx/7-this-is-the-coolest-idea-ever-in-the-final-version-add-two-new-types-of-members-project-approver-and-identity-checker).
- Become a scientist and use this website in order to get funding.
- Tell your buddies about this website, and recommend them to donate weekly.
- etc. you can come up with ideas
