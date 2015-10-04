var memrun = require('../index.js'),
verb=require('verbo'),
testdb='testdb',
db=require('pouchdb')(testdb);


var over={
  _id:'test'
};
var oveer={
  _id:'testt'
};
memrun.data("echo '{aa:bb}'",function(data){
  verb(data,"info","Memrun");
});
memrun.save("echo '{\"aa\":\"bb\"}'",testdb,{},function(data){
  verb(JSON.stringify(data),"debug","Memrun");
db.allDocs({include_docs:true}).then(function(doc){
  for(var i=0;i<doc.rows.length;i++){
    verb(JSON.stringify(doc.rows[i].doc))

  }
})
});
memrun.save("echo '{\"aa\":\"bb\"}'",testdb,over,function(data){
  verb(JSON.stringify(data),"debug","Memrun");
db.allDocs({include_docs:true}).then(function(doc){
  for(var i=0;i<doc.rows.length;i++){
    verb(JSON.stringify(doc.rows[i].doc))

  }
})
});
memrun.ifchange("echo '{\"aa\":\"bb\"}'",testdb,oveer,function(data){
  verb(JSON.stringify(data),"debug","Memrun");
db.allDocs({include_docs:true}).then(function(doc){
  for(var i=0;i<doc.rows.length;i++){
    verb(JSON.stringify(doc.rows[i].doc))

  }
})
});
memrun.ifchange("echo '{\"aa\":\"bb\"}'",testdb,oveer,function(data){
  verb(JSON.stringify(data),"debug","Memrun");
db.allDocs({include_docs:true}).then(function(doc){
  for(var i=0;i<doc.rows.length;i++){
    verb(JSON.stringify(doc.rows[i].doc))

  }
})
});
