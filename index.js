var async = require('asyncawait/async');
var await = require('asyncawait/await');
module.exports        = function ( app , id ) {
	this.head     = "55000a0701eb";
	this.address  = ( parseInt( app.base , 16 ) + parseInt( id ) ).toString(16)
	this.speed    = "01"
	this.setValue = async (function( val ) {
		if(val>100) val=100
		if(val<0) val=0
		var value = app.pad(parseInt(val).toString(16),2)
		if(val<10){
			await(this.off)
			return
		}
		var b1    = "a502" + value + this.speed + "09" + this.address + "3001ffffffffff00"
		b1       += app.pad( app.crc( new Buffer( b1 , "hex" ) ).toString( 16 ) , 2 )
		await (app.sendAsync( this.head + b1 ))
	})
	this.teach    = async (function () {
		var b1    = "a502000000" + this.address + "3001ffffffffff00"
		b1       += app.pad( app.crc( new Buffer( b1 , "hex" ) ).toString( 16 ) , 2 )
		await (app.sendAsync( this.head + b1 ))
	})
	this.off=async (function(){
		var b1    = "a502000008" + this.address + "3001ffffffffff00"
		b1       += app.pad( app.crc( new Buffer(b1,"hex") ).toString( 16 ) , 2 )
		await(app.sendAsync( this.head + b1 ))
	})
}
