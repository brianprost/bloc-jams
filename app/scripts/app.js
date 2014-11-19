// require("./landing");
// require("./collection");
// require("./album");
// require("./profile");

var albumPicasso = {
    name: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: '/images/album-placeholder.png',
    songs: [
        {name: 'Blue', length: '4:26', audioUrl: '/music/placeholders/blue'},
        {name: 'Green', length: '3:14', audioUrl: '/music/placeholders/green'},
        {name: 'Red', length: '5:01', audioUrl: '/music/placeholders/red'},
        {name: 'Pink', length: '3:21', audioUrl: '/music/placeholders/pink'},
        {name: 'Magenta', length: '2:15', audioUrl: '/music/placeholders/magenta'},
    ]
};

// Pete's Album

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

var blocJams = angular.module('BlocJams', ['ui.router']);

blocJams.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    
    $stateProvider.state('landing', {
        url: '/',
        controller: 'Landing.controller',
        templateUrl: '/templates/landing.html'
    });
    
    $stateProvider.state('collection', {
        url: '/collection',
        controller: 'Collection.controller',
        templateUrl: '/templates/collection.html'
    });
    
    $stateProvider.state('album', {
        url: '/album',
        templateUrl: '/templates/album.html',
        controller: 'Album.controller'
    });
    
}]);

blocJams.controller('Landing.controller', ['$scope', function($scope) {
    $scope.subText = "Turn the music up to 11!";
    
    $scope.subTextClicked = function() {
        $scope.subText += '!';
    };
    
    $scope.albumURLs = [
        '/images/album-placeholders/album-1.jpg',
        '/images/album-placeholders/album-2.jpg',
        '/images/album-placeholders/album-3.jpg',
        '/images/album-placeholders/album-4.jpg',
        '/images/album-placeholders/album-5.jpg',
        '/images/album-placeholders/album-6.jpg',
        '/images/album-placeholders/album-7.jpg',
        '/images/album-placeholders/album-8.jpg',
        '/images/album-placeholders/album-9.jpg',
    ];
}]);

blocJams.controller('Collection.controller', ['$scope', 'SongPlayer', function($scope, SongPlayer) {
    $scope.albums = [];
    for (var i = 0; i < 33; i++) {
        $scope.albums.push(angular.copy(albumPicasso));
    }
    
    $scope.playAlbum = function(album) {
        SongPlayer.setSong(album, album.songs[0]); // Targets first song in the array
    };
}]);

blocJams.controller('Album.controller', ['$scope', 'SongPlayer', function($scope, SongPlayer) {
    $scope.album = angular.copy(albumPicasso);
    
    var hoveredSong = null;
    
    $scope.onHoverSong = function(song) {
        hoveredSong = song;
    };
    
    $scope.offHoverSong = function(song) {
        hoveredSong = null;
    };
    
    $scope.getSongState = function(song) {
        if (song === SongPlayer.currentSong && SongPlayer.playing) {
            return 'playing';
        }
        else if (song === hoveredSong) {
            return 'hovered';
        }
        return 'default';
    };
    
    $scope.playSong = function(song) {
        // something isn't supposed to be here....
        SongPlayer.setSong($scope.album, song);
    };
    
    $scope.pauseSong = function(song) {
        SongPlayer.pause();
    };
}]);

blocJams.controller('PlayerBar.controller', ['$scope', 'SongPlayer', function($scope, SongPlayer) {
    $scope.songPlayer = SongPlayer;
}]);

blocJams.service('SongPlayer', function () {
    var currentSoundFile = null;
    
    var trackIndex = function(album, song) {
        return album.songs.indexOf(song);
    };
    
    return {
        currentSong: null,
        currentAlbum: null,
        playing: false,
        
        play: function() {
            this.playing = true;
            currentSoundFile.play();
        },
        pause: function() {
            this.playing = false;
            currentSoundFile.pause();
        },
        next: function() {
            var currentTrackIndex = trackIndex(this.currentAlbum, this.currentSong);
            currentTrackIndex++;
            if (currentTrackIndex >= this.currentAlbum.songs.length) {
                currentTrackIndex = 0;
            }
            var song = this.currentAlbum.songs[currentTrackIndex];
            this.setSong(this.currentAlbum, song);
            // this.currentSong = this.currentAlbum.songs[currentTrackIndex];
        },
        previous: function() {
            var currentTrackIndex = trackIndex(this.currentAlbum, this.currentSong);
            currentTrackIndex--;
            if (currentTrackIndex < 0) {
                currentTrackIndex = this.currentAlbum.songs.length - 1;
            }
            // this.currentSong = this.currentAlbum.songs[currentTrackIndex];
            var song = this.currentAlbum.songs[currentTrackIndex];
            this.setSong(this.currentAlbum, song);
        },
        setSong: function(album, song) {
            if (currentSoundFile) {
                currentSoundFile.stop();
            }
            this.currentAlbum = album;
            this.currentSong = song;
            currentSoundFile = new buzz.sound(song.audioUrl, {
                formats: ["mp3"], // does Buzz support the Opus codec?
                preload: true
            });
            
            this.play();
        }
    };
});