$('.tab-content').find('.tab-pane').each(function(idx, item) {
  var navTabs = $(this).closest('.code-tabs').find('.nav-tabs'),
      title = $(this).attr('title');
  navTabs.append('<li><a href="#">'+title+'</a></li');
});

$('.code-tabs ul.nav-tabs').each(function() {
  $(this).find("li:first").addClass('active');
})

$('.code-tabs .tab-content').each(function() {
  // $(item).find('tab-pane').addClass('active');
  $(this).find("div:first").addClass('activeCode');
  $(this).find("pre").addClass("tabbed")
  $(this).find("code").addClass("tabbed")
});

$('.nav-tabs a').click(function(e){
  e.preventDefault();
  var tab  = $(this).parent(),
      tabIndex = tab.index(),
      tabPanel = $(this).closest('.code-tabs'),
      tabPane = tabPanel.find('.tab-pane').eq(tabIndex);
  tabPanel.find('.active').removeClass('active');
  tabPanel.find('.activeCode').removeClass('activeCode');
  tab.addClass('active');
  tabPane.addClass('activeCode');
});

$('.code-tabs > .copyCode').click(function(e){
  e.preventDefault();
  var clickedTab = $(this).parent(),
      activeCode = clickedTab.find('.activeCode'),
      copyPrompt = clickedTab.find('.copyCode')

  copyTextToClipboard(activeCode.text()); // Callback on callback on callback on callback... Oh my!

  var actionPrompt  = $(".actionPrompt", copyPrompt), 
      successPrompt = $(".successPrompt", copyPrompt)

  actionPrompt.fadeOut(200, function() { 
    successPrompt.fadeIn(200, function(){ 
      successPrompt.delay(500).fadeOut(200, function(){ 
        actionPrompt.fadeIn(200) 
      })
    })
  })
})