$(document).ready(function(){
        //Polldaddy library
        (function(d,c,j){
            if(!document.getElementById(j)){
                var pd=d.createElement(c),s;
                pd.id=j;
                pd.src=('https:'==document.location.protocol)?'https://polldaddy.com/js/rating/rating.js':'http://i0.poll.fm/js/rating/rating.js';
                s=document.getElementsByTagName(c)[0];
                s.parentNode.insertBefore(pd,s);
            }
        }
        (document,'script','pd-rating-js'));
})