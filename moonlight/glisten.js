// Version 4.0 - https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
const pSBC=(p,c0,c1,l)=>{
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
    if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(","),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
            d=i(d.slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}


$('head').append(`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />`) //Import google material symbols (rounded)

var classes = { //Dictionary of classes with associated icon and css color (Material symbol names from Google Fonts)
	"BUSINESS 1299E": {color: "#fa415a", icon: "work"},
	"CHEM 1302A": {color: "orange", icon: "science"},
	"ENGSCI 1022Y": {color: "#0051ff", icon: "compress"},
	"PHYSICS 1401A": {color: "#00b0bd", icon: "compare_arrows"},
	"PHYSICS 1402B": {color: "#00b0bd", icon: "compare_arrows"},
	"ENGSCI 1021A": {color: "#743400", icon: "widgets"},
	"ENGSCI 1050": {color: "#960c8f", icon: "engineering"},
	"ENGSCI 1036B": {color: "#07bb89", icon: "code"},
	"WRITING 2130F": {color: "#d1b736", icon: "menu_book"},
	"NMM 1411B": {color: "#00ba70", icon: "data_array"},

	//It's a new year!
	"SE 2202A": {color: "#d1c043", icon: "code"},
	"NMM 2270A": {color: "#1dcf76", icon: "function"},
	"STATS 2141A": {color: "#76d600", icon: "monitoring"},
	"ECE 2277A": {color: "#d69600", icon: "memory_alt"},
	"SE 2205A": {color: "#c42e00", icon: "schema"},

	// "": {color: "", icon: ""},
}
var projects = { //Like classes, but matches whole title exactly.
	// "": {color: "", icon: ""},
}

$('.link-container span').each(function(){ //.link-container is only in the header, from what I can tell.
	let text = this.textContent.split(" ") //Get the text as an array of words seperated by spaces
	let lookup = (text.length >= 2) ? text[0]+" "+text[1] : text //Re-combine only the first two words, to use to lookup in the table. If the array only contains one word, just use it.
	if(classes[lookup]){ //Check if we have an entry for this class (will be truthy if not undefined)
		setupGlisten($(this), classes[lookup])
	}else if(projects[this.textContent]){ //If we didn't match the first two words, perhaps we can match the whole expression?
		setupGlisten($(this), projects[this.textContent])
	}
})

function setupGlisten(query, cls){
	query.closest('.Mrphs-sitesNav__menuitem').addClass("glisten")
	.css('--ml-color', cls.color) //Add the glisten class that represents that we have found a match, and set up colors
	.css('--ml-color-darker', pSBC(-0.20 ,cls.color))
	.css('--ml-color-darkerer', pSBC(-0.40 ,cls.color))
	query.prepend(`<span class="material-symbols-rounded">${cls.icon}</span>`) //Add the material symbol template, to display the icon.
}