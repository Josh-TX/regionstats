# API Docs

All the API requests must have a POST request type. 
All parameters must be properties of a JSON

### Available APIs
* [Region](#apiregion)
* [Region Types](#apiregiontype)
* [Titles](#apititles)
* [Stats](#apistats)
* [Criteria](#apicriteria)

# /api/region
Requests must include 1 parameter set
## Paremeters
* **region_id** The id of the region

The response will only include all child regions.

---
(*not implemented yet*)
* **region_id** The id of the region
* **stat_id** the id of the statistic

The response will only include child regions that have data for that statistic.
## Response
```
{
	parent: (id of parent region)
	name: (name of parent region)
	r: [
		{
			id: (id of child region)
			name: (name of child region)
		},
		...
	]
	rg: [
		{
			id: (id of region group)
			type: (region_type_id of child regions of region group)
		},
		...
	]
}
```
# /api/regionType
## Paremeters
(*none*)

## Response
```
 [
	{
		id: (id of region type)
		name: (name of region type)
	},
	...
]
```
# /api/titles
Requests must include 1 parameter set
## Paremeter Sets
* **region_id** The id of the parent region

The response will include all titles that the region has data for

---
* **group_id** The id of the region_group

The response will include all titles that the region group has data for

---
* **category_id** the id of the category

The response will include all titles in that category

## Response
Count will not necessarily count all data for each title. Rather it will count all data that matches the parameters' conditions
```
[
	{
		id: (id of title)
		name: (name of title)
		category_id: (id of category)
		count: (amount of data for this title)
	},
	...
]
```

# /api/stats
Requests must include 1 parameter set

## Paremeter Sets

* **title_id** The id of the stat's title
* **region_id** The id of the parent region

The response will include all stats that have the specified title, and the region has data for

---
* **title_id** The id of the stat's title
* **group_id** The id of the region_group

The response will include all stats that have the specified title, and the region group has data for

## Response
Count will not necessarily count all data for each stat. Rather it will count all data that matches the parameters' conditions
```
[
	{
		stat_id: (id of stat)
		criteria: (csv string of each criteria id. null if no criteria)
		count: (amount of data for this stat)
	},
	...
]
```

# /api/criteria

## Paremeters

(*none*)

## Response
```
[
	{
		id: (id of the criteria)
		name: (name of the criteria)
		count: (amount of data for the criteria)
	},
	...
]
```
