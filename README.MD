# Blog chia sẻ của tôi

## API server

### User

1.  Register

- @Route POST /register
- @Desc register new user
- @Access Public
  _Data post_

```
 {
   name, pwd, email
 }
```

2.

- @Route POST /login
- @Desc login user return jwt-token
- @Access Private
  _Data post_

```
 {
   email, pwd
 }
```

#### Ngày tạo 18/ 05/ 2019