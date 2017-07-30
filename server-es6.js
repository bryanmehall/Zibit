import path from "path"
import express from "express"
import webpack from "webpack"
import fs from 'fs'
import expressWinston from 'express-winston-2'
import winston from 'winston'
import webpackDevMiddleware from "webpack-dev-middleware"
import config from "./webpack.dev.config.js"
import request from 'request'

const app = express(),
      DIST_DIR = path.join(__dirname, "dist"),
	  HTML_FILE     = path.join(DIST_DIR, "index.html"),
      PORT     = 3000,
      compiler = webpack(config)
console.log(process.env.NODE_ENV)
const isDevelopment  = process.env.NODE_ENV  !== "production"
const DEFAULT_PORT = 3000
app.set("port", process.env.PORT || DEFAULT_PORT);





if (isDevelopment) {
	app.use(webpackDevMiddleware(compiler, {
		publicPath: config.output.publicPath,
		stats: {
			colors: true
		}
	}))
	app.use('/content', express.static(__dirname))
	app.get("*", (req, res, next) => {
		const type = req.accepts('html', 'json')
		if (type === 'html'){
			 const filename = path.join(DIST_DIR, "index.html")
			 //when compiling, webpack serves the output from memory so this will get the bundle from the compiler
			 compiler.outputFileSystem.readFile(filename, (err, result) => {
				 if (err) {
					 console.log('error loading bundle', err)
					 return next(err)
				 }
				 res.set('content-type', type)
				 res.send(result)
				 res.end()
				})
		} else {//load static files
			const filepath = path.join(__dirname, req.path)
			fs.readFile(filepath, (err, data) => {
				if (err) {
					console.log('error loading json content', err)
					return next(err)
				}
				res.json(JSON.parse(data))
			})
		}
	})
} else {
	app.use(expressWinston.logger({
		transports: [
			new winston.transports.Console({
				json: true,
				colorize: true
			})
		]
	}))
	app.use('/content', express.static(__dirname))
	app.get('/bundle.js/',(req, res, next) => {
		const filepath = path.join(__dirname, 'dist', 'bundle.js')
		fs.readFile(filepath, (err, data) => {
				console.log('reading')
				if (err) {
					console.log('error loading json content', err)
					return next(err)
				}
				res.set('content-type', 'text/javascript')
				res.send(data)
			})
	})
	app.use('/*', express.static(path.join(__dirname, 'dist')))

}


app.listen(app.get("port"),()=>{
	 const host = 'abc'//server.address().address
	 const port = app.get("port")
	 console.log(`server running at ${host}:${port} in ${isDevelopment? "development":"production"} mode`)
})
