var express = require('express');
var jade = require('jade');
var data = require('./data.js');
var server = express();
server.listen(2182);
var userRouter = express.Router();
var listRouter = express.Router();
var newsRouter = express.Router();
userRouter.use('',function(req,res){
	var max = Math.ceil(data.user.length/3);
	if(!req.query.page){
		var needArr = data.user.slice(0,3);
	}else{
		var needArr = data.user.slice((req.query.page-1)*3,req.query.page*3);
	}
	if(req.query.page==1||!req.query.page){
		var needPage = 1;
	}else{
		var needPage = req.query.page;
	}
	var str = jade.renderFile('./1.jade',{pretty:true,dataArr:needArr,maxL:max,link:'/user',page:needPage});
	res.send(str);
});
listRouter.use('',function(req,res){
	var max = Math.ceil(data.list.length/3);
	if(!req.query.page){
		var needArr = data.list.slice(0,3);
	}else{
		var needArr = data.list.slice((req.query.page-1)*3,req.query.page*3);
	}
	if(req.query.page==1||!req.query.page){
		var needPage = 1;
	}else{
		var needPage = req.query.page;
	}
	var str = jade.renderFile('./1.jade',{pretty:true,dataArr:needArr,maxL:max,link:'/list',page:needPage});
	res.send(str);
});
newsRouter.use('',function(req,res){
	var max = Math.ceil(data.news.length/3);
	if(req.query.page==1||!req.query.page){
		var needPage = 1;
	}else{
		var needPage = req.query.page;
	}
	if(!req.query.page){
		var needArr = data.news.slice(0,3);
	}else{
		var needArr = data.news.slice((req.query.page-1)*3,req.query.page*3);
	}
	var str = jade.renderFile('./1.jade',{pretty:true,dataArr:needArr,maxL:max,link:'/news',page:needPage});
	res.send(str);
});
server.use('/user',userRouter);
server.use('/list',listRouter);
server.use('/news',newsRouter);
server.use('',function(req,res){
	//设置默认页面
	var max = Math.ceil(data.user.length/3);
	// if(req.query.page==1||!req.query.page){
	// 	var needPage = 1;
	// }else{
	// 	var needPage = req.query.page;
	// }
	if(!req.query.page){
		var needArr = data.user.slice(0,3);
	}else{
		var needArr = data.user.slice((req.query.page-1)*3,req.query.page*3);
	}
	var str = jade.renderFile('./1.jade',{pretty:true,dataArr:needArr,maxL:max,link:'/user'});
	res.send(str);
});
