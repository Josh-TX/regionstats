# API Docs

All the API requests must have a POST request type. 
Most of our APIs expect an JSON paremeter

## /api/region (region_id)

#### paremeters:
**region_id** (*required*)
The region id of the parent region

#### response:
an object in the following form: 
```javascript
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


 