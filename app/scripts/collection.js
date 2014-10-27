// right now this should be displaying 1 album on the collection.html
// page as the Bloc guide stated, but it doesn't.

var buildAlbumThumbnail = function() {
    var template = 
        '<div class="collection-album-container col-md-2">'
    +   '   <img src="/images/album-placeholder.png"/>'
    +   '   <div class="collection-album-info caption">'
    +   '   <p>'
    +   '       <a class="album-name" href="/album.html">Album Name</a>'
    +   '           <br/>'
    +   '           <a href="/album.html">Artist Name</a>'
    +   '           <br/>'
    +   '           X songs'
    +   '           <br/>'
    +   '       </p>'
    +   '   </div>'
    +   '</div>';
    
    return $(template);
};

var updateCollectionView = function() {
    var $collection = $(".collection-container .row");
    $collection.empty();
        
    for (var i = 0; i < 33; i++) {
        var $newThumbnail= buildAlbumThumbnail();
        $collection.append($newThumbnail)
    };
}

if (document.URL.match(/\/collection.html/)) {
    $(document).ready(function() {
        updateCollectionView();
    });
}