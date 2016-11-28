function loadFiles(){

  // Create a loader for file preloading
  var preload = new createjs.LoadQueue();

  // Handle file loader by adding it to a nice display
  preload.on("fileload", function(ev) {
    console.log(ev);

    s = ev.item.src;
    v = " " + (".").repeat(30-s.length);
    $("#loader").append("<li>" + s + v + " chargé #" );
  }, this);

  // When preloading is complete continue the loading
  preload.on("complete", function(ev) {
    $("#loader").append("<li>" + ("=").repeat(40)  );
    loadDatas(preload);
  }, this);

  // Define the manifest of file that have to be preloaded
  preload.loadManifest(["js/os.js", "src/os.png", "src/boot.ogg"] , false);

  // Start downloading
  preload.load();
}



function loadDatas(loaded){

}

function osDetect() {
  var os;
  if ( navigator.userAgent.indexOf ("Unix") != -1)
    os = "Unix";
  else if (navigator.userAgent.indexOf ("Linux") != -1)
    os = "Linux";
  else if (navigator.userAgent.indexOf ("NT") != -1)
    os = "Windows";
  else if (navigator.userAgent.indexOf ("95") != -1)
    os = "Windows 95";
  else if (navigator.userAgent.indexOf ("16") != -1)
    os = "Windows v3.1x";
  else if (navigator.userAgent.indexOf ("Win") != -1)
    os = "Windows";
  else if (navigator.userAgent.indexOf ("PPC") != -1)
    os = "Macintosh Power PC";
  else if (navigator.userAgent.indexOf ("Mac") != -1)
    os = "Macintosh";
  else
    os = "Inconnu";
  return ( os );
}

$("#loader").append("<li>" + navigator.appCodeName + " sur " + osDetect() );
$("#loader").append("<li>" + new Date());
loadFiles();

// new Audio(ev.result.src).play();
