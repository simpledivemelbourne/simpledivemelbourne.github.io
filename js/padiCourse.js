function editCourse(id) {
  $(`#course--form`).slideToggle("slow");
  console.log(id)

  $.ajax({
    url: `http://localhost:3000/courses/${id}`, success: function (result) {
      console.log(result.name)
      $(`#courseName`).val(result.name);
      $(`#courseDescription`).val(result.description);
      $(`#coursePrice`).val(result.price);
      $(`#courseImage`).val(result.image);
      $(`#courseRequirement`).val(result.requirement);
      $(`#courseId`).val(result.id);
    }
  })


}

$(".searchCourseIcon").click(
  () => {
    $(".searchCourseContainer").slideToggle(100);
  }
)




$.ajax({
  type: "GET",
  url: "http://localhost:3000/courses", success: function (result) {
    let courses = result;

    for (i = 0; i < courses.length; i++) {
      var course = courses[i];
      const { image, name, description, price, requirement, id } = course;
      $(".padi-cards").append(`
  
      <div class="card">
        <div class="card-top">
          <img class="card-img-top" src="${image}" alt="Card image cap"/>
        </div>
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <div class="card-text">
            <p >${description}</p>
            <div class="close-to-bottom">  
              <p>
              <strong>Price</strong>: $${price}<br>
              <strong>Require</strong>: ${requirement}</p>
            </div>
            <div class="card-bottom-buttons">
              <a href="#" class="btn btn-primary btn--more">More</a>
              <div class="cardFunctions">
                <div class="courseEditor" onclick="editCourse( ${id})"><i class="fas fa-edit"></i></div>
                <div class="cardDelete" onclick="cardDelete( ${id})"><i class="fas fa-trash"></i></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      `)
    };
  }
});


function cardDelete(id) {
  $.ajax({
    type: "DELETE",
    url: `http://localhost:3000/courses/${id}`,
  })
}

let searchValue;
const storedValue = (value) => {
  searchValue = value;
  console.log(value);
}

let requirement;
const storedRequirement = (value) => {
  requirement = value;
  searchCourses();
}

const searchCourses = () => {
  console.log("vale of requirement is: "+ requirement)
  $.ajax({
    type: "Get",
    // url: `http://localhost:3000/courses?name=${searchValue}${(requirement=="yes")?"&requirement=Yes": "&requirement=No"}`, success: (result) => {
    url: `http://localhost:3000/courses?${(requirement=="yes")?"requirement=Yes": "requirement=No"}${(searchValue==null)?"":`&q=${searchValue}`}`, success: (result) => {
      $(".card").remove();
      let courses = result;
      console.log(result);
      for (i = 0; i < courses.length; i++) {
        var course = courses[i];
        const { image, name, description, price, requirement, id } = course;
        $(".padi-cards").append(`
        <div class="card">
          <div class="card-top">
            <img class="card-img-top" src="${image}" alt="Card image cap"/>
          </div>
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <div class="card-text">
              <p >${description}</p>
              <div class="close-to-bottom">  
                <p>
                <strong>Price</strong>: $${price}<br>
                <strong>Require</strong>: ${requirement}</p>
              </div>
              <div class="card-bottom-buttons">
                <a href="#" class="btn btn-primary btn--more">More</a>
                <div class="cardFunctions">
                  <div class="courseEditor" onclick="editCourse( ${id})"><i class="fas fa-edit"></i></div>
                  <div class="cardDelete" onclick="cardDelete( ${id})"><i class="fas fa-trash"></i></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        `)
      };
    }
  })
}
