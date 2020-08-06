$(document).ready(function() {

  // get times from moment
  const now = moment().format('MMMM Do YYYY');

  let nowHour24 = moment().format('H');
  let nowHour12 = moment().format('h');

  let $dateHeading = $('#currentDay');
  $dateHeading.text(now);


  // Get stored events from localStorage
  // Parsing the JSON string to an object
  let storedPlans = JSON.parse(localStorage.getItem("storedPlans"));

  if (storedPlans !== null) {
    plannerData = storedPlans;
  } else {
    plannerData = new Array(9)
  }

 
  let $plannerDiv = $('#plannerContainer');
  $plannerDiv.empty();


  // build calendar by row for fix set of hours
  for (let hour = 9; hour <= 17; hour++) {
    // index for array use offset from hour
    let index = hour - 9;
    
    // build row components
    let $rowDiv = $('<div>');
    $rowDiv.addClass('row');
    $rowDiv.addClass('plannerRow');
    $rowDiv.attr('hour-index',hour);
  
    // create time block elements
    let $col2TimeDiv = $('<div>');
    $col2TimeDiv.addClass('col-md-2');
  
    const $timeBlock = $('<span>');
    $timeBlock.addClass("time-block");
    
    // format hours for display
    let displayHour = 0;
    let ampm = "";
    if (hour > 12) { 
      displayHour = hour - 12;
      ampm = "PM";
    } else {
      displayHour = hour;
      ampm = "AM";
    }

    // populate time block with time
    $timeBlock.text(`${displayHour} ${ampm}`);

    $rowDiv.append($col2TimeDiv);
    $col2TimeDiv.append($timeBlock);


    // event input portion of row
    let $col8IptDiv = $('<div>');
    $col8IptDiv.addClass('col-md-8');

    let $dailyEvent = $('<input>');

    $dailyEvent.attr('id',`input-${index}`);
    $dailyEvent.attr('hour-index', index);
    $dailyEvent.attr('type', 'text');
    $dailyEvent.attr('class', 'dailyEvent');

    // access index from data array for hour 
    $dailyEvent.val( plannerData[index] );
    
    $rowDiv.append($col8IptDiv);
    $col8IptDiv.append($dailyEvent);
 

    // create save buttons
    let $col2SaveDiv = $('<div>');
    $col2SaveDiv.addClass('col-md-2');

    let $saveBtn = $('<i>');
    $saveBtn.attr('save-id',index);
    $saveBtn.attr('class',"far fa-save saveIcon");
    

    $rowDiv.append($col2SaveDiv);
    $col2SaveDiv.append($saveBtn);

    // set row color based on past, present, future
    changeRowColor($rowDiv, hour);
    
    $plannerDiv.append($rowDiv);
  };

  // function to update row color
  function changeRowColor ($hourRow,hour) { 
    if ( hour < nowHour24) {
      $hourRow.addClass("past")
    } else if ( hour > nowHour24) {
      $hourRow.addClass("future")
    } else {
      $hourRow.addClass("present")
    }
  };

  // saves to local storage
  // conclick function to listen for user clicks on plan area
  $(document).on('click','i', function(event) {
    event.preventDefault();  

    let $index = $(this).attr('save-id');

    let inputId = '#input-'+$index;
    let $value = $(inputId).val();

    plannerData[$index] = $value;

    console.log($index);
    console.log(inputId);
    console.log($value);

    localStorage.setItem("storedPlans", JSON.stringify(plannerData));
  });  

});