$(document).ready(function() {
	$('.yoda, .header, .bottom').addClass('animated fadeIn');
	$('.header').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
		// $('.bottom').removeClass('hidden').addClass('animated fadeIn')
	});
});