function jsonData(targetForm){
	var arr = $(targetForm).serializeArray();
	var obj = {};
	for(var a = 0; a < arr.length; a++){
		obj[arr[a].name] = arr[a].value;
	}
	var json_string = JSON.stringify(obj);
	return json_string;
}
$("#save-button").on("click",function(e){
	e.preventDefault();
	var jsonObj = jsonData("#addform");
	$.ajax({
		url:'http://localhost/Cdirectory/api_insert.php',
		type:"POST",
		data:jsonObj,
		success : function(data){
			if(data.status == false){
				alert("Failed To Insert Information");
			}else{
				alert("Insert Successfull");
				window.location.reload();
			}
		}
	});
});
				$(document).ready(function(){
					function loadTable(){
						$("#load-table").html("");
						$.ajax({
							url:'http://localhost/Cdirectory/api_fetch_data.php',
							type:"GET",
							success:function(data){
								if(data.status == false){
									$("#load-table").append("<tr><td colspan = '8'><h2>"+data.message+"</h2></td></tr>");
								}else{
									$.each(data, function(key, value){
										$("#load-table").append("<tr>"
																+"<td>" + value.name + "</td>"
																+"<td>" + value.id + "</td>"
																+"<td>" + value.dob + "</td>"
																+"<td>" + value.address + "</td>"
																+"<td>" + value.email + "</td>"
																+"<td>" + value.contact + "</td>"+
																"<td><button class='delete-btn' data-id='"+value.name+"'>Delete</button></td>"+"</tr>");
									});
								}
							}
						});
					}
				loadTable();
				
				
				
					$(document).on("click",".delete-btn", function(){
					var empname = $(this).data("id");
					var obd = {ename : empname},
					 myJSN = JSON.stringify(obd);
					$.ajax({
						url:'http://localhost/Cdirectory/api_delete.php',
							type:"POST",
							data:myJSN,
							success : function(data){
								loadTable();
								$("addform").trigger("reset");

						}
					});
				});
				});