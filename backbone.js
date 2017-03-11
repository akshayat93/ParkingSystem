var dataObj;
$(document).ready(function()
	{
	$("#adminDetail").hide();
	$("#search").hide();
	var tslot = prompt("Enter the total no of slots.","100"); 
	var slotBook = prompt("Enter the no of slots which are occupied", "5");
	$("#user").click(function()
	{
		$("#adminDetail").hide();
		$("#search").hide();
		$("#admin").css("background","#0000cc");
		$("#userDetail").show();
		$("#user").css("background","#985aa2");
	});
	
	$("#admin").click(function()
	{
		$("#adminDetail").show();
		$("#search").show();
		$("#admin").css("background","#985aa2");
		$("#user").css("background","#0000cc");
		$("#userDetail").hide();
	});
	
	var data = '{"ParkingDetails" :	[]}';   //{"Slot" : "", "RegNo" : "", "Colour" : "", "Status" : "" }' 	+
	dataObj = JSON.parse(data);
	//var tslot = 100;
	//var slotBook = 5;
	var slotavail = tslot - slotBook;
	var colorArr = ['Black', 'White', 'Blue','Red'];
	
	for(var i=0;i<slotBook;i++)
	{
		dataObj.ParkingDetails.push({"Slot" : (i+1) + " N", "RegNo" : "KA-"+ Math.floor((Math.random() * 100) + 1) + "-SA-" +  Math.floor((Math.random() * 10000) + 1), "Colour" : colorArr[Math.floor(Math.random() * colorArr.length)] , "Status" : "1"});
	}
	
	
	$("#theForm").on("submit",function(event)
	{
		event.preventDefault();
		var flag = false;
		var regno = $("#rname").val() + " ";
		var color = $("#colour").val() + " ";
		var pattern = /[A-Z]{2}[-]\d{2}[-][A-Z]{2}[-]\d{4}/;
		if((regno == " ") || (color == " ") || (!pattern.test(regno))){
			console.log("Please provide right details.");
			alert("Please provide the right details.");
			return;
		}
		
		for(var k=0; k<dataObj.ParkingDetails.length; k++)
		{
			if(dataObj.ParkingDetails[k].Status == "0")
			{
				dataObj.ParkingDetails[k].RegNo = regno;
				dataObj.ParkingDetails[k].Colour = color;
				dataObj.ParkingDetails[k].Status = "1";
				alert("Your Slot is " + dataObj.ParkingDetails[k].Slot );
				flag = true;
				break;
			} 			
		}
		if(flag==false)
		{
			dataObj.ParkingDetails.push({"Slot" : (k+1) + " N", "RegNo" : regno, "Colour" : color , "Status" : "1"});
			alert("Your Slot is " + dataObj.ParkingDetails[k].Slot );
		}
		$("#rname").val(" ");
		$("#colour").val(" ");
	});
	
	//alert(dataObj.ParkingDetails.length);
	//alert(JSON.stringify(dataObj)); 
	
	function tablerender(){
		//alert("tablerender");
		//alert(JSON.stringify(dataObj)); 
		$("#tableid").empty();
		var htr = "<tr>" +
					"<th>" + " " + "</th>" +
					"<th>" + "Slot No" + "</th>" +
					"<th>" + "Registration No"+ "</th>" +
					"<th>" + "Colour"+ "</th>" +
				"</tr>" ;
		$("#tableid").append(htr);
		
		for(var j=0; j<dataObj.ParkingDetails.length; j++)
		{
			if(dataObj.ParkingDetails[j].Status == "1")
			{
				var tr = "<tr><td> <input type='checkbox' name='no' value='" + (j) + "'><br></td>" +
					"<td>" + dataObj.ParkingDetails[j].Slot + "</td>" +
					"<td>" + dataObj.ParkingDetails[j].RegNo + "</td>" +
					"<td>" + dataObj.ParkingDetails[j].Colour + "</td>" +
					
				"</tr>"  ;
				$("#tableid").append(tr);
			}
		}
	}
	
	$("#admin").on("click", function()
	{
		tablerender();
	});
	
	/* if($("#tableid").find('input[type="checkbox"]:checked')){
		$("#remove").show();
	} */
	var x;
	$("#remove").on("click",function(){
		$("#tableid").find('input[type="checkbox"]:checked').each(function(){
			//alert(this.value);
			x = this.value;
			dataObj.ParkingDetails[x].Status = "0";
		});
		tablerender(); 
	});
	
	$("#myInput").on("keyup",function() 
	{
		var input, filter, table, tr, td, i;
		input = document.getElementById("myInput");
		filter = input.value.toUpperCase();
		table = document.getElementById("tableid");
		tr = table.getElementsByTagName("tr");
		for (i = 1; i < tr.length; i++) {
			for(j=1; j<=3; j++){
				td = tr[i].getElementsByTagName("td")[j];	
				if (td) {
					if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
						tr[i].style.display = "";
						break;
					} else {
						tr[i].style.display = "none";
					}
				}
			}       
		}
	});
});

