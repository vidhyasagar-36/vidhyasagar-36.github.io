var myCarousel = document.getElementById('myCarousel')
var youtubelinks = document.getElementsByClassName('d-block')
console.log(youtubelinks)

myCarousel.addEventListener('slid.bs.carousel', function () {
    $('iframe').attr('src', $('iframe').attr('src'));
})