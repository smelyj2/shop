 window.onresize = function() {
            document.getElementById("size").innerHTML = window.innerWidth;
 };
 
$(function (){ // изменение изображения  мобильного выпадающего меню
    var $img = $('#dropDownBut')
	$img.click(function (){
		$img.attr({'src':'images/start-mobile-menu.png'}).not(this).addClass('notActive').removeClass('Active')
		$(this).toggleClass('notActive Active');
		$(this).hasClass('Active') && (this.src = 'images/start-mobile-menu-close.png');
	})
})

function hideShowDiv(){ // отк./зак. Левый выпадающий список
	$('.mobile-menu-area').toggle();
	  
}


function goToCatalog(){
	window.location= "catalog.html";
}

$(document).ready(function() {
	$(".clothesImg").click(function(){
		window.location= "catalog.html";
	});
});

