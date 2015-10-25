module.exports        = function ( app , id ) {
	this.head     = "55000a0701eb";
	this.address  = ( parseInt( app.base , 16 ) + parseInt( id ) ).toString(16)
	this.speed    = "01"
	this.setValue = function( val ) {
		var value = app.pad(parseInt(val).toString(16),2)
		var b1    = "0702" + value + this.speed + "09" + this.address + "3001ffffffffff00"
		b1       += app.pad( app.crc( new Buffer( b1 , "hex" ) ).toString( 16 ) , 2 )
		app.send( this.head + b1 )
	}
	this.teach    = function () {
		var b1    = "0702000000" + this.address + "3001ffffffffff00"
		b1       += app.pad( app.crc( new Buffer( b1 , "hex" ) ).toString( 16 ) , 2 )
		app.send( this.head + b1 )
	}
	this.off=function(){
		var b1    = "0702000008" + this.address + "3001ffffffffff00"
		b1       += app.pad( app.crc( new Buffer(b1,"hex") ).toString( 16 ) , 2 )
		app.send( this.head + b1 )
	}
}
