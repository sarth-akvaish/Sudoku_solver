document.addEventListener("DOMContentLoaded", () => {
    const sudokuGrid = document.getElementById("sudoku-grid");
    const solveBtn = document.getElementById("solveBtn");

    // Generate the 9x9 grid of input cells
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement("input");
            cell.className = "cell";
            cell.type = "text";
            cell.maxLength = 1;
            sudokuGrid.appendChild(cell);
        }
    }

    solveBtn.addEventListener("click", () => {
        const puzzle = [];
        let index = 0;

        for (let i = 0; i < 9; i++) {
            const row = [];
            for (let j = 0; j < 9; j++) {
                const cell = document.getElementsByClassName("cell")[index];
                row.push(cell.value !== "" ? parseInt(cell.value) : 0);
                index++;
            }
            puzzle.push(row);
        }

        const solvedPuzzle = solveSudoku(puzzle);

        if (solvedPuzzle) {
            index = 0;
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    const cell = document.getElementsByClassName("cell")[index];
                    cell.value = solvedPuzzle[i][j];
                    index++;
                }
            }
        } else {
            alert("No solution exists for the given puzzle.");
        }
    });

    function solveSudoku(puzzle) {
        const emptyCell = findEmptyCell(puzzle);
        if (!emptyCell) {
            return puzzle;  // All cells filled, puzzle solved
        }

        const row = emptyCell.row;
        const col = emptyCell.col;

        for (let num = 1; num <= 9; num++) {
            if (isValidPlacement(puzzle, row, col, num)) {
                puzzle[row][col] = num;
                if (solveSudoku(puzzle)) {
                    return puzzle;  // Puzzle solved successfully
                }
                puzzle[row][col] = 0;  // Backtrack
            }
        }

        return null;  // No valid placement found
    }

    function findEmptyCell(puzzle) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (puzzle[i][j] === 0) {
                    return { row: i, col: j };
                }
            }
        }
        return null;  // No empty cell found
    }

    function isValidPlacement(puzzle, row, col, num) {
        // Check if 'num' is not present in the current row, column, and 3x3 grid
        return (
            !usedInRow(puzzle, row, num) &&
            !usedInColumn(puzzle, col, num) &&
            !usedInBox(puzzle, row - row % 3, col - col % 3, num)
        );
    }

    function usedInRow(puzzle, row, num) {
        return puzzle[row].includes(num);
    }

    function usedInColumn(puzzle, col, num) {
        for (let i = 0; i < 9; i++) {
            if (puzzle[i][col] === num) {
                return true;
            }
        }
        return false;
    }

    function usedInBox(puzzle, startRow, startCol, num) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (puzzle[i + startRow][j + startCol] === num) {
                    return true;
                }
            }
        }
        return false;
    }
});
