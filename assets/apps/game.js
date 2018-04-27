
var enemy = [{
    name: 'Theif',
    health: 100,
    hits: 0,
    damage: {
        quick: 
    },
    img: 'assets/pics/thief.png'
}, {
    name: 'Barbarian',
    health: 100,
    hits: 0
    img: ''
}, ]

var level = 0

function quick(enemy) {
    enemy[level].health -= 10
    update(enemy[level].health)
    enemyName(enemy[level].name)
    enemyImg(enemy[level].img)
}

function heavy(enemy) {
    enemy[level].health -= 20
    update(enemy[level].health)
    enemyName(enemy[level].name)
    enemyImg(enemy[level].img)
}

function arrow(enemy) {
    enemy[level].health -= 25
    update(enemy[level].health)
    enemyName(enemy[level].name)
    enemyImg(enemy[level].img)
}

function update(health) {
    document.getElementById('health').innerText = health
}

function enemyName(name) {
    document.getElementById('name').innerText = name
}

function enemyImg(img) {
    document.getElementById('enemyimg').src = img
}

function levelIncrease(enemy) {
    if (enemy[level].health <= 0) {
        level++
        update(enemy[level].health)
        enemyName(enemy[level].name) 
    }
}

update(enemy[level].health)
enemyName(enemy[level].name)
enemyImg(enemy[level].img)