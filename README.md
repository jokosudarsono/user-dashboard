# User Dashboard App

This project is simulation of user management page

### Requirements
```
1. node version 16.*
```

### ENV Configuration
```
$ cp .env.sample .env
```
Then change the configuration values

### Install Dependencies
```
$ yarn install
```

### Running Project
```
$ yarn start
```

### Run Test
```
$ yarn test
```

### Formatting Code
```
$ yarn prettier
```
This step is not required and `husky` will take care of code prettier when commit the changes

### Additional Notes
On this project i have been add some functionalities to improve performance
1. Debounce
This function is to prevent send requests on every filter changed. especially when user type the search input, page changes and sorting
2. Cancel requests
This function is to prevent uncomplete request stacked, it's cause of slow performance and side effect inconsistence data when using state management
