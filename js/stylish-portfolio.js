(function($) {
  'use strict'
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('#sidebar-wrapper .js-scroll-trigger').click(function() {
    $("#sidebar-wrapper").removeClass("active");
    $(".menu-toggle").removeClass("active");
    $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
  });

  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Closes the sidebar menu
  $(".menu-toggle").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
    $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
    $(this).toggleClass("active");
  });


/* Button Clicking Logic starts here */


  const submitElement = $(".btn.btn-primary.js-scroll-trigger.submit")
  let genderX
  submitElement.click(function(e) {
    const name = $('#nameInput').val()
    const year = $('#yearInput').val()
    const gender = $("#genderInput").val()
    console.log(name)
    console.log(year)
    console.log(gender)
    genderX = gender
    const someTxt = $(".mb-5.welcome.name")
    someTxt.text("Welcome " + name + "!")

  })

  /* Submit preferences button */
  const submitPrefs = $(".col-lg-12.text-center.btn.btn-primary.js-scroll-trigger.submit_prefs")

  submitPrefs.click(function(e) {
    let result
    const tier = $("#tierInput").val()
    const roommate = $("#roommateInput").val()
    const type = $("#typeInput").val()
    const location = $("#locationInput").val()
    if (genderX === 'Male') {
      $.getJSON(menURL, function(data) {
         drawTable(parseData(type, tier, roommate, location, data), location, type, roommate)

      })
    } else if (genderX === 'Female') {
      $.getJSON(womenURL, function(data) {
        drawTable(parseData(type, tier, roommate, location, data), location, type, roommate)
      })
    }
  })

  const menURL = 'https://api.myjson.com/bins/f45zi'
  const womenURL = 'https://api.myjson.com/bins/dn8w6'

  const locationMap = {}
  locationMap['East Campus'] = ['BRN', 'CRO', 'GCQ', 'STN', 'MIR', 'TOY', 'WIL']
  locationMap['West Campus'] = ['GOV', 'LAG', 'ROB', 'FLO']
  locationMap['Row'] = ['ROW']

  const tierMap = {}
  tierMap['Tier 1'] = [1, 1000]
  tierMap['Tier 2'] = [1001, 2000]
  tierMap['Tier 3'] = [2001, 3000]

  const personMap = {}
  personMap['1 (Just You)'] = 'individual'
  personMap['2'] = 'group_2'
  personMap['3'] = 'group_3'
  personMap['4'] = 'group_4'

  const roomMap = {}
  roomMap['1 Room Double'] = '1rmDbl'
  roomMap['2 Room Double'] = '2rmDbl'
  roomMap['Single'] = '1rmSgl'

  const nameMap = {}

  nameMap['BRN'] = 'Branner Hall'
  nameMap['CRO'] = 'Crothers Hall'
  nameMap['FLO'] = 'Florence Moore Hall'
  nameMap['GCQ'] = 'Casper Quad'
  nameMap['GOV'] = 'Governors Corner'
  nameMap['LAG'] = 'Lagunita Court'
  nameMap['MIR'] = 'Mirrielees House'
  nameMap['ROB'] = 'Roble Hall'
  nameMap['STN'] = 'Stern Hall'
  nameMap['TOY'] = 'Toyon Hall'
  nameMap['WIL'] = 'Wilbur Hall'

  const roomNameMap = {}

  roomNameMap['EAST'] = 'EAST (TREAT)'
  roomNameMap['Murr'] = 'Murray'
  roomNameMap['Yost'] = 'Yost'
  roomNameMap['Robl'] = 'Roble'
  roomNameMap['Bran'] = 'Branner'
  roomNameMap['Cro'] = 'Crothers'
  roomNameMap['Alondra'] = 'Alondra'
  roomNameMap['Card'] = 'Cardenal'
  roomNameMap['Fais'] = 'Faisan'
  roomNameMap['Gav'] = 'Gavilan'
  roomNameMap['Loro'] = 'Loro'
  roomNameMap['Mrlo'] = 'Mirlo'
  roomNameMap['Palo'] = 'Paloma'
  roomNameMap['Cast'] = 'Castano'
  roomNameMap['Humanities'] = 'Ng (Humanities House)'
  roomNameMap['Kim'] = 'Kimball'
  roomNameMap['Lant'] = 'Lantana'
  roomNameMap['Outdoor'] = 'Outdoor House'
  roomNameMap['Pott'] = 'Potter'
  roomNameMap['Robn'] = 'Robinson'
  roomNameMap['Suites'] = 'Suites'
  roomNameMap['Adel'] = 'Adelfa'
  roomNameMap['Euc'] = 'Eucalipto'
  roomNameMap['Gran'] = 'Granada'
  roomNameMap['Meier'] = 'Meier'
  roomNameMap['Norcliffe'] = 'Norcliffe'
  roomNameMap['Nrja'] = 'Naranja'
  roomNameMap['Ujamaa'] = 'Ujaama'
  roomNameMap['Mirr'] = 'Mirrielees'
  roomNameMap['Robl'] = 'Roble'


  // Row Houses
  roomNameMap['576Alvarado'] = 'Theta Chi'
  roomNameMap['680Lom'] = '680'
  roomNameMap['BOB'] = 'BOB'
  roomNameMap['Columbae'] = 'Columbae'
  roomNameMap['Durand'] = 'Durand'
  roomNameMap['EBF'] = 'Enchanted Broccoli Forest (EBF)'
  roomNameMap['French'] = 'French House'
  roomNameMap['Grov'] = 'Grove'
  roomNameMap['Hammarsk'] = 'Hammarskjold'
  roomNameMap['HausMit'] = 'Haus Mitt'
  roomNameMap['Italian'] = 'Casa Italiana'
  roomNameMap['Jerry'] = 'Jerry'
  roomNameMap['Kairos'] = 'Kairos'
  /* what is LwRw selfOp? */

  roomNameMap['Mars'] = 'Mars'
  roomNameMap['Muwekma'] = 'Muwekma-Tah-Ruk'
  roomNameMap['Narnia'] = 'Narnia'
  roomNameMap['Phi Sg'] = 'Phi Sig'
  roomNameMap['Pluto'] = 'Pluto'
  roomNameMap['Roth'] = 'Roth'
  roomNameMap['Slav'] = 'Slav'
  roomNameMap['Storey'] = 'Storey'
  roomNameMap['Synergy'] = 'Synergy'
  roomNameMap['Terra'] = 'Terra'
  roomNameMap['Xanadu'] = 'Xanadu'
  roomNameMap['ZAP'] = 'ZAP'


  roomNameMap['Zapata'] = 'Casa Zapata'

  /* ToyonTrp causing some errors */
  roomNameMap['Toy'] = 'Toyon'
  roomNameMap['Trancos'] = 'Trancos'
  roomNameMap['Okada'] = 'Okada'

  let tempResults = []

  function parseData(type, tier, roommate, location, data) {
    const numOfRoommates = personMap[roommate]
    for (let index = 0; index < data.res_code.length; index++) {
      if (locationMap[location].includes(data.res_code[index].area)) {
        let parsed = data.res_code[index]
        tempResults.push(parsed)
      }
    }
    const result = tempResults.filter(res => parseDrawNumber(res[numOfRoommates]) !== -1)
    const lowerBound = tierMap[tier][0]
    const upperBound = tierMap[tier][1]
    const result2 = result.filter(res => isBetween(parseDrawNumber(res[numOfRoommates]), lowerBound, upperBound))


    let result3 = []

    if (type === 'Premier (Row Houses Only') {
      result3 = result2.filter(res => res['res_name'].indexOf('Prm') !== -1)
    }

    if (type === 'Standard (Row Houses Only') {
      result3 = result2.filter(res => res['res_name'].indexOf('Std') !== -1)
    }

    if (type === 'Single' || type === '1 Room Double' || type === '2 Room Double') {
      result3 = result2.filter(res => parseRoom(res['res_name']) === roomMap[type])
    }

    if (type === 'Triple') {
      result3 = result2.filter(res => res['res_name'].indexOf('Trp') !== -1)
    }

    if (type == 'Quad') {
      result3 = result2.filter(res => res['res_name'].indexOf('Quad') !== -1)
    }

    if (type == 'Suite') {
      result3 = result2.filter(res => res['res_name'].indexOf('Suite') !== -1)
    }
    console.log(result3)
    return result3
  }

  function isBetween(entered, num1, num2) {
    if (entered >= num1 && entered <= num2) {
      return true
    }
    return false
  }

  /* look at the numbers which have annotations next to them, for now it just strips
  off everything */
  function parseDrawNumber(number) {
    if (number === 'no room') {
      return -1
    } else {
      return parseInt(number, 10)
    }
  }

/* extracts the 1rmsgl, 1mrdbl stuff for comparison */
  function parseRoom(room) {
    return room.substr(room.length - 6)
  }

  function parseRoomName(room) {
     let x = room.substr(0, room.length - 6)
     return roomNameMap[x]

    /* do some regex matching to make sure that the room and room type is saved */
    /* maybe at this point, can take out the parseRoom function */


  }

  function drawTable(result, location, type, roommate) {
    console.log(location)
    const table = $(".table")

    for (let i = 0; i < result.length; i++) {
      const blah = '<tr> <th scope="row">' + (i+1) + '<td>' +  location +  '</td> <td>'
      + '<a href="#">' + nameMap[result[i]['area']] + '</a><td>' + parseRoomName(result[i]['res_name']) + ' ' + type + '</td><td>' + parseDrawNumber(result[i][personMap[roommate]]) + '</td></th></tr>'
      table.append(blah)
    }
  }
})(jQuery)


/*(function($) {
  "use strict"; // Start of use strict

  // Closes the sidebar menu
  $(".menu-toggle").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
    $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
    $(this).toggleClass("active");
  });

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('#sidebar-wrapper .js-scroll-trigger').click(function() {
    $("#sidebar-wrapper").removeClass("active");
    $(".menu-toggle").removeClass("active");
    $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
  });

  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

})(jQuery); // End of use strict*/

// Disable Google Maps scrolling
// See http://stackoverflow.com/a/25904582/1607849
// Disable scroll zooming and bind back the click event
var onMapMouseleaveHandler = function(event) {
  var that = $(this);
  that.on('click', onMapClickHandler);
  that.off('mouseleave', onMapMouseleaveHandler);
  that.find('iframe').css("pointer-events", "none");
}
var onMapClickHandler = function(event) {
  var that = $(this);
  // Disable the click handler until the user leaves the map area
  that.off('click', onMapClickHandler);
  // Enable scrolling zoom
  that.find('iframe').css("pointer-events", "auto");
  // Handle the mouse leave event
  that.on('mouseleave', onMapMouseleaveHandler);
}
// Enable map zooming with mouse scroll when the user clicks the map
$('.map').on('click', onMapClickHandler);
