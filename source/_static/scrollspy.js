 $(document).ready(function() {
   $('div.wy-menu ul li ul').attr('data-gumshoe', '');

   gumshoe.init({
     selector: "[data-gumshoe] li.toctree-l2 > a",
     activeClass: 'current'
   });
 });
