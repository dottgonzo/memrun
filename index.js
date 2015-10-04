var exec = require('child_process').exec,
PouchDB = require('pouchdb'),
verb=require('verbo'),
diff=require('deep-diff'),
Promise = require('promise');



function overr(data,overrides){
  diff.observableDiff(data, overrides, function (d) {
      // Apply all changes except those to the 'name' property...
      if (d.kind != 'D') {
          diff.applyChange(data, overrides, d);
      }
  });
}

function ex(cmd){
  return new Promise(function (resolve, reject) {

  exec(cmd, function(error, stdout, stderr) {
var data=JSON.parse(stdout);
    if (!data) reject('no data');
    else resolve(data);
})

})
}

module.exports = {
  pure:function(cmd){
  return ex(cmd);
  },
data:function(cmd,overrides){
  return new Promise(function (resolve, reject) {
    verb('z')

ex(cmd).then(function(data){
  overr(data,overrides);
resolve(data);
}).catch(function(err){
  reject(err)
})

})

},
save:function(cmd,db,overrides,callback){
  var db=PouchDB(db);
  return new Promise(function (resolve, reject) {
ex(cmd).then(function(data){
  overr(data,overrides);
data.updatedAt=new Date().getTime();

if(data._id){


  db.get(data._id).then(function(doc){
        data._rev=doc._rev;


        db.put(data).then(function(d){
        //  console.log(d)
          resolve(data);

        }).catch(function(err){
          verb(err,"error","Memrun");
          reject(err)

        });


  }).catch(function(err){
    if (err.status&&err.status==404) {
        db.put(data).then(function(){
            resolve(data);

        });
      } else{
        verb(err,"error","Memrun")
        reject(err)

      }
  })
} else{
  db.post(data).then(function(){
    resolve(data);

  }).catch(function(err){
    verb(err,"error","Memrun post obj"+data);
    reject(err)

  });
}



}).catch(function(err){
  reject(err)
})

})



},
ifchange:function(cmd,db,overrides,callback){
  var db=PouchDB(db);
  return new Promise(function (resolve, reject) {
ex(cmd).then(function(data){
  overr(data,overrides);
data.updatedAt=new Date().getTime();

if(data._id){


  db.get(data._id).then(function(doc){
        data._rev=doc._rev;
doc.updatedAt=data.updatedAt;
        if(diff(data,doc)){

        db.put(data).then(function(){
        //  console.log(d)
        resolve(data);

        }).catch(function(err){
          verb(err,"error","Memrun");
          reject(err)

        });
} else{
  reject({success:false,error:"equals",data:data})
}

  }).catch(function(err){
    if (err.status&&err.status==404) {
        db.put(data).then(function(){
          resolve(data);

        });
      } else{
        verb(err,"error","Memrun")
        reject(err)

      }
  })
} else{
  db.post(data).then(function(){
    resolve(data);

  }).catch(function(err){
    verb(err,"error","Memrun post obj"+data);
    reject(err)

  });
}

  }).catch(function(err){
    verb(err,"error","Memrun post obj"+data);
    reject(err)

  });

})


}
}
