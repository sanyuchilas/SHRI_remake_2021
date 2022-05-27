// "browserslist": "> 0.25%, not dead",
import * as $ from 'jquery'
import './styles/stories.css'
import json from './assets/data.json'
import template from './assets/templates/main_slide.hbs'
import subtemplate1_2 from './assets/templates/sub_slide1_2.hbs'
import subtemplate3_5 from './assets/templates/sub_slide3_5.hbs'
import subtemplate4_6 from './assets/templates/sub_slide4_6.hbs'
import subtemplate7_8 from './assets/templates/sub_slide7_8.hbs'
import subtemplate9 from './assets/templates/sub_slide9.hbs'
import subtemplate10_11 from './assets/templates/sub_slide10_11.hbs'
window.json = json

window.getUrlVars = function(varName) {
  const params = new URLSearchParams(window.location.search.substring(1))
  return params.get(varName) || false
}

window.renderTemplate = function (alias, data) {
  const subtemplates = [subtemplate1_2, subtemplate1_2, subtemplate3_5, subtemplate4_6, subtemplate3_5, subtemplate4_6, subtemplate7_8, subtemplate7_8, subtemplate9, subtemplate10_11, subtemplate10_11]
  let slideHtml = template({alias: alias, data: data}) 
  + subtemplates[slideNum]({alias: alias, data: data})

  return slideHtml
}

//джаваскрипт для струтуры и стилей страницы

window.addEventListener('load', function() {
  const data = json[slideNum] ? json[slideNum].data : null
  let body = document.querySelector('body')
  let toggleButton = document.querySelector('#toggle_theme')
  let nextButton = document.querySelector('#next_slide')
  let previousButton = document.querySelector('#previous_slide')
  nextButton.onclick = () => {
    let theme = body.className.split('_').pop()
    if (slideNum + 2 < 12 && slideNum + 2 > 0) {
      console.log()
      window.location.search = `?slide=${slideNum+2}&theme=${theme}`
    }
  }
  previousButton.onclick = () => {
    let theme = body.className.split('_').pop()
    if (slideNum < 12 && slideNum > 0) {
      window.location.search = `?slide=${slideNum}&theme=${theme}`
    }
  }
  toggleButton.onclick = () => {
    if (body.className === 'theme_dark') {
      window.location.search = `?slide=${slideNum+1}&theme=` + 'light'
    } else {
      window.location.search = `?slide=${slideNum+1}&theme=` + 'dark'
    }
  }
  // data.users.sort(dataSortFunction)
  //RENDER_LEADERS
  if ($('.container').attr('id') === 'leaders') {
    function renderLeaders() {
      if (selectUser) {
        if (positionNumber > 3 && widthSmall) {
          chosenLeaderHtml = `<img id="emoji_like" src="images/emoji.png">
                              <img src="images/${selectUser.avatar}" alt="">
                              <p class="name">${selectUser.name}</p>
                              <p class="valueText">${selectUser.valueText}</p>
                              <div class="line"></div>
                              <p class="position_number">${positionNumber}</p>`
        } else if(positionNumber > 5 && !widthSmall) {
          let colP5 = document.getElementById('p5')
          colP5.innerHTML = `<img id="emoji_like" src="images/emoji.png">
                            <img src="images/${selectUser.avatar}" alt="">
                            <p class="name">${selectUser.name}</p>
                            <p class="valueText">${selectUser.valueText}</p>
                            <div class="position_number">
                              <p class="position_number">${positionNumber}</p>
                            </div>`
        } else {
          const positionNumbersArray = $('p.position_number')
          function showChosenLeaderEmoji(i) {
            positionNumbersArray[i]
            .parentElement
            .parentElement
            .firstElementChild
            .insertAdjacentHTML('beforebegin', `<img id="emoji_like" src="images/emoji.png">`)
          }
          if (positionNumber == 3){
            showChosenLeaderEmoji(1)
          } else if(positionNumber == 2) {
            showChosenLeaderEmoji(3)
          } else if(positionNumber == 5) {
            showChosenLeaderEmoji(0)
          } else if(positionNumber == 4) {
            showChosenLeaderEmoji(4)
          }
        }
      }
      let chosenLeader = document.getElementById('chosen_leader')
      chosenLeader ? chosenLeader.innerHTML = chosenLeaderHtml : 0
      // console.log('render finished')
    }
    let selectUserId = localStorage.getItem('selectUserId') ? JSON.parse(localStorage.getItem('selectUserId'))[slideNum - 1] : undefined
    let selectUser
    data.users.forEach(user => {selectUserId == user.id ? selectUser = user : 0})
    let positionNumber = data.users.indexOf(selectUser) + 1
    let chosenLeaderHtml = ``
    let widthSmall = window.screen.width < 668
    renderLeaders()
    window.addEventListener('resize', () => {
      let widthNow = widthSmall
      widthSmall = window.screen.width < 668
      if (widthSmall != widthNow) {
        renderLeaders()
      }
    })
  }
  //RENDER_VOTE
  if ($('.container').attr('id') === 'vote') { 
    let widthSmall = $('.hidden').css('display') === 'flex'
    //Устанавливем параметры data
    $('#main').data('params', {"alias": "leaders", "data": {"selectUserId": null}})
    $('#button_down').data('params', {"alias": "vote", "data": {"offset": 0}})

    function renderSlide(offset = 0) {
      $('.noHover').removeClass('noHover')
      $('.clicked').removeClass('clicked')
      const cardHtml = (i, card) => {
        if (i < 0) {
          i = 0
          OFFSET = 0
        }
        if (i < data.users.length) {
          return `<img src="images/${data.users[i].avatar}">
                  <p class="name">${data.users[i].name}</p>`
          } else {
            card.classList.add('noHover')
            return ''
          }
      }
      const listCards = $('.vote_card:not(.arrow)')
      if (widthSmall) {
        listCards[1].innerHTML = cardHtml(offset, listCards[1])
        listCards[2].innerHTML = cardHtml(offset + 3, listCards[2])
        listCards[3].innerHTML = cardHtml(offset + 6, listCards[3])
        listCards[4].innerHTML = cardHtml(offset + 1, listCards[4])
        listCards[5].innerHTML = cardHtml(offset + 4, listCards[5])
        listCards[6].innerHTML = cardHtml(offset + 2, listCards[6])
        listCards[7].innerHTML = cardHtml(offset + 5, listCards[7])
        listCards[8].innerHTML = cardHtml(offset + 7, listCards[8])
      } else {
        listCards[0].innerHTML = cardHtml(offset, listCards[0])
        listCards[1].innerHTML = cardHtml(offset + 1, listCards[1])
        listCards[3].innerHTML = cardHtml(offset + 4, listCards[3])
        listCards[6].innerHTML = cardHtml(offset + 2, listCards[6])
        listCards[8].innerHTML = cardHtml(offset + 5, listCards[8])
        listCards[9].innerHTML = cardHtml(offset + 3, listCards[9])
      }
      //Подсвечиваем выбранного пользователя и ставим эмоджи
      const listP = $('.vote_card:not(.arrow) p.name')
      if (widthSmall && (listP.length >= 10 || listP.length < 8)) {
        listP.splice(0, 1)
        listP.splice(8, 1)
      } else if (!widthSmall && (listP.length >= 10 || listP.length < 6)) { //
        listP.splice(2, 1)
        listP.splice(3, 2)
        listP.splice(4, 1)
      }
      const selectUserId = localStorage.getItem('selectUserId') ? JSON.parse(localStorage.getItem('selectUserId'))[slideNum] : undefined
      let selectUser = 0
      data.users.forEach(user => {user.id == selectUserId ? selectUser = user : 0})
      for (let i = 0; i < listP.length; i++) {
        if (selectUser && listP[i].innerHTML == selectUser.name) {
          showSelect(listP[i].parentElement)
          break
        }
      }
      arrows()
      // console.log('Slide succesfully render!')
    }
    const btnUp = document.querySelector('#button_up')
    const btnDown = document.querySelector('#button_down')
    let OFFSET = $('#button_down').data('params').data.offset
    renderSlide(OFFSET)
    btnUp.addEventListener('click', function() {
      if (this.classList.contains('active')) {
        widthSmall ? OFFSET -= 8 : OFFSET -= 6
        renderSlide(OFFSET)
      }
    })
    btnDown.addEventListener('click', function() {
      if (this.classList.contains('active')) {
        widthSmall ? OFFSET += 8 : OFFSET += 6
        renderSlide(OFFSET)
      }
    })
    
    window.addEventListener('resize', () => {
      let widthNow = widthSmall
      widthSmall = $('.hidden').css('display') === 'flex'
      if (widthNow != widthSmall) {
        if (widthSmall && OFFSET !== 0 && OFFSET % 6 === 0 && OFFSET % 8 !== 0) {
          let k = Math.ceil(OFFSET / 8)
          OFFSET += 2 * k
        } else if (!widthSmall && OFFSET !== 0 && OFFSET % 8 === 0 && OFFSET % 6 !== 0) {
          OFFSET -= 2
        }
        renderSlide(OFFSET)
      }
    })
    function arrows() {
      if (OFFSET <= 0) {
        btnUp.classList.remove('active')
        btnDown.classList.remove('active')
        btnDown.classList.add('active')
      } else {
        btnUp.classList.remove('active')
        btnUp.classList.add('active')

        if (!widthSmall && OFFSET + 7 > data.users.length) {
          btnDown.classList.remove('active')
        } else if (widthSmall && OFFSET + 9 > data.users.length) {
          btnDown.classList.remove('active')
        } else {
          btnDown.classList.remove('active')
          btnDown.classList.add('active')
        }
      }
    }
    function showSelect(card) {
      let clickedImg = card.querySelector('img')
      $('.clicked').removeClass('clicked')
      card.classList.add('clicked')
      document.querySelector('#emoji_vote') ? document.querySelector('#emoji_vote').remove() : 0
      clickedImg.insertAdjacentHTML('beforebegin', `<div id="emoji_vote">
      ${json[slideNum].data.emoji}
      </div>`)
    }
    $('.vote_card:not(.arrow)').on('click', function() {
      $('#main').data('params').data.selectUserId = this.querySelector('img')
      .getAttribute('src')
      .split('/')
      .pop()
      .split('.')
      .shift()
      if (!localStorage.getItem('selectUserId')){
        window.selectUsersArray = []
      } else {
        window.selectUsersArray = JSON.parse(localStorage.getItem('selectUserId'))
      }
      window.selectUsersArray.length = json.length
      selectUsersArray.splice(slideNum, 1, $('#main').data('params').data.selectUserId)
      localStorage.setItem('selectUserId', JSON.stringify(selectUsersArray))
      //Добавляем эмоджи и делаем подсветку
      showSelect(this)
    })
  }
  //RENDER_CHART
  if ($('.container').attr('id') === 'chart') {
    const listCols = document.getElementsByClassName('p_col')
    $('.p_commits.active').removeClass('active')
    $('.p_col.active').removeClass('active')
    let commit = -1
    data.values.forEach(value => {
      value.active ? commit = value.value : 0
    })
    for (let i = 0; i < listCols.length; i++) {
      let colCommit = Number(listCols[i].parentElement.firstElementChild.innerHTML)
      if (colCommit === commit) {
        listCols[i].classList.add('active')
        listCols[i].parentElement.firstElementChild.classList.add('active')
      }
      listCols[i].style.height = ((colCommit / 0.674073) || 8) / 8 + 'vh'
    }
    
  }
  //RENDER_DIAGRAM
  if ($('.container').attr('id') === 'diagram') {
    function renderCorrectDiagram() {
      let commits_1 = parseInt(data.categories[2].valueText) < 200 ? parseInt(data.categories[2].valueText) || 1 : 200
      let commits_2 = parseInt(data.categories[3].valueText) < 200 ? parseInt(data.categories[3].valueText) || 1 : 200
      let commits_3 = parseInt(data.categories[0].valueText) < 200 ? parseInt(data.categories[0].valueText) || 1 : 200
      let commits_4 = parseInt(data.categories[1].valueText) < 200 ? parseInt(data.categories[1].valueText) || 1 : 200
      let totalCommits = commits_1 + commits_2 + commits_3 + commits_4
      let segments = [document.getElementById('segment_1'), document.getElementById('segment_2'), document.getElementById('segment_3'), document.getElementById('segment_4')]
      let strokeDashArray = 904.3
      let oneDeg = strokeDashArray / 360  //DASHARRAY
      let oneCommit = 360 / totalCommits //DEG
      let r = 164
      let strokeWidth = r - r * 0.7 + ''
      segments[0].setAttribute('stroke-dashoffset', strokeDashArray - oneDeg * oneCommit * commits_1 + 110 * 360 / strokeDashArray)
      segments[0].setAttribute('stroke-width', strokeWidth)
      segments[1].setAttribute('transform', `rotate(${(oneDeg * oneCommit * commits_1) * 360 / strokeDashArray}, ${r}, ${r})`)
      segments[1].setAttribute('stroke-dashoffset', strokeDashArray - oneDeg * oneCommit * commits_2 + 110 * 360 / strokeDashArray)
      segments[1].setAttribute('stroke-width', strokeWidth)
      segments[2].setAttribute('transform', `rotate(${(oneDeg * oneCommit * (commits_2 + commits_1)) * 360 / strokeDashArray }, ${r}, ${r})`)
      segments[2].setAttribute('stroke-dashoffset', strokeDashArray - oneDeg * oneCommit * commits_3 + 110 * 360 / strokeDashArray)
      segments[2].setAttribute('stroke-width', strokeWidth)
      segments[3].setAttribute('transform', `rotate(${(oneDeg * oneCommit * (commits_2 + commits_1 + commits_3)) * 360 / strokeDashArray}, ${r}, ${r})`)
      segments[3].setAttribute('stroke-dashoffset', strokeDashArray - oneDeg * oneCommit * commits_4 + 110 * 360 / strokeDashArray)
      segments[3].setAttribute('stroke-width', strokeWidth)
    }
    renderCorrectDiagram()
  }
  //RENDER_ACTIVITY
  if ($('.container').attr('id') === 'activity') {
    let rows = $('.row#diagram .row')
    function renderDiagram(widthSmall) {
      function insertCorrectImg(theme, h, cell) {
        function imageName(theme, h, cell) {
          let value
          if (widthSmall) {
            if (h == 0) {
              value = 'min'
              cell.style.height = '33.44px'
              cell.style.marginTop = '-8px'
            } else if (h >= 1 && h <= 2) {
              value = 'mid'
              cell.style.height = '41.44px'
              cell.style.marginTop = '-16px'
            } else if (h >= 3 && h <= 4) {
              value = 'max'
              cell.style.height = '57.44px'
              cell.style.marginTop = '-32px'
            } else if (h >= 5) {
              value = 'extra'
              cell.style.height = '73.44px'
              cell.style.marginTop = '-48px'
            }
          } else {
            if (h == 0) {
              value = 'min'
              cell.style.height = '33.44px'
              cell.style.marginTop = '0px'
            } else if (h >= 1 && h <= 2) {
              value = 'mid'
              cell.style.height = '41.44px'
              cell.style.marginTop = '-8px'
            } else if (h >= 3 && h <= 4) {
              value = 'max'
              cell.style.height = '57.44px'
              cell.style.marginTop = '-24px'
            } else if (h >= 5) {
              value = 'extra'
              cell.style.height = '73.44px'
              cell.style.marginTop = '-40px'
            }
          }
          return value + '-' + theme
        }
        return `<img src="images/${imageName(theme, h, cell)}.svg" alt="">`
      }
      const theme = $('body').attr('class').split('_').pop()
      let cells = widthSmall ? [
        document.querySelector('.r1').getElementsByClassName('cell'),
        document.querySelector('.r1.hide').getElementsByClassName('cell'),
        document.querySelector('.r2').getElementsByClassName('cell'),
        document.querySelector('.r2.hide').getElementsByClassName('cell'),
        document.querySelector('.r3').getElementsByClassName('cell'),
        document.querySelector('.r3.hide').getElementsByClassName('cell'),
        document.querySelector('.r4').getElementsByClassName('cell'),
        document.querySelector('.r4.hide').getElementsByClassName('cell'),
        document.querySelector('.r5').getElementsByClassName('cell'),
        document.querySelector('.r5.hide').getElementsByClassName('cell'),
        document.querySelector('.r6').getElementsByClassName('cell'),
        document.querySelector('.r6.hide').getElementsByClassName('cell'),
        document.querySelector('.r7').getElementsByClassName('cell'),
        document.querySelector('.r7.hide').getElementsByClassName('cell')
      ] : [
        document.querySelector('.r1').getElementsByClassName('cell'),
        document.querySelector('.r2').getElementsByClassName('cell'),
        document.querySelector('.r3').getElementsByClassName('cell'),
        document.querySelector('.r4').getElementsByClassName('cell'),
        document.querySelector('.r5').getElementsByClassName('cell'),
        document.querySelector('.r6').getElementsByClassName('cell'),
        document.querySelector('.r7').getElementsByClassName('cell')
      ]
      cells.forEach(row => {
        if (!widthSmall) {
          const index = cells.indexOf(row)
          let day
          if (index === 0) {
            day = 'mon'
          } else if (index === 1) {
            day = 'tue'
          } else if (index === 2) {
            day = 'wed'
          } else if (index === 3) {
            day = 'thu'
          } else if (index === 4) {
            day = 'fri'
          } else if (index === 5) {
            day = 'sat'
          } else if (index === 6) {
            day = 'sun'
          }
          for (let i = 0; i < row.length; i++) {
            let dayCommit = data.data[day][i]
            row[i].innerHTML = insertCorrectImg(theme, dayCommit, row[i])
            row[i].style.zIndex = '0'
          }
        } else {
          const index = cells.indexOf(row)
          let day
          if (index === 0 || index === 1) {
            day = 'mon'
          } else if (index === 2 || index === 3) {
            day = 'tue'
          } else if (index === 4 || index === 5) {
            day = 'wed'
          } else if (index === 6|| index === 7) {
            day = 'thu'
          } else if (index === 8 || index === 9) {
            day = 'fri'
          } else if (index === 10 || index === 11) {
            day = 'sat'
          } else if (index === 12 || index === 13) {
            day = 'sun'
          }
          for (let i = 0, k = 0; i < row.length * 2; i += 2, k++) {
            let dayCommit
            if (index % 2 === 0) {
              dayCommit = data.data[day][i]
              row[k].style.zIndex = i + ''
            } else {
              dayCommit = data.data[day][i + 1]
              row[k].style.zIndex = i + 1 + ''
            }
            row[k].innerHTML = insertCorrectImg(theme, dayCommit, row[k])
          }
        }
      })
    }
    let widthSmall = window.screen.width < 668
    renderDiagram(widthSmall)
    window.addEventListener('resize', function() {
      let widthNow = widthSmall
      widthSmall = window.screen.width < 668
      if (widthNow !== widthSmall) {
        renderDiagram(widthSmall)
      }
    })
  }
})