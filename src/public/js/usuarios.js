// $.ajax({
//   url:"/usuarios",    
//   type:"GET",
//   contentType: "application/json; charset=utf-8",
//   dataType   : "json",       
//   success:function(datos){ 
//     datos.data.forEach((usuario) => {
//       $('#test').append(`<p>${usuario.run_usuario}</p> <br>`);
//     })
//   },
// })

const serialize_form = form => JSON.stringify(
  Array.from(new FormData(form).entries())
       .reduce((m, [ key, value ]) => Object.assign(m, { [key]: value }), {})
);

$( "#addUser" ).on( "submit", function( e ) { 
  event.preventDefault(e)
  const toPost = serialize_form(this);
  $.ajax({
      url:"/usuarios",    
      type:"POST",
      data: toPost,
      contentType: "application/json",
      dataType   : "json",       
      success:function(datos){ 
        console.log(datos)
      },
  })
});