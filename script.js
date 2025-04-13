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

	if(quantity==binary) {
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
		"mi-m": 1609.344,
		"in-m": 0.0254,
		"m-ft": 1/0.3048,
		"m-mi": 1/1609.344,
		"m-in": 1/0.0254,
	}

	// if input and output prefixes and units are equal
	if(input_prefix==output_prefix && input_unit==output_unit) {
		output=input
	}
	else {
		if(input_unit==output_unit) {
			output=(input*prefixNumber(input_prefix))/prefixNumber(output_prefix)
		}
		else {
			output=(input*factors[key]*prefixNumber(input_prefix))/prefixNumber(output_prefix)
		}
	}

	return output
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
		// temperature units
		const temp=`
			<option value="select">select</option>
			<option value="celsius">Celsius (C)</option>
			<option value="fahrenheit">Fahrenheit (F)</option>
			<option value="kelvin">Kelvin (K)</option>
		`
		if(quantity=="info") {
			input_prefix.innerHTML=binary
			output_prefix.innerHTML=binary
			input_prefix.value="none"
			output_prefix.value="none"
			input_unit.innerHTML=info
			output_unit.innerHTML=info
		}
		else if(quantity=="length") {
			input_prefix.innerHTML=decimal
			output_prefix.innerHTML=decimal
			input_prefix.value="none"
			output_prefix.value="none"
			input_unit.innerHTML=length
			output_unit.innerHTML=length
		}
		else if(quantity=="temp") {
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
	let input=Number(document.getElementById("input").value)
	const input_prefix=document.getElementById("input-prefix").value, output_prefix=document.getElementById("output-prefix").value
	const input_unit=document.getElementById("input-unit").value, output_unit=document.getElementById("output-unit").value
	let output=0, output2=0 // outputs

	// if not input is given
	if(input==null) {
		input=0
	}

	output=unitConvert(input, input_prefix, input_unit, output_prefix, output_unit)

	// temperature units
	// Celsius to Fahrenheit
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

	if(output_unit=="b") {
		output=Math.floor(output)
	}

	document.getElementById("output").value=output

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