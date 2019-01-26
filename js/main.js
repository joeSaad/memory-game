var myArrOfCards = []

$('#gridSelect').change(function () {
    let tx, ty, cardsAvailable;
    let selectedGrid = $(this).val();
    console.log($(this).val())
    tx = selectedGrid.substr(0, 1)
    ty = selectedGrid.substr(selectedGrid.indexOf('x') + 1)
    console.log(tx)
    console.log(ty)
    $('#memory-game').show();
    $('#lobby').hide();
    myArrOfCards = getArrayOfCards(tx, ty);
    $('#grid table').html(getTableRows(ty, tx))
})

function getTableRows(y, x) {
    let rows;
    for (let i = 1; i <= y; i++) {
        rows += `<tr>${getTableCols(x, i)}</tr>`
    }
    return rows;
}

function getArrayOfCards(tx, ty) {
    let ArrLength = tx * ty;
    let arrOfCards = [];
    for (let i = 1; i <= ArrLength / 2; i++) {
        arrOfCards.push(i)
        arrOfCards.push(i)
    }
    return shuffleArray(arrOfCards);
    //return arrOfCards
}

function shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function getCard() {
    console.log('get Currents')
    console.log(myArrOfCards)
    let item = myArrOfCards[0];
    console.log('item:', item)

    //
    console.log(myArrOfCards)
    return item;
}

function getTableCols(x, currentRow) {
    let cols;
    console.log(currentRow)
    for (let i = 1; i <= x; i++) {
        // (${currentRow},${i})- 
        cols += `<td data-row="${i}"><div data-number="${getCard()}"><span>${getCard()}</span></div></td>`
        myArrOfCards.shift();
    }
    return cols;
}

let turns = [];
$('#grid table').on('click', 'tr td div', function () {
    console.log('test 123')
    const dataNumber = $(this).data('number');
    console.log(dataNumber);
    console.log(turns.length)
    if (turns.length > 1) {
        $('#result').text('Dont take more than your turn! ')
        turns = []
        $('#grid div').each(function () {
            $(this).children('span').hide();
        })
    } else {
        $('#result').text('')
        console.log(turns.length)
        $(this).children('span').show()
        if (turns.includes(dataNumber)) {
            $('#result').text('Congrats you got that one!!')
            turns = []
            $('#grid div').each(function () {
                if ($(this).data('number') == dataNumber) {
                    $(this).remove();
                }
            })
            let empty = true;
            $('table tr td').each(function () {
                if (!$(this).is(':empty')) {
                    empty = false
                }
            })
            if (empty) {
                $('#result').html(`<div class="pyro">
                <div class="before"></div>
                <div class="after"></div>
              </div>You rocked this game!!!`)
            }

        } else {
            turns.push(dataNumber)
        }
    }

})


$('#back').click(function () {
    $('#memory-game').hide();
    $('#lobby').show()
})