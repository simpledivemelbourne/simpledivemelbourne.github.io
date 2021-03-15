console.log('add');

$(`#course--form`).hide();

$(`#addCourse`).click(function () {
    $(`#course--form`).toggle();
})




$("#add").click(function () {



    const name = $(`#courseName`).val();
    const description = $(`#courseDescription`).val();
    const price = $(`#coursePrice`).val();
    const image = $(`#courseImage`).val();
    const requirement = $(`#courseRequirement`).val();
    const courseId = $(`#courseId`).val();
    console.log(courseId);

    if (courseId) {
        console.log("put");
        $.ajax({
            type: "PUT",
            url: `http://localhost:3000/courses/${courseId}`,
            contentType: "application/json",
            data: JSON.stringify({
                name: name,
                description: description,
                price: price,
                image: image,
                requirement: requirement
            }),
            dataType: "json",
            success: function (data, status) {
                alert("Data: " + data + "\nStatus: " + status);
            }
        });

    } else {
        console.log("post")

        $.ajax({
            type: "POST",
            url: "http://localhost:3000/courses",
            contentType: "application/json",
            data: JSON.stringify({
                name: name,
                description: description,
                price: price,
                image: image,
                requirement: requirement
            }),
            dataType: "json",
            success: function (data, status) {
                alert("Data: " + data + "\nStatus: " + status);
            }
        });
    }

});

