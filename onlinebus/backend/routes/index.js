var express = require('express');
var router = express.Router();
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  database : 'busschedule',
  user     : 'root',
  password : '',
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

connection.connect(function(err) {
  if (err) {
      console.error('Error connecting: ' + err.stack);
      return;
  }

  console.log('Connected as id ' + connection.threadId);
});

router.get('/getall', function(req,res,next){
  connection.query('SELECT * FROM schedule_info', function (error, results) {
    if (error)
        throw error;
        
    res.json(results)
  });
  
})

router.get('/getbyrouter:id',function(req,res,next){
  var route_id = req.params.id;
  
  connection.query('SELECT * FROM schedule_info WHERE route_id = ?',[route_id],function(error, results){
    if (error)
        throw error;
    res.json(results)   
    
  })
})
router.get('/getbystartplace:place',function(req,res,next){
  var startplace = req.params.place;
  console.log('startplace')
  connection.query('SELECT * FROM route_info WHERE start_place = ?',[startplace],function(error, results){
    if (error)
        throw error;
        
    res.json(results)
  })

})

router.get('/getbystartplace:place1:place2',function(req,res,next){
  var startplace = req.params.place1;
  var endplace = req.params.place2;

  console.log('startplace');
  console.log('endplace');
  /*connection.query('SELECT * FROM route_info WHERE start_place = ?',[startplace],function(error, results){
    if (error)
        throw error;
        
    res.json(results)
  })*/

})

//connection.end();

module.exports = router;
