var memrun = require('../index.js'),
verb=require('verbo'),
testdb='testdb',
db=require('pouchdb')(testdb),
rm=require('rm-r');


var over={
  _id:'test',
  jj:"gg"

};
var oveer={
  _id:'test',
  ff:"zz"
};
memrun.data("echo '{\"aa\":\"bb\"}'",{},function(data){
  verb(JSON.stringify(data),"debug","Memrun:data");
  memrun.save("echo '{\"aa\":\"bb\"}'",testdb,{},function(data){
    verb(JSON.stringify(data),"info","Memrun:save");
    memrun.save("echo '{\"aa\":\"bb\"}'",testdb,over,function(data){
      verb(JSON.stringify(data),"info","Memrun:save");
      memrun.ifchange("echo '{\"aa\":\"bb\"}'",testdb,oveer,function(data){
        verb(JSON.stringify(data),"debug","Memrun:change");
        memrun.ifchange("echo '{\"aa\":\"bb\"}'",testdb,over,function(data){
          verb(JSON.stringify(data),"debug","Memrun:change");
          memrun.ifchange("echo '{\"aa\":\"bb\"}'",testdb,over,function(data){
            verb(JSON.stringify(data),"error","Memrun:change");
            process.exit(1);
          });
            rm.dir('./'+testdb)
        });
      });


    });
  });
});
