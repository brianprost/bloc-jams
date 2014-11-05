var albumPicasso = {
    name: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: '/images/album-placeholder.png',
    songs: [
        {name: 'Blue', length: '4:26'},
        {name: 'Green', length: '3:14'},
        {name: 'Red', length: '5:01'},
        {name: 'Pink', length: '3:21'},
        {name: 'Magenta', length: '2:15'},
    ]
};

var albumMarconi = {
    name: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: '/images/album-placeholder.png',
    songs: [
        {name: 'Hello, Operator?', length: '1:01'},
        {name: 'Ring, Ring, Ring', length: '5:01'},
        {name: 'Fits in Your Pocket', length: '3:21'},
        {name: 'Can You Hear Me Now?', length: '3:14'},
        {name: 'Wrong Phone Number', length: '2:15'},
    ]
};

var albumBuncher = {
    name: 'Am I Worth Stealing?',
    artist: 'Pete Buncher',
    label: 'Bunch Peterson Productions',
    year: '2014',
    albumArtUrl: '/images/buncher-album.jpg',
    songs: [
        {name: 'Am I Worth Stealing', length: '03:12'},
        {name: 'Tear Down These Walls', length: '04:07'},
        {name: 'Consume', length: '02:53'},
        {name: 'Your Love Never Fails', length: '03:09'},
        {name: "You Don't Have to Hurt", length: '03:07'},
        {name: 'God In Love', length: '02:52'},
        {name: 'Calling Me', length: '03:26'},
        {name: 'Fly', length: '04:48'},
        {name: 'Set Us Free', length: '02:58'},
        {name: 'Sons and Daughters', length: '06:01'},
        {name: 'Healing', length: '02:30'},
        {name: 'Fourths Or Fifths', length: '03:11'},
    ]
};

var currentlyPlayingSong = null;

var createSongRow = function(songNumber, songName, songLength) {
    
    var template = 
        '<tr>'
    +   '   <td class="song-number col-md-1" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    +   '   <td class="col-md-9">' + songName + '</td>'
    +   '   <td class="col-md-2">' + songLength + '</td>'
    +   '</tr>'
    ;
    
    var $row = $(template);
    // Change from a song number to play button when the song isn't playing and we hover over the row
    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-number');
        var songNumber = songNumberCell.data('song-number');
        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html('<a class="album-song-button"><i class="fa fa-play"></i></a>');
        }
    };
    
    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-number');
        var songNumber = songNumberCell.data('song-number');
        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(songNumber);
        }
    };
    
    var clickHandler = function(event) {
        var songNumber = $(this).data('song-number');
        
        if (currentlyPlayingSong !== null) {
            // Rever to song number for currently playing song because user
            // started playing new song
            var currentlyPlayingSong = $('.song-number[data-song-number="' + currentlyPlayingSong + '"]');
            currentlyPlayingSong.html(currentlyPlayingSong);
        }
        
        if (currentlyPlayingSong !== songNumber) {
            // Switch from Play -> Pause button to indicate new song is playing
            $(this).html('<a class="album-song-button"><i class="fa fa-pause"></i></a>');
            currentlyPlayingSong = songNumber;
        }
        
        else if (currentlyPlayingSong === songNumber) {
            // Switch from Pause -> Play button to pause current song
            $(this).html('<a class="album-song-button"><i class="fa fa-play"></i></a>');
            currentlyPlayingSong = null;
        }
    };
    
    $row.find('.song-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
    
};

var changeAlbumView = function(album) {
    
    // Update the album title
    var $albumTitle = $('.album-title');
    $albumTitle.text(album.name);
    
    // Update the album artist
    var $albumArtist = $('.album-artist');
    $albumArtist.text(album.artist);
    
    // Update the meta info
    var $albumMeta = $('.album-meta-info');
    $albumMeta.text(album.year + " on " + album.label);
    
    // Update the album image
    var $albumImage = $('.album-image img');
    $albumImage.attr('src', album.albumArtUrl);
    
    // Update the song list
    var $songList = $(".album-song-listing");
    $songList.empty();
    var songs = album.songs;
    for (var i = 0; i < songs.length; i++) {
        var songData = songs[i];
        var $newRow = createSongRow(i + 1, songData.name, songData.length);
        $songList.append($newRow);
    }
};

var updateSeekPercentage = function($seekBar, event) {
    var barWidth = $seekBar.width();
    var offsetX = event.pageX - $seekBar.offset().left;
    
    var offsetXPercent = (offsetX / barWidth) * 100;
    // debouncing it..
    offsetXPercent = Math.max(0, offsetXPercent);
    offsetXPercent = Math.min(100, offsetXPercent);
    
    var percentageString = offsetXPercent + '%';
    $seekBar.find('.fill').width(percentageString);
    $seekBar.find('.thumb').css({left: percentageString});
};

var setupSeekBars = function() {
    $seekBars = $('.player-bar .seek-bar');
    $seekBars.click(function(event) {
        updateSeekPercentage($(this), event);
    });
    
    $seekBars.find('.thumb').mousedown(function(event) {
        var $seekBar = $(this).parent();
        
        $seekBar.addClass('no-animate');
        
        $(document).bind('mousemove.thumb', function(event) {
            updateSeekPercentage($seekBar, event);
        });
        
        // cleanup
        $(document).bind('mouseup.thumb', function() {
            $seekBar.removeClass('no-animate');
            $(document).unbind('mousemove.thumb');
            $(document).unbind('mouseup.thumb');
        });
        
    });
};

if (document.URL.match(/\/album.html/)) {
    $(document).ready(function() {
        changeAlbumView(albumBuncher);
        setupSeekBars();
    });
}