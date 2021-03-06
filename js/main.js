var myArrOfCards = [];
var images = {
    1: '<i class="fas fa-car"></i>',
    2: '<i class="fas fa-apple-alt"></i>',
    3: '<i class="fas fa-baby"></i>',
    4: '<i class="fas fa-baby-carriage"></i>',
    5: '<i class="fas fa-bath"></i>',
    6: '<i class="fas fa-bed"></i>',
    7: '<i class="fas fa-basketball-ball"></i>',
    8: '<i class="fas fa-baseball-ball"></i>',
    9: '<i class="fas fa-birthday-cake"></i>',
    10: '<i class="fas fa-bicycle"></i>'
}

$('#gridSelect').change(function () {
    let tx, ty, cardsAvailable;
    let selectedGrid = $(this).val();
    tx = selectedGrid.substr(0, 1)
    ty = selectedGrid.substr(selectedGrid.indexOf('x') + 1)
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
}

function shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function getCard() {
    let item = myArrOfCards[0];
    return item;
}

function getTableCols(x, currentRow) {
    let cols;
    for (let i = 1; i <= x; i++) {
        //cols += `<td data-row="${i}"><div data-number="${getCard()}"><span>${getCard()}</span></div></td>`
        cols += `<td data-row="${i}"><div data-number="${getCard()}"><span>
        ${images[getCard()]}</span></div></td>`
        myArrOfCards.shift();
    }
    return cols;
}
let turns = [];
$('#grid table').on('click', 'tr td div', function () {
    const dataNumber = $(this).data('number');
    if (turns.length > 1) {
        $('#result').text('Dont take more than your turn! ')
        turns = []
        $('#grid div').each(function () {
            $(this).children('span').hide();
        })
    } else {
        $('#result').text('')
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
    $('#result').html('');
})