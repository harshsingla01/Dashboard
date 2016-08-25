    router.route('/TowerData')
    .get(function(req,res,next){

   jsonfile.readFile(file, function(err, staticData) {
    if(err){
      console.log("Error while loading Tower Details from Static Data " + err);
    }
    else{
      var staticD = staticData.Teams;
      var l = staticData.Teams.length;
     // console.log('*******************Getting Tower Level Data from Static File*******************');
      //console.log('*******************Tower Name received is ******************* ' + staticData.Tower);
          if(counter == l){
            console.log('Inside the couneter loop');
           res.json(testObject);
          }
      for ( var i = 0 ; i<l; i++){
       var trackName = staticD[i].name
       console.log('Counter--------->>>>' + counter);
        //console.log("Team name " + staticD[i].name);
            ++counter;
        for (var j = 0 ; j<staticD[i].applications.length;j++){
         //var RObj;
         //var AObj;
          //console.log("Application Name " + staticD[i].applications[j]);
          var applicationName = staticD[i].applications[j];
          var test = new Object();
          test.data =  [];
          var resultSet;
         
         var response = reference.find({'appname' : applicationName , 'track' : trackName }).sort({'_id': -1});
         var promise = response.exec();
         var alertT = alert.find({'appname' : applicationName , 'track' : trackName }).sort({'_id': -1}).limit(1);
         var promise1 = alertT.exec();

            promise.then(function allRefRecords (recordAlerts){
             if(recordAlerts.length >0){
              //console.log('Ref Length' + recordAlerts.length);
            recordAlerts.forEach(function refRecord(R){
              testObject.data.testInfra.push(R);
              //console.log('testObject' + testObject.data.testInfra);
              });
        }
                
              });

            promise1.then(function allAlertsRecords (alerts){
              if(alerts.length > 0){
            alerts.forEach(function refRecord(a){
            // console.log('a' + a)
             testObject.data.testCustom.push(a);
              //console.log('testObject' + testObject.data.testCustom);
             // res.json(testObject);

           });
          }           
              })
            .then(function(){
               resultSet = compareData(testObject.data.testCustom,testObject.data.testInfra);
               test.data.push(resultSet);
              })
            .then(function(){
              res.json(test);
            });
        }
       
      }
    
    }
    
    });
 
    });