const clientId = 'lBdeX59qHTdt7CSdvQeIZy8H1nJlbpAbEntp2QGc';
const clientSecret = 'kQWwD5wx2QVmc6WaGfma0T2tan3FISTSi3xu0F2N7vGPiZBjImTdx1u43UIHdch914k884aa7ZJfN0MZw9cdfFmXM5xa3aTBh0D40Lgnl8yIXAVrW5GGRKLCKz30oeTg';

function searchCourses(searchTerm) {
  return fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.udemy.com/api-2.0/courses/?search=${searchTerm}`)}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
    }
  })
  .then(response => response.json())
  .then(data => data.results)
  .catch(error => console.error('Error:', error));
}

function displayCourses(courses) {
  const courseResults = document.getElementById('courseResults');
  courseResults.innerHTML = '';

  courses.forEach(function (course) {
    const courseDiv = document.createElement('div');
    courseDiv.innerHTML = '<h3>' + course.title + '</h3>';
    courseDiv.addEventListener('click', function () {
      showCourseDetails(course.id);
    });
    courseResults.appendChild(courseDiv);
  });
}

function showCourseDetails(courseId) {
  fetch(`https://www.udemy.com/api-2.0/courses/${courseId}/`, {
    method: 'GET',
    headers: {
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
      'Access-Control-Allow-Origin': '*'
    }
  })
    .then(response => response.json())
    .then(data => {
      alert('Course Details:\n\n' + data.title + '\n\n' + data.description);
    })
    .catch(error => console.error('Error:', error));
}

const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', function () {
  const searchTerm = document.getElementById('searchInput').value;
  searchCourses(searchTerm).then(courses => displayCourses(courses));
});

// New code to bypass CORS issue
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    const response = JSON.parse(xhttp.responseText);
    if (response.contents) {
      const courses = JSON.parse(response.contents).results;
      displayCourses(courses);
    } else {
      console.error('Error: No results found.');
    }
  } else {
    console.error('Error occurred while fetching courses. Status:', this.status);
  }
};

const searchTerm = document.getElementById('searchInput').value;
xhttp.open("GET", `https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.udemy.com/api-2.0/courses/?search=${searchTerm}`)}`);
xhttp.send();




//This is another way to try and get around the CORS issue, but it hasn't worked yet

/* router.get('/api/courses', function (req, res, next) {
  axios.get('https://www.udemy.com/api-2.0/courses/?search=' + req.query.search)
    .then(response => {
      res.send(response.data.result);
    })
    .catch(error => {
      res.send(error.message);
    });
});

*/

/* UDEMY URLS for API reference:

https://www.udemy.com/developers/affiliate/

https://www.udemy.com/developers/affiliate/methods/get-courses-list/

*/