var ChessBoard = function(query) {
	this.container = document.querySelector(query);
	this.chessBoard = null;
	this.topMarkersContainer = null;
	this.leftMarkersContainer = null;

	this.squares = [];
	this.pieces = [];

	this.currentSelection = null;

	this.init = function() {
		this.drawLeftMarkers();
		this.drawTopMarkers();
		this.drawBoard();
		this.drawDefaultPieces();
		this.addEvents();
	}

	this.Square = function(line, column) {
		this.node = document.createElement('div');
		this.node.classList.add('square');
		this.node.classList.add('line-' + line);
		this.node.classList.add('col-' + column);
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
		this.chessBoard.classList.add('chess-board');

		for (i=8; i>=1; i--)
		{
			this.squares[i] = [];

			for (j=1; j<=8; j++) 
			{
				this.squares[i][j] = new this.Square(i, j);
				this.chessBoard.appendChild(this.squares[i][j].node);
			}
		}

		this.container.appendChild(this.chessBoard);
	};

	this.newPiece = function (type, color) {
		var element;

		element = document.createElement('div');
		element.classList.add('piece');
		element.classList.add(type);
		element.classList.add(color);

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

	this.drawPiece = function(line, column, pieceNode) {
		var squareNode;

		squareNode = this.getSquareNode(line, column);
		squareNode.appendChild(pieceNode);
		
		this.pieces.push(pieceNode);
	}

	this.removePiece = function(line, column, pieceNode) {
		squareNode = this.getSquareNode(line, column);
		squareNode.removeChild(pieceNode);
	}

	this.moveSelectedPiece = function(square) {
		this.currentSelection.parentElement.removeChild(this.currentSelection);
		square.appendChild(this.currentSelection);
		this.currentSelection.classList.toggle('selected');
		this.currentSelection = null;
	}

	this.getSquareNode = function(line, column) {
		return this.squares[line][column].node;
	}

	this.getAvailableMoves = function(type, color, line, column) {
		var moves = [];

		switch(type) {
			case 'pawn':
				if (color == 'white')
				{
					if ((line+1 < 8) && (!this.squares[line+1][column].node.hasChildNodes()))
					{
						moves.push([line+1, column]);
						if (line+1 == 8)
						{
							// 
							// CHANGE PIECE HERE
							// 
						}
					}

					if ((line == 2) && (!this.squares[line+2][column].node.hasChildNodes()))
					{
						moves.push([line+2, column]);
					}
				}
				break;

			default:

		}

		return moves; 
	}

	this.addEvents = function() {
		context = this;

		// Select Pieces
		for (i=0; i<this.pieces.length; i++) 
		{
			this.pieces[i].addEventListener('click', function(event) {
				event.preventDefault();
				event.stopPropagation();

				var line, column;

				// Highlight Selected Piece
				if (this != context.currentSelection)
				{
					if (context.currentSelection != null)
						context.currentSelection.classList.toggle('selected');

					context.currentSelection = this;
					context.currentSelection.classList.toggle('selected');
				}
				else
				{
					context.currentSelection.classList.toggle('selected');
					context.currentSelection = null;
				}

				// Highlight Available moves
				var availableMoves = context.getAvailableMoves('pawn', 'white', 2, 2);
				console.log(availableMoves);
				// Show all Available moves
				for (i=0; i<availableMoves.length; i++)
				{
					line = availableMoves[i][0];
					column = availableMoves[i][1];
					context.squares[line][column].node.classList.toggle('available');
				}

			});
		}

		// Move pieces
		for (i=1; i<this.squares.length; i++) 
		{
			for (j=1; j<this.squares[i].length; j++)
			{
				this.squares[i][j].node.addEventListener('click', function(event) {
					event.preventDefault();
					event.stopPropagation();

					if (context.currentSelection != null)
					{
						context.moveSelectedPiece(this);
					}
				});	
			} 
		}
	}

	// Initialize board
	this.init();
}

window.onload = function(){

	var board = new ChessBoard('.chess-container');

};