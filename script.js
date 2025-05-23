document.getElementById("input-prefix").value="none"
document.getElementById("output-prefix").value="none"
let quantity=""

// prefix name to number
function prefixNumber(prefix) {
	const binary={
		"T": 1024**4,
		"G": 1024**3,
		"M": 1024**2,
		"k": 1024,
		"none": 1,
	}
	
	const decimal={
		"G": 10**9,
		"M": 10**6,
		"k": 10**3,
		"h": 10**2,
		"da": 10,
		"none": 1,
		"d": 10**(-1),
		"c": 10**(-2),
		"m": 10**(-3),
		"μ": 10**(-6),
		"n": 10**(-9),
	}

	if(quantity === "info") {
		return binary[prefix]
	}
	else {
		return decimal[prefix]
	}
}

// convert function
function unitConvert(input, input_prefix, input_unit, output_prefix, output_unit) {
	let output
	// input-output key
	let key=`${input_unit}-${output_unit}`

	// unit factors
	const factors={
		// information
		"B-b": 8,
		"B-nib": 2,
		"b-B": 1/8,
		"b-nib": 1/4,
		"nib-B": 1/2,
		"nib-b": 4,
		// length
		"ft-m": 0.3048,
		"in-m": 0.0254,
		"m-ft": 1/0.3048,
		"m-mi": 1/1609.344,
		"m-in": 1/0.0254,
		"mi-m": 1609.344,
		// mass
		"g-lb": 1/453.59237,
		"g-long tons": 1/1016046.9088,
		"g-oz": 1/28.349523125,
		"g-short tons": 1/907184.74,
		"g-t": 1/1000,
		"lb-g": 453.59237,
		"lb-long tons": 1/2240,
		"lb-oz": 16,
		"lb-short tons": 1/2000,
		"lb-t": 0.00045359237,
		"long tons-g": 1016046.9088,
		"long tons-lb": 2240,
		"long tons-oz": 35840,
		"long tons-short tons": 1.12,
		"long tons-t": 1.0160469088,
		"oz-g": 28.349523125,
		"oz-lb": 1/16,
		"oz-long tons": 1/35840,
		"oz-short tons": 1/32000,
		"oz-t": 0.000028349523125,
		"short tons-lb": 2000,
		"short tons-long tons": 1/1.12,
		"short tons-g": 907184.74,
		"short tons-oz": 32000,
		"short tons-t": 0.90718474,
		"t-g": 1000,
		"t-lb": 1/0.00045359237,
		"t-long tons": 1/1.0160469088,
		"t-oz": 1/0.000028349523125,
		"t-short tons": 1/0.90718474,
	}

	if(input_prefix === output_prefix && input_unit === output_unit) { // if input and output prefixes and units are equal
		output=input
	}
	else if(input_unit === output_unit) { // if the units are equal but not prefixes
		output=(input*prefixNumber(input_prefix))/prefixNumber(output_prefix)
	}
	else { // otherwise
		output=(input*factors[key]*prefixNumber(input_prefix))/prefixNumber(output_prefix)
	}

	return output
}

// returns singular
function singular(output_unit) {
	const units={
		"long tons": "long ton",
		"short tons": "short ton",
	}
	return units[output_unit]
}

// select quantity
document.getElementsByName("quantity").forEach((radio) => {
	radio.addEventListener("change", () => {
		input_prefix=document.getElementById("input-prefix"), output_prefix=document.getElementById("output-prefix")
		input_unit=document.getElementById("input-unit"), output_unit=document.getElementById("output-unit")
		quantity=radio.id
		console.log("Quantity: " + quantity)

		// binary prefixes
		const binary=`
			<option value="T">tera (2⁴⁰)</option>
			<option value="G">giga (2³⁰)</option>
			<option value="M">mega (2²⁰)</option>
			<option value="k">kilo (2¹⁰)</option>
			<option value="none">none (2⁰)</option>
		`
		// decimal prefixes
		const decimal=`
			<option value="G">giga (10⁹)</option>
			<option value="M">mega (10⁶)</option>
			<option value="k">kilo (10³)</option>
			<option value="h">hecto (10²)</option>
			<option value="da">deca (10¹)</option>
			<option value="none">none (10⁰)</option>
			<option value="d">deci (10⁻¹)</option>
			<option value="c">centi (10⁻²)</option>
			<option value="m">milli (10⁻³)</option>
			<option value="μ">micro (10⁻⁶)</option>
			<option value="n">nano (10⁻⁹)</option>
		`
		// information units
		const info=`
			<option value="select">select</option>
			<option value="b">bits (b)</option>
			<option value="B">bytes (B)</option>
			<option value="nib">nibbles (nib)</option>
		`
		// length units
		const length=`
			<option value="select">select</option>
			<option value="ft">feet (ft)</option>
			<option value="in">inches (in)</option>
			<option value="m">metres (m)</option>
			<option value="mi">miles (mi)</option>
		`
		// mass units
		const mass=`
			<option value="select">select</option>
			<option value="long tons">long tons</option>
			<option value="g">grams (g)</option>
			<option value="lb">pounds (lb)</option>
			<option value="oz">ounces (oz)</option>
			<option value="short tons">short tons</option>
			<option value="t">tonnes (t)</option>
		`
		// temperature units
		const temp=`
			<option value="select">select</option>
			<option value="celsius">Celsius (C)</option>
			<option value="fahrenheit">Fahrenheit (F)</option>
			<option value="kelvin">Kelvin (K)</option>
		`
		if(quantity === "info") {
			input_prefix.innerHTML=binary
			output_prefix.innerHTML=binary
			input_prefix.value="none"
			output_prefix.value="none"
			input_unit.innerHTML=info
			output_unit.innerHTML=info
		}
		else if(quantity === "length") {
			input_prefix.innerHTML=decimal
			output_prefix.innerHTML=decimal
			input_prefix.value="none"
			output_prefix.value="none"
			input_unit.innerHTML=length
			output_unit.innerHTML=length
		}
		else if(quantity === "mass") {
			input_prefix.innerHTML=decimal
			output_prefix.innerHTML=decimal
			input_prefix.value="none"
			output_prefix.value="none"
			input_unit.innerHTML=mass
			output_unit.innerHTML=mass
		}
		else if(quantity === "temp") {
			input_prefix.innerHTML=decimal
			output_prefix.innerHTML=decimal
			input_prefix.value="none"
			output_prefix.value="none"
			input_unit.innerHTML=temp
			output_unit.innerHTML=temp
		}
		else {
			input_prefix.innerHTML=`<option value="none">none (10⁰)</option>`
			output_prefix.innerHTML=`<option value="none">none (10⁰)</option>`
			input_unit.innerHTML=`<option value="select">select</option>`
			output_unit.innerHTML=`<option value="select">select</option>`
		}
	})
})

// select input unit
document.getElementById("input-unit").addEventListener("change", function() {
	const input=document.getElementById("input").value
	document.getElementById("input").value=input
})

// convert button
document.getElementById("convert").addEventListener("click", function() {
	let input=document.getElementById("input").value
	const input_prefix=document.getElementById("input-prefix").value, output_prefix=document.getElementById("output-prefix").value
	const input_unit=document.getElementById("input-unit").value, output_unit=document.getElementById("output-unit").value
	let output=0, output2=0 // outputs

	// if not input is given
	if(input==null) {
		input=0
	}
	
	// for temperature conversion
	if(quantity === "temp") {
		if(input_unit=="celsius" && output_unit=="fahrenheit") {
			output=(input*9/5)+32
		}
		// Celsius to Kelvin
		else if(input_unit=="celsius" && output_unit=="kelvin") {
			output=(input*100+27315)/100 // to avoid floating point issues
		}
		// Fahrenheit to Celsius
		else if(input_unit=="fahrenheit" && output_unit=="celsius") {
			output=(input-32)*5/9
		}
		// Fahrenheit to Kelvin
		else if(input_unit=="fahrenheit" && output_unit=="kelvin") {
			output=((input-32)*500/9+27315)/100
		}
		// Kelvin to Celsius
		else if(input_unit=="kelvin" && output_unit=="celsius") {
			output=(input*100-27315)/100 // to avoid floating point issues
		}
		// Kelvin to Fahrenheit
		else if(input_unit=="kelvin" && output_unit=="fahrenheit") {
			output=((input*100-27315)*9/500)+32
		}
	}
	else {
		output=unitConvert(input, input_prefix, input_unit, output_prefix, output_unit)
	}

	if(output_unit === "b") {
		output=Math.floor(output)
	}

	if(output_prefix === "none") { // if there is no output prefix
		document.getElementById("output").innerHTML=`Output: ${output} ${output_unit}`
	}
	else { // otherwise
		if(output === 1) {
			singular(output_unit)
		}
		document.getElementById("output").innerHTML=`Output: ${output} ${output_prefix}${output_unit}`
	}

	console.log("Input: " + input + " " + input_prefix + input_unit)
	console.log("Output: " + output + " " + output_unit)
})

// reverse units
document.getElementById("reverse").addEventListener("click", function() {
	const input_prefix=document.getElementById("input-prefix").value, output_prefix=document.getElementById("output-prefix").value
	const input_unit=document.getElementById("input-unit").value, output_unit=document.getElementById("output-unit").value

	document.getElementById("input-prefix").value=output_prefix
	document.getElementById("output-prefix").value=input_prefix

	document.getElementById("input-unit").value=output_unit
	document.getElementById("output-unit").value=input_unit

	console.log("Units are reversed")
})

// clear
document.getElementById("clear").addEventListener("click", () => {	
	document.getElementById("input-prefix").value="none"
	document.getElementById("output-prefix").value="none"

	document.getElementById("input-unit").value="select"
	document.getElementById("output-unit").value="select"
})

// dark and light theme
document.getElementsByName("theme").forEach((radio) => {
	radio.addEventListener("change", () => {
		theme = radio.value
		console.log("Theme: " + theme)

		switch(theme) {
			case "dark": // if theme is dark, select dark theme
				document.querySelector("html").style.cssText = `
					color-scheme: dark;
					--background: linear-gradient(to bottom, black, #0B0B3B, #1C1C3A);
					--button: darkgreen;
					--foreground: #ededed;
				`
				break
			case "light": // if theme is light, select light theme
				document.querySelector("html").style.cssText = `
					color-scheme: light;
					--background: linear-gradient(to bottom, #87CEEB, #ADD8E6, white);
					--button: lightgreen;
					--foreground: black;"
				`
				break
			default: // otherwise, select system default
				document.querySelector("html").style.cssText = ""
		}
	})
})