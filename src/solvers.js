/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = new Board({n: n});

  for (var i = 0; i < n; i ++) {
    for (var j = 0; j < n; j ++) {
      solution.get(i)[j] = 1;
      if (solution.hasAnyRooksConflicts()) {
        solution.get(i)[j] = 0;
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var boards = [];
  var options = _.range(0, n);

  var runTree = function(numleft, path, optionsleft) {
    if (numleft === 0) {
      boards.push(path);
      return;
    }
    for (var i = 0; i < optionsleft.length; i++ ) {
      var num = optionsleft[i];
      var substitute = optionsleft.slice();
      substitute.splice(substitute.indexOf(num), 1);
      runTree(numleft - 1, path.concat(num), substitute);
    }
  };

  runTree(n, [], options);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return boards.length;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 2) {
    return 0;
  } else if (n === 3) {
    return 0;
  }

  var solutionCount = 0;
  var boards = [];
  var actualBoards = [];
  var options = _.range(0, n);

  var runTree = function(numleft, path, optionsleft) {
    if (numleft === 0) {
      boards.push(path);
      return;
    }
    for (var i = 0; i < optionsleft.length; i++ ) {
      var num = optionsleft[i];
      var substitute = optionsleft.slice();
      substitute.splice(substitute.indexOf(num), 1);
      runTree(numleft - 1, path.concat(num), substitute);
    }
  };

  runTree(n, [], options);

  for (var j = 0; j < boards.length; j++) {
    actualBoards.push(new Board({n: n}));
  }

  for (var k = 0; k < boards.length; k++) {
    for (var l = 0; l < actualBoards[k].rows().length; l++ ) {
      for (var m = 0; m < boards[k].length; m++ ) {
        if (boards[k][l] === m) {
          actualBoards[k].get(l)[m] = 1;
        }
      }
    }
  }

  for (var p = 0; p < actualBoards.length; p++) {
    if (actualBoards[p].hasAnyQueensConflicts() === false) {
      solutionCount++;
    }
  }  

   //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
