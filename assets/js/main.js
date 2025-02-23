$(document).ready(function () {
    $('.playBtn').click(function () {
        // Find the closest .videoImg parent, then find the .videoLightbox within it
        var $lightbox = $(this).closest('.videoImg').find('.videoLightbox');
        $lightbox.css('display', 'flex'); // Show the lightbox
        $lightbox.find('.lightboxVideo').get(0).play(); // Play the video
    });

    // Close the lightbox when clicking outside of the video
    $(window).click(function (e) {
        if ($(e.target).hasClass('lightbox')) {
            var $lightbox = $(e.target);
            $lightbox.css('display', 'none');
            var video = $lightbox.find('.lightboxVideo').get(0);
            video.pause();
            video.currentTime = 0; // Rewind the video
        }
    });


    // onscroll event window 
    $(window).scroll(function () {
        // Check if the page is scrolled more than 50 pixels
        if ($(this).scrollTop() > 50) {
            // If page is scrolled more than 50px, add the class 'scrolled' to the div
            $('.langWrap').addClass('langWrap_');
        } else {
            // If page is scrolled less than 50px, remove the class 'scrolled' from the div
            $('.langWrap').removeClass('langWrap_');
        }
    });


    // sidebar start
    // Function to highlight the active section in the sidebar
    function highlightSection() {
        var scrollPosition = $(window).scrollTop();

        $('.section').each(function () {
            var currentSection = $(this);
            var sectionTop = currentSection.offset().top;

            // Adjust this if needed
            if (scrollPosition >= sectionTop - 10) {
                var id = currentSection.attr('id');
                $('#sidebar ul li a').removeClass('active');
                $('#sidebar ul li a[href="#' + id + '"]').addClass('active');
            }
        });
    }

    // Call the highlightSection function when the page is scrolled
    $(window).on('scroll', function () {
        highlightSection();
    });

    // Smooth scrolling when clicking an anchor link
    $('#sidebar a').on('click', function (e) {
        if (this.hash !== "") {
            e.preventDefault();
            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;
                highlightSection();
            });
        }
    });

    // sidebar end

    // countdown start
    // Set the date we're counting down to
    var countDownDate = new Date("March 4, 2024 00:00:00").getTime();

    // Update the countdown every 1 second
    var countdownFunction = setInterval(function () {
        // Get today's date and time
        var now = new Date().getTime();

        // Find the time remaining until the countdown date
        var timeLeft = countDownDate - now;

        if (timeLeft <= 0) {
            // Set the countdown values to 0
            var days = 0;
            var hours = 0;
            var minutes = 0;
            var seconds = 0;

            // Output the result in the respective elements
            $('.timerCoundown .day:eq(0) h1').text(days);
            $('.timerCoundown .day:eq(1) h1').text(hours);
            $('.timerCoundown .day:eq(2) h1').text(minutes);
            $('.timerCoundown .day:eq(3) h1').text(seconds); // Display seconds

            // Clear the interval
            clearInterval(countdownFunction);

            // Optionally, you can perform any action here after the countdown has ended
            // For example, open a modal or execute a function
        } else {
            // Time calculations for days, hours, minutes, and seconds
            var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000); // Calculate seconds

            // Output the result in the respective elements
            $('.timerCoundown .day:eq(0) h1').text(days);
            $('.timerCoundown .day:eq(1) h1').text(hours);
            $('.timerCoundown .day:eq(2) h1').text(minutes);
            $('.timerCoundown .day:eq(3) h1').text(seconds); // Display seconds
        }

        // If the countdown is finished, clear the interval and open modal
        if (timeLeft <= 0) {
            clearInterval(countdownFunction);
            // Open your modal here
            // For example, if you have a modal with id 'myModal', you can trigger it like this:
            $('#timerModal').modal('show');
        }
    }, 1000);

    // countdown end
});