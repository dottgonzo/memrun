var diff=require('deep-diff');

var aa={"aa":"bb"};
var bb={};


diff.observableDiff(aa, bb, function (d) {
    // Apply all changes except those to the 'name' property...
    console.log(d);
    if (d.kind != 'D') {
        diff.applyChange(aa, bb, d);
    }
});
console.log(aa)
