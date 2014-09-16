var recentsLoaded = false;
$(document).ready(function() {
	$('.yoda, .header, .bottom').addClass('animated fadeIn');
	$('.header').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
		// $('.bottom').removeClass('hidden').addClass('animated fadeIn')
	});

	$('body').on('click', '#reveal', function(event) {
		event.preventDefault();
		if (!recentsLoaded) {
			$.get('/history', function(data) {
				$.each(data, function(index, val) {
					var html = "<li>\"" + val.body + "\"</li>";
					$('#recent').append(html)
				});
				recentsLoaded = true;
				$('#container').removeClass('hidden');
				$('#container').addClass('animated fadeIn');
			});
		};
	});
});