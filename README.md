# installation

git clone .....
npm install
./node_modules/.bin/webpack
#### dev
* run dev server: ```npm start``` runs dev server on localhost:3000
includes webpack watching files but no hot module reloading

### testing
* pushes to github triggers travis CI 
* need to add test coverage
### production

docker
* build docker container:
```sudo docker build -t zibit-node-server .```
* run docker container:
```sudo docker run -p 3000:3000 -it zibit-node-server```
* pull nginx docker
```docker pull nginx```



