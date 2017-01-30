# To-do list

upload regions (to SQL)
verify login/signup works all the time
edit your own regions
admins can approve/edit other people's region submissions
* save changes
* approve
* reject
* delete

Submission trail:
* user uploads data into sub_table name
* submissions table gets updated with a new row with the submission id, status = [pending=p, approved=a, rejected=r], type = [region=r, source=s, data=d]
* users can edit their submission
* admin approves or rejects upload (notes required for rejection, optional for approval)
* Make the website pretty
* Make the root page be able to browse the region list (like a slide-in modal/sidebar)
	

/*Admin Levels: 1, 2, 3 (or 99)
	6+ you can view someone else's submission before approval
	10+ you can approve your own submission
*/
