var white = [];
var black = [];

var Piece = function (color) {
	this.color = color;
	this.element = document.createElement('div');

	this.draw = function(line, column) {
		this.line = line;
		this.column = column;

		boardCell = document.querySelector('div.line-'+this.line+'.col-'+this.column);
		boardCell.appendChild(this.element);
	}
}

var Pawn = function (line, column, color) {
	Piece.apply(this, arguments);
	this.element.className = 'pawn ' + this.color;
}

var ChessGame = function(element) {

}

var ChessBoard = function() {
	this.drawMarkers = function() {

	};

	this.drawMarkers = function() {

	};
}

window.onload = function(){

	var board = new ChessBoard(document.querySelector('chess-container'));

	for (i=1; i<=8; i++) {
		pawn = new Pawn('white');
		pawn.draw(2, i);
		black.push(pawn);

		pawn = new Pawn('black');
		pawn.draw(7, i);
		black.push(pawn);
	}

};