var enocean      = require( "node-enocean" )( ) // require node-enocean
var Dimmer       = require( "../" )
enocean.listen( "/dev/ttyUSB0" ) // open the serialport

enocean.on( "ready" , async function( ) {
	var dimmer = new Dimmer( enocean , process.argv[ 2 ]  )
	dimmer.speed = "01" // dimm very fast
	switch( process.argv[ 3 ] ) {
	case "teach" :
		await dimmer.teach( ) //
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
