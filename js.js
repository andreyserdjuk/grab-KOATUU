function saveTree(domElement) {
	xmlHttp2 = createXmlHttpRequestObject();
	if (xmlHttp2){
	  try {
	    xmlHttp2.open("GET","//koatuu/insert_controller.php?id="+domElement.getAttribute("recordid")+"&level="+domElement.getAttribute("level")+"&parent_id="+domElement.getAttribute("recordparentid"));
	    xmlHttp2.onreadystatechange = handleXML;
	    xmlHttp2.send(null);
	   }
	  catch (e) {
	  document.body.style.cursor = 'default';
	  alert("Неможливо з'єднатися з сервером:\n"+e.toString());
	 }
	}
}

function handleXML() {
	console.log(xmlHttp2.responseText);
}

function sec() {
	for(var i=0; i<s.length; i++) {
		if ( s[i].getAttribute("processed")=="0" ) {
			doTree(s[i]);
			saveTree(s[i]);
			break;
		}
		if (s.length-i==1) {
			getUnprocessed();
		}
	}
}

function getUnprocessed() {
	var table = document.getElementById("treetable"),
	spans = table.getElementsByTagName("span");
	s = [];
	for (var i=1; i<spans.length; i++) {
		if(spans[i].getAttribute("processed")=="0") {
			s[s.length] = spans[i];
		}
	}
}

function createXmlHttpRequestObject(){
	var localxmlHttp;
  try {
      localxmlHttp = new XMLHttpRequest();
  }
  catch(e) {
      var XmlHttpVersions = new Array('MSXML2.XMLHTTP.6.0',
                                      'MSXML2.XMLHTTP.5.0',
                                      'MSXML2.XMLHTTP.4.0',
                                      'MSXML2.XMLHTTP.3.0',
                                      'MSXML2.XMLHTTP',
                                      'Microsoft.XMLHTTP');
      for (var i=0;i<XmlHttpVersions.length && !localxmlHttp; i++)
          {
           try
           {
            localxmlHttp = new ActiveXOblect(XmlHttpVersions[i]);
           }
           catch(e){
             document.body.style.cursor = 'default';
           }
          }
  }
  if (!localxmlHttp)
      alert("Помилка створення об'єкта XMLHttpRequest.");
  else
      return localxmlHttp;
}

getUnprocessed();
intervalID = setInterval(function(){sec();}, 1000);
clearInterval(intervalID);