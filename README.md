# swvl-task

A microservice responsible for handling authorization control.

## How to start service

These instructions will get you a copy of the project up and running on your local machine.
First, open and run `mongod`. Next, open the terminal and cd to the desired directory. Next, write the following commands.

```
git clone https://github.com/YaraA/swvl-task.git
cd swvl-task
npm install
npm start
```
To know that everything is set and working properly. You should see the following printed in your console. 

```
Server is listening on port 3000
connection succesful
```
Now you can start pinging the service at (http://localhost:3000).

## Details on design decisions

Here, I will explain how the link between the user, groups, and accessible resources was designed. The **User** schema includes the *userId*, *list of groups* the user belongs to and a *list of resource names* which the user can access. This way, retrieving the information of whether a user is authorized to view a certain resource or not will be done in only one db operation and thus has a good response time. However, there is a tradeoff, since now the route that involves adding a resource to a group `POST /group/:id/authorize ` takes  2 db operations to be executed. One of which to add the resourceId to the list of resources accessible by the desired group. The other one is to add the resourceName to the list of resources of all the members of the group. In my opinion, this tradeoff is bearable, since for the `GET /authorized?` request time is important since the client is expecting a response. However, for the `POST /group/:id/authorize ` requet time is not as important since the client is not expecting a response. 
