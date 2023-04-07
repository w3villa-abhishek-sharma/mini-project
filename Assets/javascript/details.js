$("[type=file]").on("change", function(){
    var file = this.files[0].name;
    var dflt = $(this).attr("placeholder");
    if($(this).val()!=""){
      $(this).next().text(file);
    } else {
      $(this).next().text(dflt);
    }
  });