var character = [{
    name: 'Green Knight',
    num: 0,
    img: "url(assets/pics/GreenStart.png)",
    divId: 'green-knight',
    btn: 'success'
}, {
    name: 'Red Knight',
    num: 1,
    img: "url(assets/pics/redStart.png)",
    divId: 'red-knight',
    btn: 'danger'
}, {
    name: 'Blue Knight',
    num: 2,
    img: "url(assets/pics/BlueStart.png)",
    divId: 'blue-knight',
    btn: 'primary'
}]

function pageChange(pageNum) {
    if (pageNum = 1) {
        var page = document.getElementById("start-page");
        if (page.style.display === "none") {
            page.style.display = "block";
        } else {
            page.style.display = "none";
        }
    } else if (pageNum = 2) {
        var page = document.getElementById("main-game");
        if (page.style.display === "none") {
            page.style.display = "block";
        } else {
            page.style.display = "none";
        }
    } else if (pageNum = 3) {
        var page = document.getElementById("end-page");
        if (page.style.display === "none") {
            page.style.display = "block";
        } else {
            page.style.display = "none";
        }
    }
}

function startPage() {
    document.getElementById('start-page').style.display = "block"
    var template = ``
    for (var i = 0; i < character.length; i++) {
        template += `<div class="col-4 start-img" id="${character[i].divId}" style="background-image: ${character[i].img}">
            <button class="btn btn-outline-${character[i].btn} btn-start" onclick="startGame(${[i]}); pageChange(1);">Start</button>
            </div>`
    }
    document.getElementById('start-page').innerHTML = template
}

var choice = 0

startPage()

var enemy = [{
    name: 'Theif',
    health: 100,
    hits: 0,
    damage: {
        quick: 10,
        heavy: 15,
        arrow: 25,
        poison: 10
    },
    img: 'assets/pics/thief.png',
    backImg: 'url("assets/pics/forrest-background.jpg")',
    poisoned: -1,
    shocked: 0,
    frozen: 0,
    healthBonus: 0,
    attack: {
        attackName1: 'Quick Attack',
        attackName2: 'Heavy Attack',
        attackName3: 'Arrow',
        quick: 5,
        heavy: 10,
        range: 25,
        rangebase: 25,
        hitChance: [0, 0, 1, 1, 1, 2, 3, 3]
    },
}, {
    name: 'Barbarian',
    health: 100,
    hits: 0,
    damage: {
        quick: 5,
        heavy: 10,
        arrow: 10,
        poison: 20
    },
    img: '',
    poisoned: -1,
    shocked: 0,
    frozen: 0,
    healthBonus: 0,
    attack: {
        attackName1: 'Quick Attack',
        attackName2: 'Heavy Attack',
        attackName3: 'Arrow',
        quick: 15,
        heavy: 25,
        range: 5,
        rangebase: 5,
    },
},]


var player = [{
    name: 'Green Knight',
    img: 'assets/pics/greenknight.png',
    maxHealth: 100,
    health: 100,
    hits: 0,
    attacks: ['Quick', 'Heavy', 'Arrow'],
    item: [],
    healthBonus: 0,
    sandBonus: -1,
    shieldBonus: -1,
    poison: true,
    lightnig: false,
    ice: false,
    magicAtt: ['Poison'],
}, {
    name: 'Red Knight',
    img: 'assets/pics/greenknight.png',
    maxHealth: 100,
    health: 100,
    hits: 0,
    attacks: ['Quick', 'Heavy', 'Arrow'],
    item: [],
    healthBonus: 0,
    sandBonus: -1,
    shieldBonus: -1,
    poison: false,
    lightning: true,
    ice: false,
    magicAtt: ['lightning'],
}, {
    name: 'Blue Knight',
    img: 'assets/pics/greenknight.png',
    maxHealth: 100,
    health: 100,
    hits: 0,
    attacks: ['Quick', 'Heavy', 'Arrow'],
    item: [],
    healthBonus: 0,
    sandBonus: -1,
    shieldBonus: -1,
    poison: false,
    lightning: false,
    ice: true,
    magicAtt: ['ice'],
}]

function attack(num, enemyChar) {
    var playerChoice = playerAttack(num, enemyChar)
    enemyChar.health -= playerChoice
    display(attackMess(num))
    update(enemyChar, 'enemyhealth')
    lightning(enemyChar)
    ice(enemyChar)
    var eAttack = enemyAttChoice(enemyChar)
    var enemyAttResult = enemyAttMess(enemyChar, eAttack)
    setTimeout(display, 3000, enemyAttResult)
    enemyDmg(eAttack, enemyChar, player[choice])
    enemyChar.hits++
    setTimeout(update, 3000, player[choice], 'playerhealth')
    shieldEnd(player[choice], enemyChar)
    sandEnd(player[choice], enemyChar)
    drawHits(enemy)
    setTimeout(poison, 5000, enemyChar)
    playerWin(enemy, player[choice])
}

var level = 0

var Item = function (itemName, itemMod, itemQ) {
    this.itemName = itemName
    this.itemMod = itemMod
    this.itemQ = itemQ
}

var items = {
    Potion: new Item("Health Potion", 25, 5),
    Shield: new Item("Shield", 0.5, 5),
    Sandwhich: new Item("Sandwhich", 2, 2)
}

function addItems(obj, playerChar) {
    playerChar.item.push(obj.Potion)
    playerChar.item.push(obj.Shield)
    playerChar.item.push(obj.Sandwhich)
}



function playerAttack(num, enemyChar) {
    if (num == 0) {
        return enemyChar.damage.quick
    } else if (num == 1) {
        return enemyChar.damage.heavy
    } else if (num == 2) {
        return enemyChar.damage.arrow
    }
}

function update(Char, charId) {
    var charHealth= Char.health
    if (charHealth > 0) {
        document.getElementById(charId).innerHTML = `<h4>Health</h4>
        <div class="progress">
  <div class="progress-bar" role="progressbar" style="width: ${charHealth / 2}%;">${charHealth}</div>
    </div>`
    } else {
        document.getElementById(charId).innerHTML = `<h4>Health</h4>
        <div class="progress">
  <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
    </div>`
    }
}

function charName(name, nameId) {
    document.getElementById(nameId).innerText = name
}

function charImg(img, imgId) {
    document.getElementById(imgId).innerHTML = '<img src="' + img + '" class="char-img">'
}

function levelIncrease(enemy) {
    if (enemy[level].health <= 0) {
        level++
        update(enemy[level].health, 'enemyhealth')
        charName(enemy[level].name, 'enemyname')
        charImg(enemy[level].img, 'enemyimg')
        drawBackground(enemy[level]) 
    }
}

function enemyAttMess(enemyChar, randChoice) {
    var options = enemyChar.attack.hitChance
    var randAtt = options[randChoice]
    if (randAtt > 0) {
        if (randAtt == 1) {
            return enemyChar.name + ' used a ' + enemyChar.attack.attackName1
        } else if (randAtt == 2) {
            return enemyChar.name + ' used a ' + enemyChar.attack.attackName2
        } else if (randAtt == 3) {
            return enemyChar.name + ' fired an ' + enemyChar.attack.attackName3
        }
    } else if (randChoice == (enemyChar.attack.hitChance.length - 1)) {
        return enemyChar.name + ' is shocked and missed!'
    } else {
        return enemyChar.name + ' Missed!'
    }
}

function enemyAttChoice(enemyChar) {
    var attacks = enemyChar.attack.hitChance.length
    var randAtt = Math.floor(Math.random() * attacks)
    return randAtt
}

function enemyDmg(randChoice, enemyChar, playerChar) {
    var randAtt = enemyChar.attack.hitChance[randChoice]
    if (randAtt > 0) {
        if (randAtt == 1) {
            playerChar.health -= enemyChar.attack.quick
        } else if (randAtt == 2) {
            playerChar.health -= enemyChar.attack.heavy
        } else if (randAtt == 3) {
            playerChar.health -= enemyChar.attack.range
        }
    } else {
        playerChar.health -= 0
    }
}

function display(resultMess) {
    document.getElementById('display').innerText = resultMess
}

function attackMess(number) {
    if (number == 0) {
        return 'You used a Quick Attack!'
    } else if (number == 1) {
        return 'You used a Heavy Attack!'
    } else if (number == 2) {
        return 'You fired an Arrow!'
    }
}

function poisoned(enemyChar) {
    if (enemyChar[level].poisoned == 1) {
        enemyChar[level].health -= enemyChar[level].damage.poison
        return enemyChar[level] + 'is poisoned!'
    }
}

function useItem(num, playerChar, enemyChar) {
    if (num == 0) {
        if (playerChar.item[0].itemQ > 0) {
            playerChar.health += playerChar.item[0].itemMod
            update(playerChar, 'playerhealth')
            playerChar.item[0].itemQ -= 1
            drawItemInven(playerChar.item)
            document.getElementById('display').innerText = "You used a Health Potion!"
        } else {
            document.getElementById('display').innerText = "You're out of those!"
        }
    } else if (num == 1) {
        if (playerChar.item[1].itemQ > 0) {
            enemyChar[level].attack.range -= enemyChar[level].attack.range
            var quickReduce = (enemyChar[level].attack.quick / 2)
            var heavyReduce = (enemyChar[level].attack.heavy / 2)
            enemyChar[level].attack.quick -= quickReduce
            enemyChar[level].attack.heavy -= heavyReduce
            playerChar.item[1].itemQ -= 1
            drawItemInven(playerChar.item)
            document.getElementById('display').innerText = "Armored up!"
            playerChar.shieldBonus += 5
        } else {
            document.getElementById('display').innerText = "Better find cover!"
        }
    } else if (num == 2) {
        if (playerChar.item[2].itemQ > 0) {
            var modifier = playerChar.item[2].itemMod
            enemyChar[level].damage.quick += enemyChar[level].damage.quick
            enemyChar[level].damage.heavy += enemyChar[level].damage.heavy
            var healthIn = playerChar.health * modifier
            playerChar.health = healthIn
            update(playerChar, 'playerhealth')
            playerChar.item[2].itemQ -= 1
            drawItemInven(playerChar.item)
            document.getElementById('display').innerText = "You ate a Sandwhich!"
            playerChar.sandBonus += 5
        } else {
            document.getElementById('display').innerText = "Sorry, no free lunch here!"
        }
    }
}

function shieldEnd(playerChar, enemyChar) {
    debugger
    if (playerChar.shieldBonus > 0) {
        playerChar.shieldBonus -= 1
    } else if (playerChar.shieldBonus == 0) {
        enemyChar.attack.range += enemyChar.attack.rangebase
        enemyChar.attack.quick += enemyChar.attack.quick
        enemyChar.attack.heavy += enemyChar.attack.heavy
        playerChar.shieldBonus -= 1
    }
}

function sandEnd(playerChar, enemyChar) {
    if (playerChar.sandBonus > 0) {
        playerChar.sandBonus -= 1
    } else if (playerChar.shieldBonus == 0) {
        var attDamage = enemyChar.damage
        attDamage.quick -= (attDamage.quick / 2)
        attDamage.heavy -= (attDamage.heavy / 2)
        playerChar.healthBonus -= playerChar.healthBonus
        playerChar.sandBonus -= 1
    }
}

function drawBackground(enemyChar) {
    document.getElementById('background-img').style.backgroundImage = enemyChar.backImg
}

function drawAttBtn(arr) {
    var template = `<h3>Attacks!</h3>`
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        template += `
        <button onclick="attack(${[i]}, enemy[level]); levelIncrease(enemy)">${arr[i]}</button>`
    }
    document.getElementById('attack-btn').innerHTML = template
}

function drawItemBtn(arr, playerChar, enemyChar) {
    var template = `<h3>Items!</h3>`
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        template += `<button onclick="useItem(${[i]}, player[choice], enemy)">${arr[i].itemName}</button>`
    }
    document.getElementById('item-btn').innerHTML = template
}

function totalHits(enemyChar) {
    var total = 0
    for (var i = 0; i < enemyChar.length; i++) {
        total += enemyChar[i].hits
    }
    return total
}

function drawHits(enemyChar) {
    document.getElementById('Hits').innerHTML = '<h4>Hits: ' + totalHits(enemyChar)
}

function drawItemInven(arr) {
    var template = ``
    for (var i = 0; i < arr.length; i++) {
        template += `<h5>${arr[i].itemName}: ${arr[i].itemQ}</h5>`
    }
    document.getElementById('itemInven').innerHTML = template
}

function magic(playerChar, enemyChar) {
    debugger
    if (playerChar.poison == true && enemyChar[level].poisoned < 1) {
        enemyChar[level].poisoned += 5
        document.getElementById('display').innerText = enemyChar[level].name + ' is poisoned!'
    } else if (playerChar.magicAtt[0] == 'lightning' && enemyChar[level].shocked < 1) {
        enemyChar[level].shocked += 1
        document.getElementById('display').innerText = enemyChar[level].name + ' is shocked!'
    } else if (playerChar.magicAtt[0] == 'ice' && enemyChar[level].frozen < .5) {
        enemyChar[level].frozen += 1
        document.getElementById('display').innerText = enemyChar[level].name + ' is frozen!'
    }
}

function poison(enemyChar) {
    if (enemyChar.poisoned > 0) {
        enemyChar.health -= enemyChar.damage.poison
        document.getElementById('display').innerText = enemyChar.name + ' was hurt was poison!'
        update(enemyChar, 'enemyhealth')
        enemyChar.poisoned -= 1
    }
}

function lightning(enemyChar) {
    if (enemyChar.shocked == 1) {
        enemyChar.attack.hitChance.push(0)
        enemyChar.shocked -= 1
    }
}

function ice(enemyChar) {
    if (enemyChar.frozen == 1) {
        enemyChar.attack.quick -= (enemyChar.attack.quick / 2)
        enemyChar.attack.heavy -= (enemyChar.attack.heavy / 2)
        enemyChar.frozen -= .5
    } else if (enemyChar.frozen == .5) {
        enemyChar.frozen -= .5
    }
}

function drawMagicBtn(playerChar) {
    var template = `<h3>Magic!</h3>`
    for (var i = 0; i < playerChar.magicAtt.length; i++) {
        template += `<button onclick="magic(player[choice], enemy)">${playerChar.magicAtt[i]}</button> `
    }
    document.getElementById('magic-btn').innerHTML = template
}

function startGame(pick) {
    document.getElementById('start-page').style.display = "block"
    choice = pick
    update(player[choice], 'playerhealth')
    update(enemy[level], 'enemyhealth')
    charName(enemy[level].name, 'enemyname')
    charName(player[choice].name, 'playername')
    charImg(enemy[level].img, 'enemyimg')
    charImg(player[choice].img, 'playerimg')
    drawBackground(enemy[level])
    drawAttBtn(player[choice].attacks)
    addItems(items, player[choice])
    drawItemBtn(player[choice].item, player, enemy)
    drawHits(enemy)
    drawItemInven(player[choice].item)
    drawMagicBtn(player[choice])
}

function drawEndPage(outcome) {
    document.getElementById('end-page').style.display = "block"
    var endMess = outcome
    document.getElementById('end-page').innerHTML = `<h2>${endMess}</h2>
    <span>Hits: ${totalHits()}</span>
    <span>Enemies beat: ${level}</span>
    <button onclick="startPage(); pageChange(3)">Try again!</button>`
}

function playerWin(enemyArr, playerChar) {
    if (enemyArr.length == level) {
        pageChange(2) 
        drawEndPage('You Win!')
    } else if (playerChar.health == 0) {
        pageChange(2)
        drawEndPage('You Lose!')
    }
}