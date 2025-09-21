/* ==== Sticky Navbar ==== */

// let navHeight = $("header").height() - 50;
// $(window).bind('scroll', function () {
//     if ($(window).scrollTop() > navHeight) {
//         $('#header-sticky').addClass('sticky-nav');
//     } else {
//         $('#header-sticky').removeClass('sticky-nav');
//     }
// });

let headerSticky = document.getElementById('header-sticky');

window.addEventListener('scroll', function () {
    if (window.scrollY > 50) { // Fixed threshold for stickiness
        headerSticky?.classList.add('sticky-nav', 'animated', 'fadeInDown');
    } else {
        headerSticky?.classList.remove('sticky-nav', 'animated', 'fadeInDown');
    }
});


/* ==== Nav Toggle ==== */

$('.menu-button').click(function () {
    $('.mobileOverlay').toggleClass('toggle');
    $('.mobile_primary').toggleClass('active');
    $('.menu-button').toggleClass('toggle');
    $('body').toggleClass('hiddenClass');
});



/* ==== Mobile Menu M ==== */

var FX = function (a, b) {
    b(".mobile_primary .menu-item-has-children").append('<span class="sub-menu--button"></span>'),
        b(".sub-menu--button").each(function () {
            b(this).click(function () {
                b(this).toggleClass("open"),
                    b(this).prev().slideToggle();
            });
        });
}(FX || {}, jQuery);

$('.mobileOverlay').click(function () {
    $('.mobileOverlay').toggleClass('toggle');
    $('.mobile_primary').toggleClass('active');
    $('.menu-button').toggleClass('toggle');
    // $('body').removeClass('hiddenClass');
});

$('.menuClose').click(function () {
    $('.mobileOverlay').toggleClass('toggle');
    $('.mobile_primary').toggleClass('active');
    $('.menuClose').toggleClass('toggle');
    $('.menu-button').toggleClass('toggle');
    // $('body').removeClass('hiddenClass');
});

// scroll to top

let btn = $('#scrolltoButton');
$(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
        btn.addClass('active');
    } else {
        btn.removeClass('active');
    }
});

btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, '300');
});

// home-banner-slider
$('.homepage-slider').owlCarousel({
    loop: true,
    margin: 10,
    responsive: {
        0: {
            items: 1,
            nav: false
        },
        600: {
            items: 1,
            nav: false
        },
        1000: {
            items: 1,
            nav: false
        }
    }
})

// home-banner-slider
$('.hospital-details-slider2').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
        0: {
            items: 1,
    nav: false
        },
        600: {
            items: 1,
    nav: false
        },
        1000: {
            items: 1
        }
    }
})



// exellence-slider

// $('.exellence').owlCarousel({
//     margin:10,
//     navText: ["<img src='img/left-arrow.svg'>", "<img src='img/slider-right-arrow.svg'>"],
//     dots:false,
//     responsive:{
//         0:{
//             items:1
//         },
//         600:{
//             items:1,
//             loop:false,
//             center: true,
//             nav:false
//         },
//         1000:{
//             items:4,
//             loop:true,
//             nav:true
//         }
//     }
// })

$('.exellence').owlCarousel({
    loop: $(window).width() < 992, // ✅ loop only in mobile
    margin: 10,
    autoplay: false,
    nav: true,
    items: 4,
    dots: false,
    slideTransition: 'linear',
    autoplaySpeed: 10000,
    navText: ["<img src='/img/left-arrow.svg'>", "<img src='/img/slider-right-arrow.svg'>"],
    responsive: {
        0: {
            items: 1.2,
            margin: 15,
            nav: false
        },
        480: {
            items: 1.5,
            margin: 15,
            nav: false
        },
        768: {
            items: 1.5,
            margin: 15,
            nav: false
        },
        992: {
            items: 4,
            margin: 15
        }
    }
});


$('.sub-speciality-slide').owlCarousel({
    loop: false,
    margin: 10,
    autoplay: false,
    nav: true,
    items: 3,
    dots: false,
    slideTransition: 'linear',
    autoplaySpeed: 10000,
    navText: ["<img src='/img/left-arrow.svg'>", "<img src='/img/slider-right-arrow.svg'>"],
    responsive: {
        0: {
            items: 1,
            margin: 15,
            nav: false
        },
        480: {
            items: 1,
            margin: 15,
            nav: false
        },
        768: {
            items: 1,
            margin: 15,
            nav: false
        },
        992: {
            items: 3,
            margin: 15
        }
    }
});

$('.sub-speciality-slide2').owlCarousel({
    loop: false,
    margin: 10,
    autoplay: false,
    nav: true,
    items: 3,
    dots: false,
    slideTransition: 'linear',
    autoplaySpeed: 10000,
    navText: ["<img src='/img/left-arrow.svg'>", "<img src='/img/slider-right-arrow.svg'>"],
    responsive: {
        0: {
            items: 1,
            margin: 15,
            nav: true
        },
        480: {
            items: 1,
            margin: 15,
            nav: true
        },
        768: {
            items: 1,
            margin: 15,
            nav: true,
        },
        992: {
            items: 3,
            margin: 15
        }
    }
});

// expert slider

$('.expert').owlCarousel({
    loop: false,
    margin: 15,
    nav: true,
    navText: ["<img src='/img/left-arrow.svg'>", "<img src='/img/slider-right-arrow.svg'>"],
    dots: false,
    responsive: {
        0: {
            items: 2,
            nav: false
        },
        600: {
            items: 2,
            nav: false
        },
        1000: {
            items: 4
        }
    }
})

// wall frame
$('.wall-frame').owlCarousel({
    loop: true,
    margin: 15,
    nav: true,
    navText: ["<img src='/img/left-arrow.svg'>", "<img src='/img/slider-right-arrow.svg'>"],
    dots: false,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
})

// testimonial
$('.testimonial').owlCarousel({
    loop: true,
    center: true,
    margin: 15,
    nav: false,
    dots: false,
    responsive: {
        0: {
            items: 1.3,
            center: true,
            margin: 10
        },
        600: {
            items: 1.3,
            nav: false,
            margin: 10
        },
        1000: {
            items: 1.3,
            nav: false
        }
    }
})

// blog
$('.blog').owlCarousel({
    loop: false,
    margin: 15,
    nav: false,
    navText: ["<img src='/img/left-arrow.svg'>", "<img src='/img/slider-right-arrow.svg'>"],
    dots: false,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 4
        }
    }
})

// package
$('.package').owlCarousel({
    loop: true,
    margin: 15,
    nav: false,
    navText: ["<img src='/img/left-arrow.svg'>", "<img src='/img/slider-right-arrow.svg'>"],
    dots: false,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 4
        }
    }
})

// Gallery Slider
$('.gallery-slider').owlCarousel({
    loop: true,
    margin: 15,
    nav: false,
    navText: ["<img src='/img/left-arrow.svg'>", "<img src='/img/slider-right-arrow.svg'>"],
    dots: false,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 4
        }
    }
})

$(document).ready(function () {
    // Open the first accordion item by default
    $('.accordian-footer').first().parent().addClass("drop-down");

    $('.accordian-footer').on('click', function (e) {
        e.preventDefault();

        // Remove "drop-down" class from all other items
        $('.accordian-footer').parent('.expanded').removeClass("drop-down");

        // Add "drop-down" class to the clicked item's parent
        $(this).parent('.expanded').toggleClass("drop-down");
    });
});




AOS.init({
    offset: 100,
    delay: 100,
    duration: 1000,
    easing: 'ease',
    once: true,
    mirror: false,
});



$(document).ready(function () {
    $('.speciality-page-search').select2();
});

$(document).ready(function () {
    $('.diseases-page-search').select2();
});

$(document).ready(function () {
    $('.treatments-page-search').select2();
});


$('.hospital-slider').owlCarousel({
    loop: true,
    margin: 15,
    nav: true,
    navText: ["<img src='/img/left-arrow.svg'>", "<img src='/img/slider-right-arrow.svg'>"],
    dots: false,
    responsive: {
        0: {
            items: 1,
            nav: false
        },
        600: {
            items: 1,
            nav: false
        },
        1000: {
            items: 3
        }
    }
})

$('.hospital-details-slider').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    navText: ["<img src='/img/left-arrow.svg'>", "<img src='/img/slider-right-arrow.svg'>"],
    responsive: {
        0: {
            items: 1,
            dots: true,
            nav: false
        },
        600: {
            items: 1,
            dots: true,
            nav: false
        },
        1000: {
            items: 1
        }
    }
})

$('.about-us-slider').owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    navText: ["<img src='/img/left-arrow.svg'>", "<img src='/img/slider-right-arrow.svg'>"],
    responsive: {
        0: {
            items: 1,
            dots: true,
            nav: false
        },
        600: {
            items: 1,
            dots: true,
            nav: false
        },
        1000: {
            items: 1
        }
    }
})

$('.journal-slider').owlCarousel({
    loop: true,
    margin: 15,
    nav: true,
    navText: ["<img src='/img/left-arrow.svg'>", "<img src='/img/slider-right-arrow.svg'>"],
    dots: false,
    responsive: {
        0: {
            items: 2,
            nav: false
        },
        600: {
            items: 2,
            nav: false
        },
        1000: {
            items: 5
        }
    }
})

$('.blog-page-slider').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    navText: ["<img src='/img/blog-page-left-nav.png'>", "<img src='/img/blog-page-right-nav.png'>"],
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
})


$(".filter-box-mobile").click(function () {
    $(".filter-form").toggle();
});



function showBox(id) {
    $(".treat-tab").removeClass("active");
    $("." + id).addClass("active");
    $('.treat-box').hide();
    $("#" + id).show();

}

// All comment code write inside of useEffect in Footer.jsx file
// ===============================================================

// let selectedDate = new Date(); // Today

// function renderCalendar() {
//     const calendarTitle = document.querySelector('.calendar-title');
//     const calendarBody = document.querySelector('.calendar-body');
//     const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
//         'July', 'August', 'September', 'October', 'November', 'December'];
//     const weekdayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

//     calendarBody.innerHTML = '';

//     // Set title
//     calendarTitle.textContent = `${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;

//     // Create weekday header
//     const weekdaysRow = document.createElement('div');
//     weekdaysRow.classList.add('calendar-row');
//     weekdayNames.forEach(day => {
//         const cell = document.createElement('div');
//         cell.classList.add('calendar-day');
//         cell.textContent = day;
//         weekdaysRow.appendChild(cell);
//     });
//     calendarBody.appendChild(weekdaysRow);

//     const year = selectedDate.getFullYear();
//     const month = selectedDate.getMonth();
//     const firstDay = new Date(year, month, 1).getDay();
//     const lastDate = new Date(year, month + 1, 0).getDate();

//     const today = new Date();
//     today.setHours(0, 0, 0, 0); // remove time for date comparison

//     let row = document.createElement('div');
//     row.classList.add('calendar-row');

//     // Empty cells
//     for (let i = 0; i < firstDay; i++) {
//         const emptyCell = document.createElement('div');
//         emptyCell.classList.add('calendar-day');
//         row.appendChild(emptyCell);
//     }

//     for (let day = 1; day <= lastDate; day++) {
//         const cellDate = new Date(year, month, day);
//         const dayCell = document.createElement('div');
//         dayCell.classList.add('calendar-day');
//         dayCell.textContent = day;

//         // Disable past dates
//         if (cellDate < today) {
//             dayCell.classList.add('disabled-date');
//         } else {
//             // Selectable
//             dayCell.addEventListener('click', function () {
//                 document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('active'));
//                 this.classList.add('active');
//                 console.log("Selected date:", cellDate.toISOString().split('T')[0]);
//             });

//             // Highlight today
//             if (
//                 cellDate.getDate() === today.getDate() &&
//                 cellDate.getMonth() === today.getMonth() &&
//                 cellDate.getFullYear() === today.getFullYear()
//             ) {
//                 dayCell.classList.add('active');
//             }
//         }

//         row.appendChild(dayCell);

//         if ((firstDay + day - 1) % 7 === 6 || day === lastDate) {
//             calendarBody.appendChild(row);
//             row = document.createElement('div');
//             row.classList.add('calendar-row');
//         }
//     }
// }

// document.querySelector('.previous-month-btn').addEventListener('click', function () {
//     selectedDate.setMonth(selectedDate.getMonth() - 1);
//     renderCalendar();
// });

// document.querySelector('.next-month-btn').addEventListener('click', function () {
//     selectedDate.setMonth(selectedDate.getMonth() + 1);
//     renderCalendar();
// });

// renderCalendar();


const date = new Date();
const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
$(".datepicker").datepicker({
    format: "dd/mm/yyyy",
    todayBtn: "linked",
    multidateSeparator: "-",
    startDate: today,
    autoclose: true,
});

// $('.timePicker').datetimepicker({
//     useCurrent: false,
//     format: "hh:mm A"
// }).on('dp.show', function () {
//     if (firstOpen) {
//         time = moment().startOf('day');
//         firstOpen = false;
//     } else {
//         time = "01:00 PM"
//     }

//     $(this).data('DateTimePicker').date(time);
// });

// $('.counter').counterUp({
//     delay: 10,
//     time: 1000
// });

// ...existing code...
// document.querySelectorAll(".phone-international").forEach(function (input) {
//     window.intlTelInput(input, {
//         utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@19.5.5/build/js/utils.js",
//         initialCountry: "us"
//     });
// });
// ...existing code...




{/* // ==== Multi Slider */ }
$('#exampleSlider').multislider({
    continuous: true,
    interval: 1000,
    slideAll: true,
    duration: 4000
});


$('.emg').on('click', function (e) {
    $(".emergency-trigger-panel").fadeIn();
});

$('.close_img').on('click', function (e) {
    $(".emergency-trigger-panel").fadeOut();
});
$(document).mouseup(function (e) {
    var container = $(".emergency-trigger-panel");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.fadeOut();
    }
});