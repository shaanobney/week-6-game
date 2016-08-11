$(document).ready(function() {
    
    //TOPICS FOR GIPHY SEARCH
    var topics = [
        'BLUE VELVET',
        'LIFEFORCE',
        'HAUSU',
        'SOLARIS',
        'SCANNERS',
        'UNDER THE SKIN',
        'NINJA SCROLL',
        'RAISING ARIZONA',
        'HOLY MOUNTAIN',
        'BLADERUNNER',
        'PAPRIKA',
        'TRON',
        ]

    //CHANGES COLOR AND FONT RANDOMLY EVERY PAGE LOAD
    var randomColor = function() {
      var colors = ["#FFB5C5", "#EE7AE9", "#8B7B8B", "#3D59AB", "#C6E2FF", "#1E90FF", "#00F5FF", "#7FFFD4", "#FCD116", "#EE9A00", "#EE9A00", "#FF3030", "#282828", "#7A7A7A", "#CCCCCC", "#333333", "#990099"];              
      var fonts = ["pioneer", "arcade", "pacmania", "ed", "mex", "sand", "sf", "park", "deutsch", "lead", "king", "mario", "beam", "pokemon", "storyboo", "diamonds", "iomanoid", "dork", "november", "blox", "crackman", "games", "slaytanic", "zorque"];
      var rando = Math.floor(Math.random() * colors.length);
      var randoma = Math.floor(Math.random() * fonts.length);          
      $('#title').css("color", colors[rando]);
      $('#title').css("font-family", fonts[randoma]);
    }

    randomColor();
    //CREATES BUTTONS FROM TOPIC ARRAY
    var buttFactory = function() {
        for (i = 0; i < topics.length; i++) {
            var button = $('<button class="topic">').text(topics[i]);
            $('#buttons').append(button);
        }
    }

    buttFactory();

    //ADD BY BUTTON
    $('#add').on('click', function() {
        var newTopic = $('#input').val();
        var button = $('<button class="newTopic">').text(newTopic);
        $('#buttons').append(button);
        $('#input').val('');
    })

    //ADD BY ENTER KEY
    $('#input').keydown(function (e) {
    if(e.keyCode == 13){
        var newTopic = $('#input').val();
        var button = $('<button class="newTopic">').text(newTopic);
        $('#buttons').append(button);
        $('#input').val('');
    }
    })

    //CLICK ON TOPIC. CLEARS IMAGEDUMP, MAKES DIV FOR EACH GIF.

        $(document).on('click','.topic', function() {
        // $('#title').remove(); //CLEARS TITLE FIELD
        $('.vom').remove();
        
        var select = $(this).text()
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + select + "&api_key=dc6zaTOxFJmzC&limit=12";
        $.ajax({ url: queryURL, method: 'GET' })
            .done(function(response) {
                var results = response.data
                for (i = 0; i < results.length; i++) {
                var p = $('<p class="rating">').text('rating: '+ results[i].rating);
                var vom = $('<div class=vom>').attr('data-value', i);
                var buttImage = $('<img class="image">').attr('src',results[i].images.fixed_height_still.url);
                    buttImage.css('margin', '2px').attr('data-name', results[i].id);
                $('#imageDump').prepend(vom.append(buttImage).append(p));
            }
        })
    });

    $(document).on('click','.newTopic', function() {
        // $('#title').remove(); //CLEARS TITLE FIELD
        $('.vom').remove();
        
        var select = $(this).text()
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + select + "&api_key=dc6zaTOxFJmzC&limit=12";
        $.ajax({ url: queryURL, method: 'GET' })
            .done(function(response) {
                var results = response.data
                for (i = 0; i < results.length; i++) {
                var p = $('<p class="rating">').text('rating: '+ results[i].rating);
                var vom = $('<div class=vom>').attr('data-value', i);
                var buttImage = $('<img class="image">').attr('src',results[i].images.fixed_height_still.url);
            		buttImage.css('margin', '2px').attr('data-name', results[i].id);
                $('#imageDump').prepend(vom.append(buttImage).append(p));
            }
        })
    });

    $(document).on('click', '.image', function() {
        var queryURL = "https://api.giphy.com/v1/gifs?&api_key=dc6zaTOxFJmzC&limit=12&ids="+ $(this).attr('data-name');
        var thisImageUrl = $(this).attr('src');
        var parentDivValue = $(this).parent('div').attr('data-value');
        $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
            var still = response.data[0].images.fixed_height_still.url;
            var moving = response.data[0].images.fixed_height.url;
            if(thisImageUrl == still) {
                thisImageUrl = moving;
                $('div[data-value='+ parentDivValue +']').children('.image').attr('src', thisImageUrl);
            } else if (thisImageUrl == moving) {
                thisImageUrl = still;
                $('div[data-value='+ parentDivValue +']').children('.image').attr('src', thisImageUrl);
            }
        });
    });
    //RESET
    $(document).on('click', '#reset', function() {
        $('.vom').remove();
        $('.newTopic').remove();
        $('#input').val('');
    });

});




