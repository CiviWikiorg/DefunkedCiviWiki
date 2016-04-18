Welcome to Civiwiki!
-------------------

We are a non-profit community working to develop a democratic engagement web system.

Why CiviWiki?

* **Democratically Contributed Media.** As the name CiviWiki implies, our core content will be contributed by volunteers on our Wiki. Our topic format is modular. The structure both allows a community of volunteers to collaborate on a single political issue, and reserves space for dissenting opinions.
* **Personalized Policy Feed.** CiviWiki intelligently personalizes users' feed in two meaningful ways. First, the issues promoted to users' feed will be personalized to the user's expressed interests, and the timeliness of the issue. Second, the structure of the issue topics break policy positions into bite-sized contentions we call Civies. Each Civi is logically related to the rest of the topic. Based on the user's support, opposition, or neutrality to each Civi, CiviWiki promotes different relevant content. 
* **Citizen/Representative Engagement.** CiviWiki's core goal is to engage citizens and their representatives, with the goal of making government more accountable. CiviWiki will achieves this goal in two ways. First, CiviWiki will organize user's policy profile and compare it to every political candidate in the user's district. This quick, detailed, comparison will help users make informed votes, and we believe increased voter confidence will increase voter turnout. Second, CiviWiki will collect anonymized user data and forward district level statistics to representatives. With a critical mass of users, we believe timely district level polling data will influence representatives' votes.

For Developers.
---------------

**Setup**
* Pull Master from origin and create a new branch.
* Create a [virtual environment](http://docs.python-guide.org/en/latest/dev/virtualenvs/).
* Run `pip install -r requirements.txt`.
* Run `python civiwiki/manage.py runserver` to run the local server on port 8000.
* Reference **civiwiki/README.txt** for a list of urls and a description.

load a local database (requires postgres installed)
* `createuser civiwiki -P -d` insert password changecivic2
* `createdb civiwiki_local -O civiwiki`
* `export CIVIWIKI_LOCAL=1` set to 0 to use online db
* `python manage.py syncdb`
* `python manage.py makemigrations` we shouldn't have migrations locally!
* `python manage.py migrate`


**Contribute**:
Contact us on Twitter to join the team.

I want to keep track of how Civiwiki is doing.
----------------------------------------------

#### Contact info

* **Twitter:** [@CiviWiki](https://twitter.com/civiwiki)
* **Web:** http://civiwiki.org/
* **Crowdfunding Page:** https://www.generosity.com/community-fundraising/civiwiki-org-plugging-in-democracy
