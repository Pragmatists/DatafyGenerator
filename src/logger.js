exports.write=function(message){
    process.stdout.write(message);
};

exports.writeln=function(message){
    process.stdout.write(message + "\n");
};
