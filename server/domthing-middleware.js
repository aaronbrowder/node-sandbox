'use strict';

var fs = require('fs');
var path = require('path');
var glob = require('glob');
var async = require('async');
var domthing = require('domthing');

module.exports = function(params) {
  var srcDir = params.srcDir;
  var destPath = params.destPath;
  
  return function(request, response, next) {
    
    fs.readdir(srcDir, function(err, srcFiles) {
      if (err) throw err;
      var srcMtime = getLatestModifiedTime(srcDir, srcFiles);
      
      fs.stat(destPath, function(err, destStats) {
        // ENOENT means the file does not exist (which is fine)
        if (err && err.code != 'ENOENT') throw err;
        var destMtime = destStats ? destStats.mtime : null;
        
        // var s = srcMtime.toString();
        // var d = destMtime.toString();
        
        if (!srcMtime || !destMtime || srcMtime > destMtime) {
          compile(srcDir, destPath, next);
        } else {
          next();
        }
      });
    });
  };
};

var getLatestModifiedTime = function(dir, files) {
  var latest = new Date();
  files.forEach(function(file) {
    var fullPath = path.join(dir, file);
    var mtime = fs.statSync(fullPath).mtime;
    if (mtime > latest) latest = mtime;
  });
  return latest;
};

var compile = function(srcDir, destPath, callback) {
  var match = path.join(srcDir, '**', '*.hbs');
  glob(match, function (err, paths) {
    if (err) throw err;
    async.map(
      paths,
      compileTemplate,
      function (err, outputs) {
        if (err) throw err;
        var file = [
          "var templates = {};",
          "templates._runtime = require('domthing/runtime');"
        ].concat(outputs).concat(["module.exports = templates;"]);
        fs.writeFile(destPath, file.join('\n'), function(err) {
          if (err) throw err;
          callback();
        });
      }
    );
  });
  
  var compileTemplate = function(p, next) {
    var tmpl = fs.readFileSync(p).toString();
    domthing.parser(tmpl, function (err, ast) {
      if (err) return next(err);
      var compiled = domthing.compiler.compile(ast);
      var parts = path.relative(srcDir, p).split(path.sep);
      var name = parts[parts.length - 1].split('.')[0];
      next(null, "templates['" + name + "'] = " + compiled + '.bind(templates);');
    });
  };
};