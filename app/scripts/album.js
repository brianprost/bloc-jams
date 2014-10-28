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
        {name: 'Can you hear me now?', length: '3:14'},
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

var createSongRow = function(songNumber, songName, songLength) {
    var template = 
        '<tr>'
    +   '   <td class="col-md-1">' + songNumber + '</td>'
    +   '   <td class="col-md-9">' + songName + '</td>'
    +   '   <td class="col-md-2">' + songLength + '</td>'
    +   '</tr>'
    ;
    
    return $(template);
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

if (document.URL.match(/\/album.html/)) {
    $(document).ready(function() {
        changeAlbumView(albumBuncher);
    });
}