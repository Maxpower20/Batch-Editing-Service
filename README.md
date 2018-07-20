# Batch-Editing-Service

to run application print in the terminal: 
npm start

application will be operating on the http://localhost:4444.

Access to the API is made by the path http://localhost:4444/batch.

It supports only PUT requests.

Example of request body for getting data: 
```javascript
{  
	'url': 'https://guesty-user-service.herokuapp.com/user/{userId}',  
	'verb": 'GET',  
	'payloads': [{"userId": 1}, {"userId": 2}, {"userId": 3}, {"userId": 4}]  
}  
```

Example of body for updating data:
```javascript
{  
	'url': 'https://guesty-user-service.herokuapp.com/user/{userId}',  
	'verb": 'PUT',  
	'payloads': [{"userId": 1}, {"userId": 2}, {"userId": 3}, {"userId": 4}, {"userId": 5}, {"userId": 6}, {"userId": 7}],  
	'requestBody': {  
		'age': 30  
	}  
} 
```
	
