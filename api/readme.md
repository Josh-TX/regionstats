# API Docs

All the API requests must have a POST request type. 
All paremeters must be properties of a JSON

### Available APIs
* [Region](#apiregion)
* [Region Types](#apiregionType)

# /api/region
#### paremeters
* **region_id** (*required*) The id of the parent region
#### response
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
#### paremeters
(*none*)
#### response
```
 [
	{
		id: (id of region type)
		name: (name of region type)
	},
	...
]
```