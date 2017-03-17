!function(e){function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var t={};n.m=e,n.c=t,n.i=function(e){return e},n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=19)}([function(e,n){e.exports={secret:"ilovemyself",database:"mongodb://localhost/node-jwt"}},function(e,n){e.exports=require("express")},function(e,n){e.exports=require("jsonwebtoken")},function(e,n,t){"use strict";const r=t(9);var o=t(13);n.saveUser=function(e,n){var t=new r(e);return new o(function(e,n){t.save().then(function(n){e(n)},function(e){n(e)})})},n.getAllUsers=function(){return new o(function(e,n){r.find().then(function(n){e(n)},function(e){n(e)})})},n.getUserByName=function(e){return new o(function(n,t){r.findOne({name:e}).then(function(e){n(e)},function(e){t(e)})})}},function(e,n){e.exports=require("mongoose")},function(e,n,t){(function(n){var r=t(1),o=t(17),s=t(18),i=t(16),u=t(15),c=t(14),a=t(4),f=t(0),p=t(10),d=t(11),l=t(8),v=r();a.connect(f.database),v.set("views",o.join(n,"views")),v.set("view engine","jade"),v.set("superSecret",f.secret),v.use(s(o.join(n,"public","favicon.ico"))),v.use(i("dev")),v.use(c.json()),v.use(c.urlencoded({extended:!1})),v.use(u()),v.use(r.static(o.join(n,"public"))),v.use("/",p),v.use("/api",l.authorize,d),v.use(function(e,n,t){var r=new Error("Not Found");r.status=404,t(r)}),v.use(function(e,n,t,r){t.locals.message=e.message,t.locals.error="development"===n.app.get("env")?e:{},t.status(e.status||500),t.render("error")}),e.exports=v}).call(n,"/")},function(e,n){e.exports=require("debug")},function(e,n){e.exports=require("http")},function(e,n,t){var r=t(2),o=t(0);n.authorize=function(e,n,t){var s=e.body.token||e.query.token||e.headers["x-access-token"];if(!s)return n.status(403).send({success:!1,message:"No token provided."});r.verify(s,o.secret,function(r,o){if(r)return n.json({success:!1,message:"Failed to authenticate token."});e.decoded=o,t()})}},function(e,n,t){var r=t(4),o=t(12),s=r.Schema,i=new s({name:{type:String,required:!0},password:{type:String,required:!0},admin:{type:Boolean,required:!0}});i.pre("save",function(e){var n=this;if(!n.isModified("password"))return e();o.genSalt(5,function(t,r){if(t)return e(t);o.hash(n.password,r,null,function(t,r){if(t)return e(t);n.password=r,e()})})}),i.methods.verifyPassword=function(e,n){o.compare(e,this.password,function(e,t){if(e)return n(e);n(null,t)})},e.exports=r.model("User",i)},function(e,n,t){var r=t(1),o=r.Router(),s=t(3),i=t(2),u=t(0);o.get("/",function(e,n,t){n.render("index",{title:"Home"})}),o.post("/register",function(e,n){s.saveUser(e.body).then(function(e){n.send(e)},function(e){n.status(206).send(e)})}),o.post("/authenticate",function(e,n){s.getUserByName(e.body.name).then(function(t){t?t&&t.verifyPassword(e.body.password,function(e,r){if(e)return n.status(500).send(e);if(!r)return n.json({success:!1,message:"Authentication failed. Wrong password."});var o={sub:t._id,iss:"https://app-jwt.com",permissions:"identify"},s=i.sign(o,u.secret,{expiresIn:"24h",algorithm:"HS512"});n.json({success:!0,message:"Enjoy your token!",token:s})}):n.json({success:!1,message:"Authentication failed. User not found."})},function(e){n.status(500).send(e)})}),e.exports=o},function(e,n,t){var r=t(1),o=r.Router(),s=t(3);t(2),t(0);o.get("/",function(e,n,t){n.send("respond with a resource")}),o.get("/users",function(e,n){s.getAllUsers().then(function(e){n.send(e)},function(e){n.status(500).send(e)})}),e.exports=o},function(e,n){e.exports=require("bcrypt-nodejs")},function(e,n){e.exports=require("bluebird")},function(e,n){e.exports=require("body-parser")},function(e,n){e.exports=require("cookie-parser")},function(e,n){e.exports=require("morgan")},function(e,n){e.exports=require("path")},function(e,n){e.exports=require("serve-favicon")},function(e,n,t){function r(e){var n=parseInt(e,10);return isNaN(n)?e:n>=0&&n}function o(e){if("listen"!==e.syscall)throw e;var n="string"==typeof a?"Pipe "+a:"Port "+a;switch(e.code){case"EACCES":console.error(n+" requires elevated privileges"),process.exit(1);break;case"EADDRINUSE":console.error(n+" is already in use"),process.exit(1);break;default:throw e}}function s(){var e=f.address(),n="string"==typeof e?"pipe "+e:"port "+e.port;u("Listening on "+n),console.log("App has started on "+n)}var i=t(5),u=t(6)("node-api-jwt:server"),c=t(7),a=r(process.env.PORT||"3000");i.set("port",a);var f=c.createServer(i);f.listen(a),f.on("error",o),f.on("listening",s)}]);