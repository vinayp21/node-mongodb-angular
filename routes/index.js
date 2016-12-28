var express = require('express');
var router = express();
var MongoDb = require('mongodb');
var mongoose = require('mongoose');
/* GET home page. */
var curd = mongoose.model('employeeModel', {
        empName : String,
		empEmail:String,
		empSalary:Number,
		designation:String,
		DOB:String
    },'employee');
router.get('/', function(req, res, next) {
	res.sendfile('views/app.html');
  //res.render('index', { title: 'Express' });
});

function connectToDB(){
var url = 'mongodb://localhost:27017/backendApp';
mongoose.connect(url);
}

router.get('/getAllEmployees', function(req, res, next) {
	 
	connectToDB();
	curd.find(function(err, result) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err){
				     res.send(err);
			}else{
            res.json(result); // return all result in JSON format
			}
			mongoose.connection.close();
        });
});
	
router.post('/addEmployee', function(req, res) {
	connectToDB();
	curd.create({
        empName : req.body.empName,
		empEmail:req.body.empEmail,
		empSalary:req.body.empSalary,
		designation:req.body.designation,
		DOB:req.body.DOB
        }, function(err, dbres) {
            if (err){
				console.log('error');
                res.send(err);
				mongoose.connection.close();
			}else{
				curd.find(function(err, result) {
				if(err){
					console.log("err"+err);
					res.send(err);
				}else{
					//console.log("err");
					res.json(result);
				}
				mongoose.connection.close();
				});
			
			}
			//mongoose.connection.close();
		});
});


router.delete('/deleteEmployee/:id', function(req, res, next) {
	connectToDB();
	curd.remove({
            _id : req.params.id
        }, function(err, dbres) {
            if (err){
                res.send(err);
				mongoose.connection.close();
			}else{
				curd.find(function(errr, result) {
				if(errr){
					console.log("err"+err);
					res.send(err);
					
				}else{
					res.json(result);
				}
				mongoose.connection.close();
				});
			}
			
		});
});
module.exports = router;
