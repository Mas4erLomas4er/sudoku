function solveSudoku ( matrix ) {
	const getFreeInts = row => {
		let integersList = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
		return integersList.filter( elem => row.indexOf( elem ) === -1 );
	};

	const getColumn = ( matrix, index ) => matrix.map( elem => elem[ index ] );
	const getSquare = ( matrix, index ) => {
		let columnStartIndex = Math.floor( index / 3 );
		let cutMatrix = matrix.slice( columnStartIndex * 3, columnStartIndex * 3 + 3 ).map( elem => elem.slice( ( index % 3 ) * 3, ( index % 3 ) * 3 + 3 ) );
		return [].concat( ...cutMatrix );
	};

	const getOverallElements = ( row, column, square ) => {
		let uniqueElems = Array.from( new Set( [ ...row, ...column, ...square ] ) );
		return uniqueElems.filter( elem => row.indexOf( elem ) >= 0 && column.indexOf( elem ) >= 0 && square.indexOf( elem ) >= 0 )
	};

	let cellObject = {};

	let completeMatrix = ( matrixC ) => {
		console.log( '-------------------' );
		return matrixC.map( ( elem, rowIndex ) => {
			let freeRowInts = getFreeInts( elem );
			return elem.map( ( item, elemIndex ) => {
				if ( item === 0 ) {
					let freeColumnInts = getFreeInts( getColumn( matrixC, elemIndex ) );
					let squareIndex = ( Math.floor( rowIndex / 3 ) * 3 ) + Math.floor( elemIndex / 3 );
					let freeSquareInts = getFreeInts( getSquare( matrixC, squareIndex ) );
					let overallElements = getOverallElements( freeRowInts, freeColumnInts, freeSquareInts );
					// console.log(rowIndex, elemIndex, "|", freeRowInts, freeColumnInts, freeSquareInts, '|', overallElements);
					return overallElements.length === 1 ? overallElements[ 0 ] : 0;

				} else return item;
			} );
		} );
	};
	let abc = completeMatrix( completeMatrix( completeMatrix( matrix ) ) ).map( ( elem, rowIndex ) => {
		return elem.map( ( item, elemIndex ) => {
			let freeRowInts = getFreeInts( elem );
			if ( item === 0 ) {
				let freeColumnInts = getFreeInts( getColumn( matrix, elemIndex ) );
				let squareIndex = ( Math.floor( rowIndex / 3 ) * 3 ) + Math.floor( elemIndex / 3 );
				let freeSquareInts = getFreeInts( getSquare( matrix, squareIndex ) );
				let overallElements = getOverallElements( freeRowInts, freeColumnInts, freeSquareInts );
				// console.log(rowIndex, elemIndex, "|", freeRowInts, freeColumnInts, freeSquareInts, '|', overallElements);
				return overallElements.length === 1 ? overallElements[ 0 ] : overallElements;

			} else return elem;
		} );
	} );
	return abc;
}

module.exports = solveSudoku;


console.log( solveSudoku( [
	[ 0, 5, 0, 0, 7, 0, 0, 0, 1 ],
	[ 8, 7, 6, 0, 2, 1, 9, 0, 3 ],
	[ 0, 0, 0, 0, 3, 5, 0, 0, 0 ],
	[ 0, 0, 0, 0, 4, 3, 6, 1, 0 ],
	[ 0, 4, 0, 0, 0, 9, 0, 0, 2 ],
	[ 0, 1, 2, 0, 5, 0, 0, 0, 4 ],
	[ 0, 8, 9, 0, 6, 4, 0, 0, 0 ],
	[ 0, 0, 0, 0, 0, 7, 0, 0, 0 ],
	[ 1, 6, 7, 0, 0, 2, 5, 4, 0 ]
] ) );
/* ->
 [5, 3, 4, 6, 7, 8, 9, 1, 2],
 [6, 7, 2, 1, 9, 5, 3, 4, 8],
 [1, 9, 8, 3, 4, 2, 5, 6, 7],
 [8, 5, 9, 7, 6, 1, 4, 2, 3],
 [4, 2, 6, 8, 5, 3, 7, 9, 1],
 [7, 1, 3, 9, 2, 4, 8, 5, 6],
 [9, 6, 1, 5, 3, 7, 2, 8, 4],
 [2, 8, 7, 4, 1, 9, 6, 3, 5],
 [3, 4, 5, 2, 8, 6, 1, 7, 9]
*/