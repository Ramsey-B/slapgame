
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
    backImg: 'assets/pics/forrest-background.jpg',
    poisoned: 0,
    attack: {
        attackName1: 'Quick Attack',
        attackName2: 'Heavy Attack',
        attackName3: 'Arrow',
        quick: 5,
        heavy: 10,
        range: 25,
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
    poisoned: 0,
    attack: {
        attackName1: 'Quick Attack',
        attackName2: 'Heavy Attack',
        attackName3: 'Arrow',
        quick: 15,
        heavy: 25,
        range: 5,
    },
},]

var choice = 0
var player = [{
    name: 'Green Knight',
    img: 'assets/pics/greenknight.png',
    maxHealth: 100,
    health: 100,
    hits: 0
}]

var level = 0

var Item = function (itemName, itemMod, itemQ) {
    this.itemName = itemName
    this.itemMod = itemMod
    this.itemQ = itemQ
}

var items = {
    Potion: new Item("Health Potion", 25, 5),
    Shield: new Item("Shield", 0.5, 10),
    Sandwhich: new Item("Sandwhich", 2, 2)
}

function attack(num, enemy) {
    debugger
    var playerChoice = playerAttack(num, enemy)
    enemy[level].health -= playerChoice
    display(attackMess(num))
    update(enemy[level].health, 'enemyhealth')
    var eAttack = enemyAttChoice()
    var enemyAttResult = enemyAttMess(enemy[level], eAttack)
    setTimeout(display, 3000, enemyAttResult)
    enemyDmg(eAttack, enemy[level], player[choice])
    enemy[level].hits++
    setTimeout(update, 3000, player[choice].health, 'playerhealth')
}

function playerAttack(num, enemy) {
    if (num == 1) {
        return enemy[level].damage.quick
    } else if (num == 2) {
        return enemy[level].damage.arrow
    } else if (num == 3) {
        return enemy[level].damage.arrow
    }
}

function update(health, charId) {
    if (health > 0) {
        document.getElementById(charId).innerHTML = `<h4>Health</h4>
        <div class="progress">
  <div class="progress-bar" role="progressbar" style="width: ${health}%;" aria-valuenow="${health}" aria-valuemin="0" aria-valuemax="100">${health}</div>
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
    document.getElementById(imgId).src = img
}

function levelIncrease(enemy) {
    if (enemy[level].health <= 0) {
        level++
        update(enemy[level].health, 'enemyhealth')
        charName(enemy[level].name, 'enemyname')
        charImg(enemy[level].img, 'enemyimg')
    }
}

function enemyAttMess(enemyChar, randChoice) {
    if (randChoice == 1 || randChoice == 2) {
        return enemyChar.name + ' used a ' + enemyChar.attack.attackName1
    } else if (randChoice == 3 || randChoice == 4) {
        return enemyChar.name + ' used a ' + enemyChar.attack.attackName2
    } else if (randChoice == 5 || randChoice == 6) {
        return enemyChar.name + ' fired an ' + enemyChar.attack.attackName3
    } else {
        return enemyChar.name + ' Missed!'
    }
}

function enemyAttChoice() {
    var randAtt = Math.floor(Math.random() * 7)
    return randAtt
}

function enemyDmg(randChoice, enemyChar, playerChar) {
    if (randChoice == 1 || randChoice == 2) {
        playerChar.health -= enemyChar.attack.quick
    } else if (randChoice == 3 || randChoice == 4) {
        playerChar.health -= enemyChar.attack.heavy
    } else if (randChoice == 5 || randChoice == 6) {
        playerChar.health -= enemyChar.attack.range
    } else {
        playerChar.health -= 0
    }
}

function display(resultMess) {
    document.getElementById('display').innerText = resultMess
}

function attackMess(number) {
    if (number == 1) {
        return 'You used a Quick Attack!'
    } else if (number == 2) {
        return 'You used a Heavy Attack!'
    } else if (number == 3) {
        return 'You fired an Arrow!'
    }
}

function greenMagic(target) {
    if (target[level].poisoned == 0) {
        target[level].poisoned += 1
    }
}

function poisoned(enemyChar) {
    if (enemyChar[level].poisoned == 1) {
        enemyChar[level].health -= enemyChar[level].damage.poison
        return enemyChar[level] + 'is poisoned!'
    }
}
function healthPotion(playerChar, obj) {
    debugger
    if (obj.Potion.itemQ > 0 && playerChar.health < playerChar.maxHealth) {
        playerChar.health += obj.Potion.itemMod
        update(playerChar.health, 'playerhealth')
        obj.Potion.itemQ -= 1
    }
}

function eatSandwhich(obj, playChar, enemyChar) {
    debugger
    if (obj.Sandwhich.itemQ > 0) {
        var modifier = obj.Sandwhich.itemMod
        enemyChar[level].damage.quick += enemyChar[level].damage.quick
        enemyChar[level].damage.heavy += enemyChar[level].damage.heavy
        update(playChar.health * modifier, 'playerhealth')
        obj.Sandwhich.itemQ -= 1
    }
}

function shield(def, playDef, enemyDef) {
    debugger
    if (def.Shield.itemQ > 0) {
        enemyDef[level].attack.range -= enemyDef[level].attack.range
        var quickReduce = (enemyDef[level].attack.quick / 2)
        var heavyReduce = (enemyDef[level].attack.heavy / 2)
        enemyDef[level].attack.quick -= quickReduce
        enemyDef[level].attack.heavy -= heavyReduce
        def.Shield.itemQ -= 1
    }
}

update(player[choice].health, 'playerhealth')
update(enemy[level].health, 'enemyhealth')
charName(enemy[level].name, 'enemyname')
charName(player[choice].name, 'playername')
charImg(enemy[level].img, 'enemyimg')
charImg(player[choice].img, 'playerimg')
