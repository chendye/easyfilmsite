// 新增一条数据
$('#addOption').on('click', function() {
  $.ajax({
    type: "POST",
    url: "/admin/add",
    data: {
      title: $("#inputTitle").val(),
      doctor: $("#inputDoctor").val(),
      country: $("#inputCountry").val(),
      year: $("#inputYear").val(),
      poster: $("#inputPoster").val(),
      language: $("#inputLanguage").val(),
      flash: $("#inputFlash").val(),
      summary: $("#inputSummary").val(),
    },
    success: function(res) {
      console.log("Data Saved: " + res);
    }
  });
});

// 删除一条数据
$('.del').on('click', function() {
  let del_id = $(this).attr('data-id');

  $.ajax({
    type: "DELETE",
    url: "/admin/list",
    data: {
      id: del_id
    },
    success: function(res) {
      console.log("Data Saved: " + res);
    }
  });
});