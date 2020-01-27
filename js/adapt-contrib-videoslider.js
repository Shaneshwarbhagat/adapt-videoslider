define([
    "core/js/adapt",
    "core/js/views/componentView",
    "core/js/models/componentModel"
],function(Adapt, ComponentView, ComponentModel) {

    
    // var myevent = extend(myevent, Backbone.Events); 
    // myevent.bind("ended", function() { 
    //     var video =this.model.get(startingImage) ;
    //        if(video.currentTime === video.duration) {
    //             alert("video ended");
               
    //        }
    //       alert(video);
    //        myevent.trigger("ended");   
       
    //  });  // our attempt to add custom event
   

    
    var videoslider = ComponentView.extend({
   
        events: {
            'click .bar': 'navBar',
            // 'change .videoSlide' : 'showSlides'
        },

        showSlides: function(){       
           var x = document.getElementsByClassName("mySlides");
           var vidButton= document.getElementById("navbtn");
           x[0].style.display = "block"; 
           x[0].classList.remove("fade");
          
           $(x).each(function(i){
                this.children[0].onended= ()=>{
                    if(i==x.length-1){
                        vidButton.style.display = "block";
                        // $(".navButton").css({"display":"block"});
                    }
                    x[i+1].style.display = "block"; 
                    x[i].style.display ="none";
                    
                }          
           })
           
        //    var vid = document.getElementById('myvideo');
        //    var i;
        //    vid.onended  = () => {
        //      alert('Video ended at: '+vid.duration+ ' seconds');
        //      for (i = 0; i < x.length; i++) {

        //         x[i].style.display = "block";  
        //       }
        //    };            
        },

        navBar: function(event){
            var index = $(event.currentTarget).attr('data-index');
            this._activeIndex = parseInt(index);
            //  window.alert(this.items[0].slideValue);
            if(0==this._activeIndex){                 
                $(".s1").css({"margin-left":this.items[0].setSlideValue});                      
            }
            if(1==this._activeIndex){                 
                $(".s1").css({"margin-left":"-20%"});                     
            }
            if(2==this._activeIndex){                 
                $(".s1").css({"margin-left":"-40%"});                     
            }

        },

        preRender: function() {
            this.items=this.model.get("_items")
            this.itemsLength=this.model.get("_items").length;           
            this.$el.addClass("no-state");
            // Checks to see if the videoslider should be reset on revisit
            this.checkIfResetOnRevisit();
 
        },
        
        postRender: function() {
            this.setReadyStatus();
            this.$('.component-inner').on('inview', _.bind(this.inview, this));
            this.showSlides();
           
        },

        // Used to check if the videoslider should reset on revisit
        checkIfResetOnRevisit: function() {
            var isResetOnRevisit = this.model.get('_isResetOnRevisit');

            // If reset is enabled set defaults
            if (isResetOnRevisit) {
                this.model.reset(isResetOnRevisit);
            }
        },

        inview: function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                if (visiblePartY === 'top') {
                    this._isVisibleTop = true;
                } else if (visiblePartY === 'bottom') {
                    this._isVisibleBottom = true;
                } else {
                    this._isVisibleTop = true;
                    this._isVisibleBottom = true;
                }

                if (this._isVisibleTop && this._isVisibleBottom) {
                    this.$('.component-inner').off('inview');
                    this.setCompletionStatus();
                }

            }
        },
        

    });

    Adapt.register('videoslider', videoslider);

    return videoslider;

});
