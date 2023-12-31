docker rm --force nginx-react-todo-app api-react-todo-app 
docker rmi --force nginx-react-todo-app:latest api-react-todo-app:latest

docker-compose up -d
docker ps
