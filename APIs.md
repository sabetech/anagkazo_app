POST: https://anagkazo.firstlovegallery.com/api/app/student/700446/counselling
{
"date":"2020-10-06",
"member_id":"4",
"issue_counselled":"some long text here",
"has_podcast":"0"
}
GET https://anagkazo.firstlovegallery.com/api/app/student/700445/counselling
GET: https://anagkazo.firstlovegallery.com/api/app/student/700445/counselling/2020-10-05
For the details of the counselling
POST: https://anagkazo.firstlovegallery.com/api/app/student/700445/sheepseeking

{
"date":"2020-10-05",
"member_id":"448"
}
GET: https://anagkazo.firstlovegallery.com/api/app/student/700445/sheepseeking
GET: https://anagkazo.firstlovegallery.com/api/app/student/700445/sheepseeking/2020-10-05

Get the members who were visited at a certain date

I fixed the API response to come with the member name and photo
https://anagkazo.firstlovegallery.com/api/app/student/700445/multiplication
{
"date":"2020-10-05",
"soul_won":"kwabena sekyi",
"soul_phone":"054 123 8736"
}

GET
https://anagkazo.firstlovegallery.com/api/app/student/700445/multiplication
GET
https://anagkazo.firstlovegallery.com/api/app/student/700445/multiplication/2020-10-05
GET:
https://anagkazo.firstlovegallery.com/api/app/uc_schools

Load the schools into your drop down for the Understanding campaign forms
POST:
https://anagkazo.firstlovegallery.com/api/app/student/700445/understandingcampaign
{
"date":"2020-10-05",
"uc_school_id":1,
"score":64
}
GET
https://anagkazo.firstlovegallery.com/api/app/student/700445/understandingcampaign

Get understanding exams scores.

In your UI, if score is above 50, show the check else, nothing .. ✅
GET

https://anagkazo.firstlovegallery.com/api/app/sat_resources
List of SAT resources
to populate your drop down for the form
POST
https://anagkazo.firstlovegallery.com/api/app/student/700445/satresource
{
"resource_id": 1
}

Assign a student to sat resource
GET
https://anagkazo.firstlovegallery.com/api/app/student/700445/satresource

Get what the student is having currently
