var exec = require('child_process').exec,
PouchDB = require('pouchdb'),
verb=require('verbo'),
diff=require('deep-diff')



function overr(data,overrides){
  diff.observableDiff(data, overrides, function (d) {
      // Apply all changes except those to the 'name' property...
      if (d.kind != 'D') {
          diff.applyChange(data, overrides, d);
      }
  });
}


module.exports = {

data:function(cmd,callback){
  exec(cmd, function(error, stdout, stderr) {
    if(callback){
      callback(stdout)
    }
})
},
save:function(cmd,db,overrides,callback){
  var db=PouchDB(db);
this.data(cmd,function(dat){
var data=JSON.parse(dat);
data.updatedAt=new Date().getTime();


overr(data,overrides);


if(data._id){


  db.get(data._id).then(function(doc){
        data._rev=doc._rev;


        db.put(data).then(function(d){
        //  console.log(d)
        if(callback){
          callback(data)
        }
        }).catch(function(err){
          verb(err,"error","Memrun");
          if(callback){
      callback({error:err})
      }
        });


  }).catch(function(err){
    if (err.status&&err.status==404) {
        db.put(data).then(function(){
          if(callback){
            callback(data)
          }
        });
      } else{
        verb(err,"error","Memrun")
        if(callback){
    callback({error:err})
    }
      }
  })
} else{
  db.post(data).then(function(){
    if(callback){
      callback(data)
    }
  }).catch(function(err){
    verb(err,"error","Memrun post obj"+data);
    if(callback){
callback({error:err})
}
  });
}

  })




},
ifchange:function(cmd,db,overrides,callback){
  var db=PouchDB(db);
this.data(cmd,function(dat){
var data=JSON.parse(dat);
data.updatedAt=new Date().getTime();



overr(data,overrides);


if(data._id){


  db.get(data._id).then(function(doc){
        data._rev=doc._rev;
doc.updatedAt=data.updatedAt;
        if(diff(data,doc)){

        db.put(data).then(function(d){
        //  console.log(d)
        if(callback){
          callback(data)
        }
        }).catch(function(err){
          verb(err,"error","Memrun");
          if(callback){
      callback({error:err})
      }
        });
}

  }).catch(function(err){
    if (err.status&&err.status==404) {
        db.put(data).then(function(){
          if(callback){
            callback(data)
          }
        });
      } else{
        verb(err,"error","Memrun")
        if(callback){
    callback({error:err})
    }
      }
  })
} else{
  db.post(data).then(function(){
    if(callback){
      callback(data)
    }
  }).catch(function(err){
    verb(err,"error","Memrun post obj"+data);
    if(callback){
callback({error:err})
}
  });
}

  })




}
}
