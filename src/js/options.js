// 新增一条数据 ,更新数据
$('#addOption').on('click', function() {
  let hiddenVal = $('#inputHidden').val(),
    itype = "PUT";

  if (!hiddenVal) {
    // 隐藏域值为null，新增数据
    itype = "POST";
  }
  $.ajax({
    type: itype,
    url: "/admin/add",
    async: true,
    dataType: "json",
    data: {
      id: hiddenVal,
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
      debugger
      if (res.status === 200) {
        window.location.href = res.url;
        console.log('111111')
      }
    }
  });
});

// 删除一条数据
$('.del').on('click', function() {
  let del_id = $(this).attr('data-id');

  $.ajax({
    type: "DELETE",
    url: "/admin/list",
    dataType: "json",
    async: true,
    data: {
      id: del_id
    },
    success: function(res) {
      if (res.status === 200) {
        window.location.href = res.url;
      }
    }
  });
});