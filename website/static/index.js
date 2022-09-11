function deleteNote(noteId) {
  fetch("/delete-note", {
    method: "POST",
    body: JSON.stringify({ noteId: noteId }),
  }).then((_res) => {
    window.location.href = "/";
  });
}

// set event for guest counter
$(".guestCounter li").on("click", function (element) {
  var operationType = $(this).attr("data-btn-type");
  var oldValue = $(this).parent().find("input").val();

  let newVal;
  if (operationType == "increment") {
    newVal = parseFloat(oldValue) + 1;
  } else {
    // Don't allow decrementing below zero
    if (oldValue > 1) {
      newVal = parseFloat(oldValue) - 1;
    } else {
      newVal = 1;
    }
  }
  $(this).parent().find("input").val(newVal);
});

function imposeMinMax(el) {
  if (el.value != "") {
    if (parseInt(el.value) < parseInt(el.min)) {
      el.value = el.min;
    }
    if (parseInt(el.value) > parseInt(el.max)) {
      el.value = el.max;
    }
  }
}

// 2
function imposeMinMax(el) {
  if (el.value != "") {
    if (parseInt(el.value) < parseInt(el.min)) {
      el.value = el.min;
    }
    if (parseInt(el.value) > parseInt(el.max)) {
      el.value = el.max;
    }
  }
}

var index = 0;
var interval;
var timeout;
var stopFlag = false;

function clearAll() {
  clearTimeout(timeout);
  clearInterval(interval);
}

function modIn(el) {
  var inId = el.id;
  if (inId.charAt(0) == "p") {
    var targetId = inId.charAt(2);
    var maxValue = Number(document.getElementById(targetId).max);
    var actValue = Number(document.getElementById(targetId).value);
    index = actValue;
    if (actValue < maxValue) {
      stopFlag = false;
      document.getElementById(targetId).value++;
    } else {
      stopFlag = true;
    }
    timeout = setTimeout(function () {
      interval = setInterval(function () {
        if (index + 1 >= maxValue) {
          index = 0;
          stopFlag = true;
        }
        if (stopFlag == false) {
          document.getElementById(targetId).value++;
        }
        index++;
      }, 100);
    }, 500);
    imposeMinMax(document.getElementById(targetId));
  }
  if (inId.charAt(0) == "m") {
    var targetId = inId.charAt(2);
    var minValue = Number(document.getElementById(targetId).min);
    var actValue = Number(document.getElementById(targetId).value);
    index = actValue;
    if (actValue > minValue) {
      stopFlag = false;
      document.getElementById(targetId).value--;
    } else {
      stopFlag = true;
    }
    timeout = setTimeout(function () {
      interval = setInterval(function () {
        if (index - 1 <= minValue) {
          index = 0;
          stopFlag = true;
        }
        if (stopFlag == false) {
          document.getElementById(targetId).value--;
        }
        index--;
      }, 100);
    }, 500);
    imposeMinMax(document.getElementById(targetId));
  }
}

// teste
$(function () {
  var bindDatePicker = function () {
    $(".date")
      .datetimepicker({
        format: "DD-MM-YYYY",
        icons: {
          time: "fa fa-clock-o",
          date: "fa fa-calendar",
          up: "fa fa-arrow-up",
          down: "fa fa-arrow-down",
        },
      })
      .find("input:first")
      .on("blur", function () {
        var date = parseDate($(this).val());

        if (!isValidDate(date)) {
          //create date based on momentjs
          date = moment().format("DD-MM-YYYY");
        }

        $(this).val(date);
      });
  };

  var isValidDate = function (value, format) {
    format = format || false;
    // parse the date
    if (format) {
      value = parseDate(value);
    }

    var timestamp = Date.parse(value);

    return isNaN(timestamp) == false;
  };

  var parseDate = function (value) {
    var m = value.match(/^(\d{1,2})(\/|-)?(\d{1,2})(\/|-)?(\d{4})$/);
    if (m)
      value =
        m[5] + "-" + ("00" + m[3]).slice(-2) + "-" + ("00" + m[1]).slice(-2);

    return value;
  };

  bindDatePicker();
});
