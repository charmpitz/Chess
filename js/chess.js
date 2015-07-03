// Board
var ChessBoard = function(query) {
	this.container = document.querySelector(query);
	this.chessBoard = null;
	this.topMarkersContainer = null;
	this.leftMarkersContainer = null;
	this.squares = [];

	this.init = function() {
		this.drawLeftMarkers();
		this.drawTopMarkers();
		this.drawBoard();
	}

	this.drawTopMarkers = function() {
		var marker, i;

		this.topMarkersContainer = document.createElement('div');
		this.topMarkersContainer.classList.add('top-markers');

		for (i=65; i<=72; i++) 
		{
			marker = document.createElement('div');
			marker.innerHTML = String.fromCharCode(i);
			this.topMarkersContainer.appendChild(marker);
		}

		this.container.appendChild(this.topMarkersContainer);
	};

	this.drawLeftMarkers = function() {
		var marker, i;

		this.leftMarkersContainer = document.createElement('div');
		this.leftMarkersContainer.classList.add('left-markers');

		for (i=8; i>=1; i--) 
		{
			marker = document.createElement('div');
			marker.innerHTML = i;
			this.leftMarkersContainer.appendChild(marker);
		}

		this.container.appendChild(this.leftMarkersContainer);
	};

	this.drawBoard = function() {
		var square, i, j;

		this.chessBoard = document.createElement('div');
		this.chessBoard.className = 'chess-board';

		for (i=8; i>=1; i--) 
		{
			for (j=1; j<=8; j++) 
			{
				square = document.createElement('div');
				square.className = 'line-' + i + ' ' + 'col-' + j;
				this.chessBoard.appendChild(square);
				this.squares.push(square);
			}
		}

		this.container.appendChild(this.chessBoard);
	};
	this.newPiece = function (type, color) {
		var element;

		element = document.createElement('div');
		element.className = type + ' ' + color;

		return element;
	}

	this.drawDefaultPieces = function(pieces) {
		var pawn;

		// pawns
		for (i=1; i<=8; i++) 
		{
			this.drawPiece(2, i, this.newPiece('pawn', 'white'));
			this.drawPiece(7, i, this.newPiece('pawn', 'black'));
		}

		// rooks
		this.drawPiece(1, 1, this.newPiece('rook', 'white'));
		this.drawPiece(8, 8, this.newPiece('rook', 'black'));
		this.drawPiece(1, 8, this.newPiece('rook', 'white'));
		this.drawPiece(8, 1, this.newPiece('rook', 'black'));

		// knights
		this.drawPiece(1, 2, this.newPiece('knight', 'white'));
		this.drawPiece(8, 7, this.newPiece('knight', 'black'));
		this.drawPiece(1, 7, this.newPiece('knight', 'white'));
		this.drawPiece(8, 2, this.newPiece('knight', 'black'));

		// bishops
		this.drawPiece(1, 3, this.newPiece('bishop', 'white'));
		this.drawPiece(8, 6, this.newPiece('bishop', 'black'));
		this.drawPiece(1, 6, this.newPiece('bishop', 'white'));
		this.drawPiece(8, 3, this.newPiece('bishop', 'black'));

		// queen
		this.drawPiece(1, 4, this.newPiece('queen', 'white'));
		this.drawPiece(8, 4, this.newPiece('queen', 'black'));

		// king
		this.drawPiece(1, 5, this.newPiece('king', 'white'));
		this.drawPiece(8, 5, this.newPiece('king', 'black'));

	};

	this.drawPiece = function(line, column, element) {
		boardSquare = this.getSquare(line, column);
		boardSquare.appendChild(element);
	}

	this.getSquare = function(line, column) {
		return this.container.querySelector('div.line-' + line + '.col-' + column);
	}

	this.addEvents = function() {
		context = this.chessBoard;

		for (i=0; i<this.squares.length; i++) 
		{
			this.squares[i].onclick = function () {
				var aux = context.querySelector('.selected');

				if (aux != null)
				{
					aux.classList.remove('selected');
				}
				
				this.classList.toggle('selected');
			}
		}

	}
}

window.onload = function(){

	var board = new ChessBoard('.chess-container');

	board.init();
	board.drawDefaultPieces();
	board.addEvents();


};