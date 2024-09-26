import './bootstrap';

$(document).ready(function(){
    if($(window).width() >= 1081) {
        $('.sidebar').addClass('open');
        $('header .topbar button.sidebarMenuToggler').click(function(){
            $('.sidebar').toggleClass('open', 1000);
            $('main.dashboardMain').toggleClass('full', 1100);
        });
        $('button.sidebarMenuToggler').click(function(){
           $(this).find('i').toggleClass('fa-times fa-bars');
        });
    }
    if($(window).width <= 1080){
        $('.sidebar').removeClass('open');
        $('header .topbar button.sidebarMenuToggler').click(function(){
            $('.sidebar').toggleClass('open', 1000);
        });
    }

    // Handle the dropdown menu from closing when clicking a submenu dropdown menu
    $('.dropdown-menu a.dropdown-toggle').on('click', function (e) {
        if (!$(this).next().hasClass('show')) {
            $(this).parents('.dropdown-menu').first().find('.show').removeClass('show');
        }
        var $subMenu = $(this).next('.dropdown-menu');
        $subMenu.toggleClass('show');

        $(this).parents('li.dropdown.show').on('hidden.bs.dropdown', function (e) {
            $('.dropdown-submenu .show').removeClass('show');
        });

        e.preventDefault(); // Prevent default link behavior
        e.stopPropagation(); // Prevent closing the parent dropdown

        // Ensure that only the ul.dropdown-menu following the clicked .dropdown-toggle is toggled
        let $submenu = $(this).next('.dropdown.dropdown-submenu ul.submenu-dropdown-menu');

        // Toggle the show class on the submenu and remove it from any other submenus
        $('.dropdown-submenu .submenu-dropdown-menu').not($submenu).removeClass('show');
        $submenu.toggleClass('show');

        return false;
    });

    // Close submenus when clicking outside
    $(document).click(function (e) {
        if (!$(e.target).closest('.dropdown').length) {
            $('.dropdown-submenu .dropdown-menu').removeClass('show');
        }
    });
});
