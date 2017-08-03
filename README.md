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

### production (ugly deployment --update to nix and CD)
docker
* build docker container:
```sudo docker build -t zibit-node-server .```
* run docker container:
```sudo docker run -p 3000:3000 -it zibit-node-server```
* pull nginx docker
```docker pull nginx```
* save docker image
```sudo docker save -o ./dockerBuild/nodeServer zibit-node-server```
below is on server 
* load server from image 
```sudo docker load -i nodeServer```
* copy docker image to server
```sudo scp -i ~/.ssh/id_rsa ./dockerBuild/nodeServer root@kodiak.bryanmehall.com:/srv```

* run server as daemon from port 80 (this should have nginx in front)
```sudo docker run -d -p 80:3000 -it zibit-node-server```
* stop server
```sudo docker stop <contianer hash id>
