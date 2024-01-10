$(function () {
    console.log("Let's get ready to party with jQuery!")
});

$('article img').addClass('image-center')

$('article p').eq(4).remove()//there are a total of 5 paragraphs
//code from solution
$("article p:last-child").remove();

$('h1').css('font-size', Math.random()*100)

$('<li>whatever i want</li>').appendTo('ol')
//code from solution
$("ol").append($("<li>", {text: "I can add to lists with jQuery!"}));

$('aside').children().remove()
$('<p>i hereby apologize for the existence of the list</p>').appendTo('aside')
//code from solution
$("aside").empty().append($("<p>", {text: "Sorry about that list :("}));

//code from solution
$(".form-control").on('keyup blur change', function () {
    let red = $(".form-control").eq(0).val();
    let blue = $(".form-control").eq(1).val();
    let green = $(".form-control").eq(2).val();
    $("body").css("background-color",
        "rgb(" + red + "," + green + "," + blue + ")");
});

$('img').click(function(){
    $(this).remove()
})
//code from solution
$("img").on('click', function (e) {
    $(e.target).remove();
});


