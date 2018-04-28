
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
    var playerChoice = playerAttack(num, enemy)
    enemy[level].health -= playerChoice
    poisoned(enemy)
    update(enemy[level].health, 'enemyhealth')
    charName(enemy[level].name, 'enemyname')
    var enemyAttResult = enemyAttack(enemy[level])
    enemyDisplay(enemyAttResult)
    enemy[level].hits++
    update(player[choice].health, 'playerhealth')
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

function enemyAttack(enemyChar) {
    var randAtt = Math.floor(Math.random() * 4)
    if (randAtt == 1) {
        player[choice].health -= enemyChar.attack.quick
        return enemyChar.name + ' used a ' + enemyChar.attack.attackName1
    } else if (randAtt == 2) {
        player[choice].health -= enemyChar.attack.heavy
        return enemyChar.name + ' used a ' + enemyChar.attack.attackName2
    } else if (randAtt == 3) {
        player[choice].health -= enemyChar.attack.range
        return enemyChar.name + ' fired an ' + enemyChar.attack.attackName3
    } else {
        return enemyChar.name + ' Missed!'
    }
}

function enemyDisplay(resultMess) {
    document.getElementById('enemydisplay').innerText = resultMess
}

function greenMagic(target) {
    if (target[level].poisoned == 0) {
        target[level].poisoned += 1
    }
}

function poisoned(enemyChar) {
    if (enemyChar[level].poisoned == 1) {
        enemyChar[level].health -= enemyChar[level].damage.poison
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
