# node-enocean-dimmer
a dimmer for eltako devices (FUD14, FUD14-800 W, FUD61NP, FUD61NPN, FUD71,
FSG14/1-10V, FSG71/1-10V, FSUD-230V) the dimmer implements an EEP similar to A5-38-08 (as per the Eltako documentation).    
It is intended for use with [node-enocean](https://github.com/Holger-Will/node-enocean)
## installation
`npm install node-enocean-dimmer`
## usage with promises
```
var enocean      = require("node-enocean")
var Dimmer      = require("node-enocean-dimmer");
enocean.listen( "/dev/ttyUSB0" )

enocean.on( "ready" , function( ) {
	var dimmer = new Dimmer( enocean , process.argv[ 2 ]  )
	dimmer.speed = "80"
	switch( process.argv[ 3 ] ) {
	case "teach" :
		dimmer.teach( ).then(enocean.close)
	break
	case "off":
		dimmer.off( ).then(enocean.close)
	break
	default:
		dimmer.setValue( process.argv[ 3 ]).then(enocean.close)
	break;
	}
})
```

## usage with async await

```
var enocean      = require("node-enocean")
var Dimmer      = require("node-enocean-dimmer");
enocean.listen( "/dev/ttyUSB0" )

enocean.on( "ready" , async function( ) {
	var dimmer = new Dimmer( enocean , process.argv[ 2 ]  )
	dimmer.speed = "80"
	switch( process.argv[ 3 ] ) {
	case "teach" :
		await dimmer.teach( )
	break
	case "off":
		await dimmer.off( )
	break
	default:
		await dimmer.setValue( process.argv[ 3 ])
	break;
	}
	enocean.close()
})
```
the dimmer implements the following interfaces:

`.setValue(x)` sets the brightness level x must be in the range 0 - 100    
`.teach()` send a learn telegram to teach in the sensor       
`.off()` send a switch off event to the connected devices   
`.speed` sets the dimming speed. Value must be two characters with a value between 01 and ff (hex) where 01 is fast and ff is slow.
