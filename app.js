let loadMore = {
    init: function(section){
      let triggered = false;
  
      section.on('click', function(e) {
         var target = $( e.target );
         if (target.is('#LoadMoreLink')) {
           e.preventDefault();
           loadMore.loadingExecute();
         }
       });
  
    },
    loadingExecute: function(){
      let link = $('#LoadMoreLink').last();
      let nextUrl = $(link).attr("href");
      triggered = true;
  
          $.ajax({
            url: nextUrl,
            type: 'GET',
            beforeSend: function() {
              link.replaceWith(`<div class="load-more__icon visible"></div>`); // loading gif in this div
            }
          })
          .done(function(data) {
            $('[data-loadmore-container]').append($(data).find('[data-loadmore-container]').html());
            triggered = false;
            $('.load-more__icon').remove();
          });
    }
  }

loadMore.init($('.blog-section'), $('[data-loadmore-container]'));