Testing the Apps

cURL
For user Registration
Start user service - 8080
```
curl --location 'http://localhost:8080/api/v1.0/blogsite/user/register' \
--header 'Content-Type: application/json' \
--data-raw '{
  "userName": "sandyiam",
  "emailId": "san@gmail.com",
  "password": "Pass12345"
}'
```
For login and token
```
curl --location 'http://localhost:8080/api/v1.0/blogsite/user/login' \
--header 'Content-Type: application/json' \
--data '{
  "userName": "sandyiam",
  "password": "Pass12345"
}'
```

Start blog service - ort 8091
For new blog
```
curl --location 'http://localhost:8091/api/v1.0/blogsite/blog' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW5keWxhbiIsImlhdCI6MTc2NjM3NjAyMCwiZXhwIjoxNzY2Mzc5NjIwfQ.TMI3hwepwbuHTI-2QpECzz5u6oxCnVareqSuudoxGi4' \
--header 'Content-Type: application/json' \
--header 'Cookie: JSESSIONID=D5B6B968E3501DA6AB19F942F3F17270' \
--data '{
  "title": "My First Blog",
  "content": "This is my first blog content with more than twenty characters."
}'
```

https://one.techademy.com/lxp/Cognizantfse/my-learnings/course/479/tracker/xxx/module/xxx/submodule/?is_ccms_obj=false
