/* qt1475011190 d3456000 D */
var klvu = new Array("U_S__Consumer_Product_Safety_Commission.html",  "Electrical_wiring.html",  "AC_power_plugs_and_sockets.html",  "Thermal_cutoff.html",  "Video_game_packaging.html",  "Bathtub.html",  "Toaster.html",  "Usability.html",  "Alloy.html",  "Mica.html",  "Insulation__list_of_insulation_material_.html",  "Residual_current_device.html",  "Camilla.html",  "Hair_dryer.html",  "Coil.html",  "Sensor.html",  "Mechanical_fan.html");
var klvt = new Array("consumer products safety commission",  "electrical wires",  "electrical plug",  "thermal fuse",  "instruction booklet",  "bathtub",  "toaster",  "user-friendly",  "alloy",  "mica",  "insulating materials",  "gfci",  "camilla",  "hair dryer",  "coil",  "detects",  "electric fan");

function kghighlightword(snode,word,url) {
	
	var res = false;
	var allowchr = ' ,."()-[]<>`:;/?!\'\n';

	var nnl = snode.nodeName.toLowerCase();

	if (nnl=='a' || nnl=='h1' || nnl=='h2' || nnl=='h3' || nnl=='h4' || nnl=='h5' || nnl=='h6' || nnl=='span' || nnl=='b' || nnl=='i' || nnl=='object' || nnl=='script'|| nnl=='strong') return res;

	if (snode.className && (snode.className=="adwords_in_content" || snode.className=="Comments_form" || snode.className=="alt2" || snode.className=="smallfont")) return res;

	if (snode.id && (snode.id=="footer" || snode.id=="interlink_nav")) return res;

	if (snode.hasChildNodes) {
		var hi_cn;
		for (hi_cn=0;hi_cn<snode.childNodes.length;hi_cn++) {
			if (res = kghighlightword(snode.childNodes[hi_cn],word,url)) break;
		}
	}
	if (snode.nodeType == 3) {
		tmpNode = snode.nodeValue.toLowerCase();
		tmpWord = word.toLowerCase();
		if (tmpNode.indexOf(tmpWord) != -1) {
			var pn = snode.parentNode;
			if (pn.className != "knldlink") {
				var nv = snode.nodeValue;
				var ni = tmpNode.indexOf(tmpWord);
				if ((allowchr.indexOf(nv.charAt(ni-1))==-1)||(allowchr.indexOf(nv.charAt(ni+word.length))==-1)) {
					return res;
				}
				var before = document.createTextNode(nv.substr(0,ni));
				var linkText = nv.substr(ni,word.length);
				var after = document.createTextNode(nv.substr(ni+word.length));
				var linkNode = document.createTextNode(linkText);
				var link = document.createElement('a');
				link.setAttribute('href','/knowledge/'+url);
				link.setAttribute('title',"View '"+word+"' definition from Wikipedia");
				link.className='knldlink';
				if (typeof(pageTracker)!='undefined') link.setAttribute('onclick',"pageTracker._trackEvent('knowledge', 'click', 'word', '"+word+"');");
				link.setAttribute('rel','nofollow');
				link.appendChild(linkNode);
				pn.insertBefore(before,snode);
				pn.insertBefore(link,snode);
				pn.insertBefore(after,snode);
				pn.removeChild(snode);
				return true;
			}
		}
	}
	return res;
}

function kginit(klvt,klvu) {
	// vbulletin forum
	var kgse = document.getElementById("posts");
	var kgls = 'document.getElementById(posts)';
	
	if (!kgse) {
		// encyclopedia new pages
		var kgse = document.getElementById("article_container");
		kgls = 'document.getElementById(article_container)';
	}
	if (!kgse) {
		// encyclopedia pages
		var kgse = document.getElementById("content");
		kgls = 'document.getElementById(content)';
	}
	if (!kgse) {
		// other pages - get whole body
		var kgse = document.getElementsByTagName('body')[0];
		kgls = 'document.getElementsByTagName(body)[0]';
	}
	if (!kgse) {
		var kgse = document.childNodes[0];
		kgls = 'document.childNodes[0]';
	}
	
	//console.log(kgls);
	//console.log('-------');
	//console.log(kgse);
	//console.log('-------');
	
	var kli = 10;
	var kgec = klvu.length;

	for (var c=0; c<kgec; c++) {
		if (kghighlightword(kgse,klvt[c],klvu[c])) kli--;
		if (kli<1) break;
	}
}

if (typeof(klvu)!='undefined' && typeof(klvt)!='undefined' && klvu.length>0 &&  klvu.length==klvt.length)	{

	setTimeout(function() { kginit(klvt,klvu); }, 1000);

}

