$('head').append(`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />`) //Import google material symbols (rounded)

var classes = { //Dictionary of classes with associated icon and css color (All valid css colors work. Material symbol names from Google Fonts)
	"NMM 1412A": {color:"green", icon: "calculate"},
	"NMM 1414B": {color:"green", icon: "calculate"},
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
	// "": {color: "", icon: ""},
}
var projects = { //Like classes, but matches whole title exactly.
	// "": {color: "", icon: ""},
}

$('.link-container span').each(function(){ //.link-container is only in the header, from what I can tell.
	let text = this.textContent.split(" ") //Get the text as an array of words seperated by spaces
	let lookup = (text.length >= 2) ? text[0]+" "+text[1] : text //Re-combine only the first two words, to use to lookup in the table. If the array only contains one word, just use it.
	if(classes[lookup]){ //Check if we have an entry for this class (will be truthy if not undefined)
		$(this).closest('.Mrphs-sitesNav__menuitem').addClass("glisten").css('--ml-color', classes[lookup].color) //Add the glisten class that represents that we have found a match, and set up colors
		$(this).prepend(`<span class="material-symbols-rounded">${classes[lookup].icon}</span>`) //Add the material symbol template, to display the icon.
	}else if(projects[this.textContent]){ //If we didn't match the first two words, perhaps we can match the whole expression?
		$(this).closest('.Mrphs-sitesNav__menuitem').addClass("glisten").css('--ml-color', projects[this.textContent].color) //TODO: extract these to a seperate function
		$(this).prepend(`<span class="material-symbols-rounded">${projects[this.textContent].icon}</span>`)
	}
})