$('#boton').on('click', function () {
    $.get(`http://localhost:5000/amigos`, function (data) {
        data.forEach(element => $(`<li> ${element.name} </li>`).appendTo('#lista'))
    })
})

$("#search").on("click", function () {
    let input = $('#input');
    let value = input[0].value;
    $.get(`http://localhost:5000/amigos/${value}`, function (data) {
        $(`<span> ${data.name} </span>`).appendTo("#amigo")
    })
})

$("#delete").on("click", function () {
    let inputDelete= $('#inputDelete');
    let valueDelete= inputDelete[0].value;

    $.ajax({
        url:`http://localhost:5000/amigos/${valueDelete}`,
        method: 'DELETE',
        success: function (data){
            $(`<span>BORRADO</span>`).appendTo('#sucess');
        }
    })

})


// $("#delete").on("click", function () {

//     let inputDelete = $('#inputDelete');
//     let valueDelete = valueDelete[0].value;



    
//     // fetch(`http://localhost:5000/amigos/${valueDelete}`, {
//     //     method: 'DELETE'
//     // })

//     // $.ajax({
//     //     type: 'DELETE',
//     //     data: data,
//     //     url: `http://localhost:5000/amigos/${data.id}`,
//     //     success: function (data) {
//     //         $("<span> Borrado con éxito </span>").appendTo("#success")
//     //     },
//     //     dataType: string

//     // })
// })