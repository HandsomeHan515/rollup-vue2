var a;
var b = false;
var c = true;

var flag = null
function handle (wd) {
    console.log('wd', wd)
}

flag = a !== undefined ? a : b || c, handle(flag)