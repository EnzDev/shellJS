var enzos = {
  v : '0.1',
  com : [],
  wd : ["~"],
  files : {
    "~" : {
      "git" : {
      },
      "about.txt" : "sometext\nblabla"
    }
  }
};

var commands = {};
  commands.ls = function(arg) {
    dir = enzos.files;
    for (path of enzos.wd) {
      dir = dir[path];
    }
    return dir;
  };

  commands.pwd = function(arg) {
    return enzos.wd.join("/");
  };

  commands.cd = function (arg) {
    arg = arg.split("/").filter(function(p){ return p!==""; });
    var dir;
    if (arg[0] == "~") {
      dir = enzos.files;
    }else {
      dir = commands.ls();
    }
    for (path of arg) {
      dir = dir[path];
    }
    return dir || "erreur"; // If dir is buggy it will throw error
  };

  commands.mkdir = function (arg) {
    dir = commands.ls();
    if (!(arg in dir) && arg!==''){
      dir[arg] = {};
      return arg + " créé";
    }else if (arg==='') {
      return "nom de dossier requis";
    }else {
      return arg + " existe déjà";
    }
  };

  var enzos = {
    v : '0.1',
    com : [],
    wd : ["~"],
    files : {
      "~" : {
        "git" : {
        },
        "about.txt" : "bonjour\nyolo",
        "demo.md" : "**test**"
      }
    }
  };

  var commands = {};
    commands.ls = function(arg) {
      var dir = enzos.files;
      for (path of enzos.wd) {
        dir = dir[path];
      }
      return dir;
    };

    commands.pwd = function(arg) {
      return enzos.wd.join("/");
    };

    commands.cd = function (arg) {
      arg = arg.split("/").filter(function(p){ return p!==""; });
      var dir;
      var pathD;
      if (arg[0] == "~") {
        dir = enzos.files;
        pathD = ["~"];
      }else {
        dir = commands.ls();
        pathD = enzos.wd;
      }
      for (path of arg) {
        dir = dir[path];
        pathD.push(path);
      }
      if (typeof(dir)=='object') enzos.wd = pathD;
      return dir || "erreur"; // If dir is buggy it will throw error
    };

    commands.mkdir = function (arg) {
      dir = commands.ls();
      if (!(arg in dir) && arg!==''){
        dir[arg] = {};
        return arg + " créé";
      }else if (arg==='') {
        return "nom de dossier requis";
      }else {
        return arg + " existe déjà";
      }
    };

    commands.cat = function(args) {

    };

    commands.clear = function(args) {
      $(".main div:not(.current)").remove();
      $(".current input").select();
    };

  function dirFormater(dir){
      var g = "";

      for (f in dir) {
        if (typeof(dir[f])=='object') g += '<span class="ls folder">'+f+'</span>';
        else g += '<span class="ls block">'+f+'</span>';
      }
            console.log(g);

      return g;
  }

  commands.use = function(fun, args="") {
    console.log(fun + "\t" + args);
    if (fun in commands) {
      ret = commands[fun](args);
      return (fun=="ls") ? dirFormater(ret) : ret ;
    }else {
      return fun + " n'exite pas (encore)";
    }
  };
