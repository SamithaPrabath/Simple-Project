var output="<ul>";
$(document).ready(function(){
	$(".TYPE").checkboxradio();
  $("#slider-range").slider({
    range: true,
    min: 0,
    max: 300,
    values: [0, 200],
    slide: function (event, ui) {
      $("#PRICE").val("$" + ui.values[0] + " - $" + ui.values[1]);
    },
  });
  $("#PRICE").val(
    "$" +
      $("#slider-range").slider("values", 0) +
      " - $" +
      $("#slider-range").slider("values", 1)
  );
  $(".shoe_sizes").selectmenu();
  $(".shoe_color").selectmenu();
  $(".shoe_style").selectmenu();
  $("button").button();

  $("#search").click(function (event) {
    var userType = $("input[name='type']:checked").val();
    var userMinPrice = $("#slider-range").slider("values", 0);
    var userMaxPrice = $("#slider-range").slider("values", 1);
    var shoeSize = $("#shoe_sizes").val();
    var shoeStyle = $("#shoe_style").val();
    var shoeColor = $("#shoe_color").val();

    var found = false;
    var output = "<div>";
    for (var i in data.shoes) {
			
		if( ( userType == data.shoes[i].gender) &&
			 (userMinPrice <= data.shoes[i].price) && (userMaxPrice >= data.shoes[i].price) &&
			 (shoeStyle==data.shoes[i].style) &&(shoeColor==data.shoes[i].colour)){
			 
			 for (var index in data.shoes[i].sizes) {
		    	console.log(shoeSize);
		        if (data.shoes[i].sizes[index] == shoeSize) {
		        	output+="<section class = 'shoe' style='margin:50px;color:red'>" + 
			 		 "<br>" + "<h3>"+ data.shoes[i].name+"</h3>"+
					 "<br>" + "<img src=" + data.shoes[i].picture + " alt = 'Shoe image' style='width:200px;height:200px;'>" + "<br>" +
					 "<ul> <li>" + data.shoes[i].description + "</li>" + 
					 "<li>" + "$" +data.shoes[i].price + "</li>" + 
					 "<li>" +"<a href=" + data.shoes[i].url + ">" + data.shoes[i].url + "</a>" + "</li>" + 
					 "</ul>"+ "<br> </section>";
		        	found = true;
		      	}
    		}
			 
		}
	}
	

    
	if (!found) {
      output +=
        "<section class = 'shoe' style = 'text-align : center'> <p> NO SHOE AVILABLE FOR THE DETAILS YOU CHOOSED!!! </p> </section>";
      alert("NO SHOE AVAILABLE FOR THE DETAILS YOU CHOOSE!!!");
	}
	
	output += "</div>";
	document.getElementById("placeholder").innerHTML = output;

    });

   });